"use client";

import * as XLSX from 'xlsx';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    Sparkles, Activity, AlertCircle, CheckCircle2,
    ArrowRight, Cpu, Globe, Zap, BarChart2,
    Search, Loader2, FileSpreadsheet,
    RotateCcw, ChevronRight, Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// ─────────────────────────────────────────────────────────
// useTypewriter
// ─────────────────────────────────────────────────────────
function useTypewriter(text, active, speed = 14, onDone) {
    const [displayed, setDisplayed] = useState('');
    const [isDone, setIsDone] = useState(false);
    const onDoneRef = useRef(onDone);
    useEffect(() => { onDoneRef.current = onDone; });

    const rafRef = useRef(null);
    const indexRef = useRef(0);
    const lastTimeRef = useRef(null);

    useEffect(() => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        setDisplayed('');
        setIsDone(false);
        indexRef.current = 0;
        lastTimeRef.current = null;
        if (!active || !text) return;

        const tick = (timestamp) => {
            if (lastTimeRef.current === null) lastTimeRef.current = timestamp;
            const elapsed = timestamp - lastTimeRef.current;
            if (elapsed >= speed) {
                lastTimeRef.current = timestamp;
                indexRef.current += 1;
                setDisplayed(text.slice(0, indexRef.current));
                if (indexRef.current >= text.length) {
                    setIsDone(true);
                    onDoneRef.current?.();
                    return;
                }
            }
            rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
        return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
    }, [text, active, speed]);

    return { displayed, isDone };
};

function StreamingText({ text, active, speed = 14, onDone, className = '', as: Tag = 'span' }) {
    const { displayed, isDone } = useTypewriter(text, active, speed, onDone);
    return (
        <Tag className={className}>
            {displayed}
            {active && !isDone && (
                <span
                    className="inline-block w-0.5 h-[0.9em] ml-px align-middle rounded-sm animate-pulse"
                    style={{ backgroundColor: 'var(--accent)' }}
                />
            )}
        </Tag>
    );
};

// ─────────────────────────────────────────────────────────
// PRIMITIVES
// ─────────────────────────────────────────────────────────
const Label = ({ children }) => (
    <p className="text-[9px] font-black uppercase tracking-[0.2em] font-mono mb-1.5"
        style={{ color: 'var(--text-subtle)' }}>
        {children}
    </p>
);

const Chip = ({ children, style = {}, className = '' }) => (
    <span
        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-bold tracking-widest uppercase font-mono border ${className}`}
        style={style}
    >
        {children}
    </span>
);

// ─────────────────────────────────────────────────────────
// SUGGESTIONS
// ─────────────────────────────────────────────────────────
const SUGGESTIONS = ['Fitness', 'Finance', 'Travel', 'Productivity', 'Health', 'EdTech', 'Social', 'Gaming'];

// ─────────────────────────────────────────────────────────
// STICKY AI SEARCH BAR (visible only after results)
// ─────────────────────────────────────────────────────────
function AISearchBar({ category, setCategory, onSubmit, isAnalyzing, hasResult, visible }) {
    const [focused, setFocused] = useState(false);
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const [displayedPlaceholder, setDisplayedPlaceholder] = useState('');
    const placeholderRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (focused || category || isAnalyzing) return;
        const phrases = [
            'Try "Fitness apps"…',
            'Try "Finance tools"…',
            'Try "Travel apps"…',
            'Try "EdTech platforms"…',
        ];
        let charIndex = 0;
        let phase = 'typing';
        let current = phrases[placeholderIndex % phrases.length];

        const step = () => {
            if (phase === 'typing') {
                charIndex++;
                setDisplayedPlaceholder(current.slice(0, charIndex));
                if (charIndex >= current.length) { phase = 'holding'; placeholderRef.current = setTimeout(step, 1800); return; }
                placeholderRef.current = setTimeout(step, 45);
            } else if (phase === 'holding') {
                phase = 'erasing'; placeholderRef.current = setTimeout(step, 60);
            } else if (phase === 'erasing') {
                charIndex--;
                setDisplayedPlaceholder(current.slice(0, charIndex));
                if (charIndex <= 0) { setPlaceholderIndex(i => i + 1); return; }
                placeholderRef.current = setTimeout(step, 22);
            }
        };
        placeholderRef.current = setTimeout(step, 400);
        return () => clearTimeout(placeholderRef.current);
    }, [placeholderIndex, focused, category, isAnalyzing]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="w-full"
                    style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border-solid)' }}
                >
                    <div className="max-w-9xl mx-auto px-8 py-5">
                        <form onSubmit={onSubmit}>
                            <motion.div
                                animate={{
                                    boxShadow: focused
                                        ? '0 0 0 1.5px var(--primary), 0 4px 32px color-mix(in srgb, var(--primary) 18%, transparent)'
                                        : '0 2px 12px color-mix(in srgb, var(--primary) 8%, transparent)',
                                }}
                                transition={{ duration: 0.2 }}
                                className="relative flex items-center rounded-2xl overflow-hidden"
                                style={{ backgroundColor: 'var(--surface-raised)', border: '1px solid var(--border-solid)' }}
                            >
                                <motion.div
                                    className="absolute top-0 left-0 right-0 h-px"
                                    animate={{ opacity: focused ? 1 : 0, background: 'linear-gradient(90deg, transparent 0%, var(--primary) 30%, var(--accent) 60%, transparent 100%)' }}
                                    transition={{ duration: 0.3 }}
                                />
                                <div className="pl-5 pr-3 flex items-center gap-3 flex-shrink-0">
                                    <AnimatePresence mode="wait">
                                        {isAnalyzing ? (
                                            <motion.div key="loading" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }}
                                                className="relative w-5 h-5 flex items-center justify-center">
                                                <div className="absolute inset-0 rounded-full animate-spin"
                                                    style={{ border: '1.5px solid transparent', borderTopColor: 'var(--primary)' }} />
                                                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent)' }} />
                                            </motion.div>
                                        ) : (
                                            <motion.div key="search" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }}>
                                                <Sparkles className="w-4 h-4 transition-colors duration-200"
                                                    style={{ color: focused || category ? 'var(--primary)' : 'var(--text-subtle)' }} />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                    <div className="w-px h-5 flex-shrink-0" style={{ backgroundColor: 'var(--border-solid)' }} />
                                </div>

                                <div className="relative flex-1 py-4">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={category}
                                        onChange={e => setCategory(e.target.value)}
                                        disabled={isAnalyzing}
                                        onFocus={() => setFocused(true)}
                                        onBlur={() => setFocused(false)}
                                        placeholder=""
                                        className="w-full bg-transparent outline-none text-sm font-medium relative z-10"
                                        style={{ color: 'var(--text-main)' }}
                                    />
                                    {!category && !isAnalyzing && (
                                        <div className="absolute inset-0 flex items-center pointer-events-none text-sm font-medium" style={{ color: 'var(--text-subtle)' }}>
                                            {focused ? (
                                                <span>What app category do you want to analyze?</span>
                                            ) : (
                                                <span>
                                                    {displayedPlaceholder}
                                                    <span className="inline-block w-0.5 h-4 ml-px align-middle animate-pulse"
                                                        style={{ backgroundColor: 'var(--primary)', opacity: 0.7 }} />
                                                </span>
                                            )}
                                        </div>
                                    )}
                                    {isAnalyzing && (
                                        <div className="absolute inset-0 flex items-center pointer-events-none text-sm font-medium font-mono" style={{ color: 'var(--text-subtle)' }}>
                                            <span className="animate-pulse">Scanning market data for "{category}"…</span>
                                        </div>
                                    )}
                                </div>

                                <div className="pr-3 flex items-center gap-2 flex-shrink-0">
                                    <AnimatePresence>
                                        {(category || hasResult) && !isAnalyzing && (
                                            <motion.button
                                                initial={{ opacity: 0, scale: 0.8, x: 8 }}
                                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                                exit={{ opacity: 0, scale: 0.8, x: 8 }}
                                                type="submit"
                                                disabled={!category}
                                                className="flex items-center gap-2 px-4 h-9 rounded-xl text-[11px] font-bold uppercase tracking-widest font-mono transition-all"
                                                style={{
                                                    background: category ? 'linear-gradient(135deg, var(--primary), color-mix(in srgb, var(--primary) 55%, var(--accent)))' : 'var(--surface)',
                                                    color: category ? '#fff' : 'var(--text-subtle)',
                                                    boxShadow: category ? '0 2px 12px color-mix(in srgb, var(--primary) 35%, transparent)' : 'none',
                                                    border: '1px solid var(--border-solid)',
                                                }}
                                            >
                                                {hasResult && category ? <><RotateCcw className="w-3 h-3" /> Re-scan</> : <><Send className="w-3 h-3" /> Analyze</>}
                                            </motion.button>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        </form>

                        <div className="flex items-center justify-between mt-3 px-1">
                            <AnimatePresence>
                                {!isAnalyzing && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2 flex-wrap">
                                        <span className="text-[9px] font-mono uppercase tracking-widest flex-shrink-0" style={{ color: 'var(--text-subtle)' }}>Try:</span>
                                        {SUGGESTIONS.slice(0, 6).map((s, i) => (
                                            <motion.button key={s} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                                                type="button" onClick={() => { setCategory(s); inputRef.current?.focus(); }}
                                                className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold font-mono transition-all cursor-pointer"
                                                style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border-solid)', color: 'var(--text-muted)' }}
                                                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)'; e.currentTarget.style.backgroundColor = 'var(--info-bg)'; }}
                                                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-solid)'; e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.backgroundColor = 'var(--surface)'; }}
                                            >{s}</motion.button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <AnimatePresence>
                                {isAnalyzing && (
                                    <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }} className="flex items-center gap-2">
                                        <div className="flex gap-1">
                                            {[0, 1, 2].map(i => (
                                                <motion.div key={i} className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--primary)' }}
                                                    animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }} />
                                            ))}
                                        </div>
                                        <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: 'var(--text-subtle)' }}>Connecting to GPU · Polling</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <AnimatePresence>
                                {hasResult && !isAnalyzing && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        className="flex items-center gap-1 ml-auto" style={{ color: 'var(--text-subtle)' }}>
                                        <ChevronRight className="w-2.5 h-2.5" />
                                        <span className="text-[9px] font-mono uppercase tracking-widest">new scan will overwrite current result</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// ─────────────────────────────────────────────────────────
// HERO SEARCH (idle state only)
// ─────────────────────────────────────────────────────────
function HeroSearch({ category, setCategory, onSubmit, isAnalyzing }) {

    const [focused, setFocused] = useState(false);
    const inputRef = useRef(null);

    return (
        <form onSubmit={onSubmit} className="w-full max-w-2xl mx-auto">
            <motion.div
                animate={{
                    boxShadow: focused
                        ? '0 0 0 1.5px var(--primary), 0 8px 40px color-mix(in srgb, var(--primary) 20%, transparent)'
                        : '0 4px 24px color-mix(in srgb, var(--primary) 10%, transparent)',
                }}
                transition={{ duration: 0.2 }}
                className="relative flex items-center rounded-2xl overflow-hidden"
                style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border-solid)' }}
            >
                {/* Top glow */}
                <motion.div
                    className="absolute top-0 left-0 right-0 h-px"
                    animate={{ opacity: focused ? 1 : 0, background: 'linear-gradient(90deg, transparent 0%, var(--primary) 30%, var(--accent) 60%, transparent 100%)' }}
                    transition={{ duration: 0.3 }}
                />

                <div className="pl-5 pr-3 flex items-center gap-3 flex-shrink-0">
                    <Sparkles className="w-4 h-4 transition-colors duration-200"
                        style={{ color: focused || category ? 'var(--primary)' : 'var(--text-subtle)' }} />
                    <div className="w-px h-5 flex-shrink-0" style={{ backgroundColor: 'var(--border-solid)' }} />
                </div>

                <input
                    ref={inputRef}
                    type="text"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder="Enter app category (e.g. Fitness, Finance, Travel)…"
                    className="flex-1 py-4 bg-transparent outline-none text-sm font-medium"
                    style={{
                        color: 'var(--text-main)',
                        '::placeholder': { color: 'var(--text-subtle)' },
                    }}
                />

                <div className="pr-3 flex-shrink-0">
                    <AnimatePresence>
                        {category && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8, x: 8 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.8, x: 8 }}
                                type="submit"
                                className="flex items-center gap-2 px-4 h-9 rounded-xl text-[11px] font-bold uppercase tracking-widest font-mono"
                                style={{
                                    background: 'linear-gradient(135deg, var(--primary), color-mix(in srgb, var(--primary) 55%, var(--accent)))',
                                    color: '#fff',
                                    boxShadow: '0 2px 12px color-mix(in srgb, var(--primary) 35%, transparent)',
                                    border: '1px solid transparent',
                                }}
                            >
                                <Send className="w-3 h-3" /> Analyze
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* Quick picks */}
            <div className="flex items-center gap-2 flex-wrap mt-4 justify-center">
                <span className="text-[9px] font-mono uppercase tracking-widest" style={{ color: 'var(--text-subtle)' }}>Try:</span>
                {SUGGESTIONS.map((s, i) => (
                    <motion.button
                        key={s}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04 }}
                        type="button"
                        onClick={() => { setCategory(s); inputRef.current?.focus(); }}
                        className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold font-mono transition-all cursor-pointer"
                        style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border-solid)', color: 'var(--text-muted)' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)'; e.currentTarget.style.backgroundColor = 'var(--info-bg)'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-solid)'; e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.backgroundColor = 'var(--surface)'; }}
                    >
                        {s}
                    </motion.button>
                ))}
            </div>
        </form>
    );
};

// ─────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────
export default function AppAnalysisPage() {
    const [category, setCategory] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [streamStep, setStreamStep] = useState(-1);
    const advance = useCallback(() => setStreamStep(s => s + 1), []);

    const bottomRef = useRef(null);

    const gplay_api_url = process.env.NEXT_PUBLIC_GPLAY_API_URL

    // Sticky search bar visible once results exist OR while analyzing (after first submit)
    const [hasEverSearched, setHasEverSearched] = useState(false);
    const showStickyBar = hasEverSearched && !isAnalyzing;

    useEffect(() => {
        if (result) setStreamStep(0);
        else setStreamStep(-1);
    }, [result]);

    useEffect(() => {
        if (streamStep < 0) return;
        const distanceFromBottom =
            document.documentElement.scrollHeight - window.scrollY - window.innerHeight;
        if (distanceFromBottom > 200) return;
        bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, [streamStep]);

    const painPointCount = result?.pain_points?.length ?? 0;
    const actionCount = result?.actions?.length ?? 0;
    const ppBase = 2;
    const actBase = ppBase + painPointCount * 2;
    const ppStep = (i, field) => ppBase + i * 2 + field;
    const actStep = (i) => actBase + i;
    const showPainPoints = streamStep >= ppBase;
    const showActions = streamStep >= actBase;

    const API_KEY = process.env.NEXT_PUBLIC_RUNPOD_API_KEY;

    const fetchResults = async (e) => {
        if (e) e.preventDefault();
        if (!category || isAnalyzing) return;
        setHasEverSearched(true);
        setIsAnalyzing(true);
        setError(null);
        setResult(null);
        setStreamStep(-1);

        try {
            const submitRes = await fetch(gplay_api_url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${API_KEY}` },
                body: JSON.stringify({ input: { prompt: category, test: false } }),
            });
            if (!submitRes.ok) throw new Error(`Submission failed: ${submitRes.statusText}`);
            const { id } = await submitRes.json();
            const base = API_URL.substring(0, API_URL.lastIndexOf('/'));
            const statusURL = `${base}/status/${id}`;

            let isComplete = false;
            while (!isComplete) {
                await sleep(2000);
                const statusRes = await fetch(statusURL, { headers: { Authorization: `Bearer ${API_KEY}` } });
                if (!statusRes.ok) throw new Error('Failed to fetch job status');
                const statusData = await statusRes.json();

                console.log('datatatata" ', statusData?.output?.body);

                if (statusData.status === 'COMPLETED') {
                    setResult(statusData?.output?.body || statusData.output);
                    isComplete = true;
                } else if (statusData.status === 'FAILED') {
                    throw new Error('The AI model failed to process this request.');
                }
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const exportData = () => {
        if (!result) return;

        const wb = XLSX.utils.book_new();

        // ── Sheet 1: Summary ──
        const summarySheet = XLSX.utils.aoa_to_sheet([
            ['Category', category],
            ['Summary', result.summary],
            ['Details', result.details ?? ''],
        ]);
        summarySheet['!cols'] = [{ wch: 12 }, { wch: 80 }];
        XLSX.utils.book_append_sheet(wb, summarySheet, 'Summary');

        // ── Sheet 2: Pain Points ──
        const ppRows = [['#', 'Issue', 'Frequency', 'Example Quote']];
        result.pain_points?.forEach((pt, i) => ppRows.push([i + 1, pt.issue, pt.frequency, pt.example_quote]));
        const ppSheet = XLSX.utils.aoa_to_sheet(ppRows);
        ppSheet['!cols'] = [{ wch: 4 }, { wch: 30 }, { wch: 12 }, { wch: 60 }];
        XLSX.utils.book_append_sheet(wb, ppSheet, 'Pain Points');

        // ── Sheet 3: Actions ──
        const actRows = [['#', 'Recommended Action']];
        result.actions?.forEach((action, i) => actRows.push([i + 1, action]));
        const actSheet = XLSX.utils.aoa_to_sheet(actRows);
        actSheet['!cols'] = [{ wch: 4 }, { wch: 80 }];
        XLSX.utils.book_append_sheet(wb, actSheet, 'Actions');

        return wb;
    };

    const handleExportExcel = () => {
        const wb = exportData();
        if (!wb) return;
        XLSX.writeFile(wb, `app-analysis-${category.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.xlsx`);
    };

    const handleExportCSV = () => {
        if (!result) return;
        const rows = [];
        rows.push(['MARKET SUMMARY']);
        rows.push([result.summary]);
        if (result.details) { rows.push([]); rows.push(['DETAILS']); rows.push([result.details]); }
        rows.push([]);
        rows.push(['PAIN POINTS']);
        rows.push(['#', 'Issue', 'Frequency', 'Example Quote']);
        result.pain_points?.forEach((pt, i) => rows.push([i + 1, pt.issue, pt.frequency, pt.example_quote]));
        rows.push([]);
        rows.push(['RECOMMENDED ACTIONS']);
        rows.push(['#', 'Action']);
        result.actions?.forEach((action, i) => rows.push([i + 1, action]));

        const csv = rows.map(row =>
            row.map(cell => {
                const s = String(cell ?? '');
                return s.includes(',') || s.includes('\n') || s.includes('"') ? `"${s.replace(/"/g, '""')}"` : s;
            }).join(',')
        ).join('\n');

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `app-analysis-${category.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen font-sans" style={{ backgroundColor: 'var(--background)', color: 'var(--text-main)' }}>
            {/* ── TOPBAR ── */}
            <header
                className="sticky top-0 z-40 flex items-center justify-between h-[64px] px-8"
                style={{ backgroundColor: 'var(--surface)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border-solid)' }}
            >
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))', boxShadow: '0 2px 8px color-mix(in srgb, var(--primary) 30%, transparent)' }}>
                        <Globe className="w-4 h-4 text-white" />
                    </div>
                    <div className="hidden sm:block">
                        <span className="text-xs font-bold tracking-tight block leading-none mb-1" style={{ color: 'var(--text-main)' }}>App Store Intelligence</span>
                        <div className="flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full animate-pulse" style={{ backgroundColor: 'var(--success)' }} />
                            <span className="text-[9px] font-mono uppercase tracking-widest" style={{ color: 'var(--success)' }}>Engine Live</span>
                        </div>
                    </div>
                </div>

                <AnimatePresence>
                    {result && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.92 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.92 }}
                            className="flex items-center rounded-xl overflow-hidden"
                            style={{ border: '1px solid var(--glass-border)' }}
                        >
                            {/* Excel button */}
                            <button
                                onClick={handleExportExcel}
                                className="flex items-center gap-2 px-4 h-9 text-[11px] font-bold uppercase tracking-widest font-mono transition-all"
                                style={{ background: 'color-mix(in srgb, var(--primary) 10%, transparent)', color: 'var(--primary)' }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(135deg, var(--primary), color-mix(in srgb, var(--primary) 60%, var(--accent)))'; e.currentTarget.style.color = '#fff'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'color-mix(in srgb, var(--primary) 10%, transparent)'; e.currentTarget.style.color = 'var(--primary)'; }}
                            >
                                <FileSpreadsheet className="w-3.5 h-3.5" />
                                xlsx
                            </button>

                            {/* Divider */}
                            <div className="w-px h-5" style={{ backgroundColor: 'var(--glass-border)' }} />

                            {/* CSV button */}
                            <button
                                onClick={handleExportCSV}
                                className="flex items-center gap-2 px-4 h-9 text-[11px] font-bold uppercase tracking-widest font-mono transition-all"
                                style={{ background: 'color-mix(in srgb, var(--primary) 10%, transparent)', color: 'var(--primary)' }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(135deg, var(--primary), color-mix(in srgb, var(--primary) 60%, var(--accent)))'; e.currentTarget.style.color = '#fff'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'color-mix(in srgb, var(--primary) 10%, transparent)'; e.currentTarget.style.color = 'var(--primary)'; }}
                            >
                                <FileSpreadsheet className="w-3.5 h-3.5" />
                                csv
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {/* ── STICKY AI SEARCH BAR (hidden until first search) ── */}
            <div className="sticky top-16 z-30">
                <AISearchBar
                    category={category}
                    setCategory={setCategory}
                    onSubmit={fetchResults}
                    isAnalyzing={isAnalyzing}
                    hasResult={!!result}
                    visible={showStickyBar}
                />
            </div>

            <div className="max-w-9xl mx-auto px-8 py-10 flex flex-col gap-6">

                {/* ── ERROR ── */}
                {error && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold"
                        style={{ backgroundColor: 'var(--destructive-bg)', border: '1px solid color-mix(in srgb, var(--destructive) 25%, transparent)', color: 'var(--destructive)' }}>
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />{error}
                    </motion.div>
                )}

                {/* ── IDLE STATE (hero search) ── */}
                {!result && !isAnalyzing && (
                    <motion.div
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center pt-16 pb-16 gap-10"
                    >
                        {/* Hero icon */}
                        <div className="flex flex-col items-center gap-6">
                            <div className="relative">
                                <div className="w-24 h-24 rounded-3xl flex items-center justify-center"
                                    style={{
                                        background: 'linear-gradient(135deg, color-mix(in srgb, var(--primary) 15%, var(--surface)), color-mix(in srgb, var(--accent) 10%, var(--surface)))',
                                        border: '1px solid var(--glass-border)',
                                        boxShadow: '0 0 40px color-mix(in srgb, var(--primary) 15%, transparent), var(--shadow-md)',
                                    }}>
                                    <Cpu className="w-11 h-11" style={{ color: 'var(--primary)' }} />
                                </div>
                                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center"
                                    style={{ backgroundColor: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }}>
                                    <Zap className="w-2.5 h-2.5" style={{ color: '#080f14' }} />
                                </div>
                            </div>
                            <div className="text-center">
                                <h2 className="text-3xl font-bold tracking-tight mb-3" style={{ color: 'var(--text-main)' }}>
                                    What are we analyzing today?
                                </h2>
                                <p className="text-base" style={{ color: 'var(--text-muted)' }}>
                                    Enter an app category below to begin the deep-scan.
                                </p>
                            </div>
                        </div>

                        {/* Hero search bar */}
                        <HeroSearch
                            category={category}
                            setCategory={setCategory}
                            onSubmit={fetchResults}
                            isAnalyzing={isAnalyzing}
                        />
                    </motion.div>
                )}

                {/* ── ANALYZING ── */}
                {isAnalyzing && (
                    <div className="flex flex-col items-center justify-center gap-8 py-40">
                        <div className="relative w-20 h-20">
                            <div className="absolute inset-0 rounded-full animate-spin"
                                style={{ border: '2px solid var(--border-solid)', borderTopColor: 'var(--primary)' }} />
                            <div className="absolute inset-2 rounded-full animate-spin"
                                style={{ border: '2px solid transparent', borderTopColor: 'var(--accent)', animationDirection: 'reverse', animationDuration: '0.7s' }} />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Sparkles className="w-6 h-6 animate-pulse" style={{ color: 'var(--accent)' }} />
                            </div>
                        </div>
                        <div className="text-center space-y-2">
                            <p className="text-sm font-bold animate-pulse" style={{ color: 'var(--text-main)' }}>Analyzing Market Signals…</p>
                            <p className="text-[10px] font-bold uppercase tracking-[0.18em] font-mono" style={{ color: 'var(--text-subtle)' }}>
                                Connecting to GPU Node · Polling Status
                            </p>
                        </div>
                        <div className="w-64 h-1 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--surface-raised)' }}>
                            <div className="h-full rounded-full animate-pulse"
                                style={{ width: '60%', background: 'linear-gradient(90deg, var(--primary), var(--accent))' }} />
                        </div>
                    </div>
                )}

                {/* ── RESULTS ── */}
                <AnimatePresence>
                    {result && !isAnalyzing && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-5">

                            {/* ── SUMMARY ── */}
                            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                                className="rounded-2xl p-8 relative overflow-hidden"
                                style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow-md)' }}>
                                <div className="absolute top-0 left-0 right-0 h-px"
                                    style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)', opacity: 0.5 }} />
                                <div className="flex flex-wrap justify-between items-start gap-3 mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                                            style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))', boxShadow: '0 2px 12px color-mix(in srgb, var(--primary) 30%, transparent)' }}>
                                            <BarChart2 className="w-4 h-4 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-base font-bold tracking-tight" style={{ color: 'var(--text-main)' }}>Market Summary</p>
                                        </div>
                                    </div>
                                    <Chip style={{ color: 'var(--primary)', borderColor: 'color-mix(in srgb, var(--primary) 25%, transparent)', backgroundColor: 'var(--info-bg)' }}>
                                        <Activity className="w-2.5 h-2.5" /> Live Report
                                    </Chip>
                                </div>
                                <div className="relative pl-5 py-1 min-h-12" style={{ borderLeft: '3px solid var(--accent)' }}>
                                    {streamStep === 0 ? (
                                        <StreamingText as="p" text={`"${result.summary}"`} active speed={12} onDone={advance} className="text-base leading-loose italic" />
                                    ) : (
                                        <p className="leading-loose italic font-semibold text-primary text-base">&ldquo;{result.summary}&rdquo;</p>
                                    )}
                                </div>
                            </motion.div>

                            {/* ── DETAILS ── */}
                            <AnimatePresence>
                                {streamStep >= 1 && (
                                    <motion.div
                                        key="details"
                                        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="rounded-2xl p-8 relative overflow-hidden"
                                        style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border-solid)', boxShadow: 'var(--shadow-sm)' }}
                                    >
                                        <div className="flex items-center gap-3 mb-5">
                                            <div className="w-5 h-5 rounded-md flex items-center justify-center"
                                                style={{ backgroundColor: 'var(--info-bg)', border: '1px solid color-mix(in srgb, var(--primary) 25%, transparent)' }}>
                                                <Sparkles className="w-3 h-3" style={{ color: 'var(--primary)' }} />
                                            </div>
                                            <span className="text-[18px] font-bold uppercase">
                                                Analysis Details
                                            </span>
                                            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, var(--border-solid), transparent)' }} />
                                        </div>

                                        {streamStep === 1 ? (
                                            <StreamingText
                                                as="p"
                                                text={result.details}
                                                active
                                                speed={10}
                                                onDone={advance}
                                                className="text-base leading-relaxed"
                                                style={{ color: 'var(--text-muted)' }}
                                            />
                                        ) : (
                                            <p className="text-base leading-relaxed text-primary font-medium">
                                                {result.details}
                                            </p>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* ── PAIN POINTS ── */}
                            <AnimatePresence>
                                {showPainPoints && (
                                    <motion.div key="pain-points" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="flex flex-col gap-4">
                                        <div className="flex items-center gap-2.5 px-1">
                                            <div className="w-5 h-5 rounded-md flex items-center justify-center"
                                                style={{ backgroundColor: 'var(--destructive-bg)', border: '1px solid color-mix(in srgb, var(--destructive) 25%, transparent)' }}>
                                                <AlertCircle className="w-3 h-3" style={{ color: 'var(--destructive)' }} />
                                            </div>
                                            <span className="text-sm font-semibold uppercase" style={{ color: 'var(--text-subtle)' }}>Identified Pain Points</span>
                                            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, var(--border-solid), transparent)' }} />
                                        </div>
                                        {result?.pain_points?.map((pt, i) => (
                                            <AnimatePresence key={i}>
                                                {streamStep >= ppStep(i, 0) && (
                                                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}
                                                        className="rounded-2xl p-6 relative overflow-hidden"
                                                        style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border-solid)', boxShadow: 'var(--shadow-sm)' }}>
                                                        <div className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full"
                                                            style={{ background: 'linear-gradient(180deg, var(--destructive), color-mix(in srgb, var(--destructive) 10%, transparent))' }} />
                                                        <div className="flex flex-wrap justify-between items-start gap-2 mb-4 pl-4">
                                                            <div className="flex-1 min-w-0">
                                                                {streamStep === ppStep(i, 0) ? (
                                                                    <StreamingText as="h4" text={pt.issue} active speed={14} onDone={advance} className="text-sm font-bold" />
                                                                ) : (
                                                                    <h4 className="text-sm font-bold" style={{ color: 'var(--text-main)' }}>{pt.issue}</h4>
                                                                )}
                                                            </div>
                                                            <Chip style={{ color: 'var(--destructive)', borderColor: 'color-mix(in srgb, var(--destructive) 25%, transparent)', backgroundColor: 'var(--destructive-bg)', flexShrink: 0 }}>
                                                                Freq: {pt.frequency}
                                                            </Chip>
                                                        </div>
                                                        {streamStep >= ppStep(i, 1) && (
                                                            <div className="rounded-xl px-5 py-4 ml-4"
                                                                style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--border-solid)', borderLeft: '3px solid color-mix(in srgb, var(--destructive) 40%, transparent)' }}>
                                                                {streamStep === ppStep(i, 1) ? (
                                                                    <StreamingText as="p" text={`"${pt.example_quote}"`} active speed={10} onDone={advance} className="text-sm font-mono italic leading-relaxed" />
                                                                ) : (
                                                                    <p className="text-sm font-mono italic leading-relaxed" style={{ color: 'var(--text-main)' }}>&ldquo;{pt.example_quote}&rdquo;</p>
                                                                )}
                                                            </div>
                                                        )}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* ── ACTIONS ── */}
                            <AnimatePresence>
                                {showActions && (
                                    <motion.div key="actions" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                                        <div className="flex items-center gap-2.5 px-1 mb-4">
                                            <div className="w-5 h-5 rounded-md flex items-center justify-center"
                                                style={{ backgroundColor: 'var(--success-bg)', border: '1px solid color-mix(in srgb, var(--success) 25%, transparent)' }}>
                                                <CheckCircle2 className="w-3 h-3" style={{ color: 'var(--success)' }} />
                                            </div>
                                            <span className="text-sm font-semibold uppercase" style={{ color: 'var(--text-subtle)' }}>Recommended Actions</span>
                                            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, var(--border-solid), transparent)' }} />
                                        </div>
                                        <div className="rounded-2xl p-6 relative overflow-hidden"
                                            style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border-solid)', boxShadow: 'var(--shadow-sm)' }}>
                                            <div className="flex flex-col gap-3">
                                                {result.actions?.map((action, i) => (
                                                    <AnimatePresence key={i}>
                                                        {streamStep >= actStep(i) && (
                                                            <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }}
                                                                className="flex items-start gap-4 rounded-xl px-4 py-3.5"
                                                                style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--border-solid)' }}>
                                                                <div className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 text-[10px] font-bold font-mono"
                                                                    style={{ background: 'linear-gradient(135deg, var(--success), color-mix(in srgb, var(--success) 70%, var(--accent)))', color: '#080f14' }}>
                                                                    {i + 1}
                                                                </div>
                                                                {streamStep === actStep(i) ? (
                                                                    <StreamingText as="p" text={action} active speed={12}
                                                                        onDone={i < actionCount - 1 ? advance : undefined}
                                                                        className="text-sm font-medium leading-snug" />
                                                                ) : (
                                                                    <p className="text-sm font-medium leading-snug" style={{ color: 'var(--text-main)' }}>{action}</p>
                                                                )}
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* ── FOOTER ── */}
                            {showActions && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    className="flex items-center justify-between px-5 py-3 rounded-xl"
                                    style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border-solid)' }}>
                                    <p className="text-[10px] tracking-widest uppercase" style={{ color: 'var(--text-subtle)' }}>
                                        Query: <span style={{ color: 'var(--success)' }}>{category}</span>
                                    </p>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--success)' }} />
                                        <span className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-subtle)' }}>Analysis Complete</span>
                                    </div>
                                </motion.div>
                            )}

                            <div ref={bottomRef} className="h-8" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};