"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    Sparkles, Activity, AlertCircle, CheckCircle2,
    ArrowRight, Cpu, RefreshCcw, Globe, Zap, BarChart2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { API_URL } from '@/config/api';

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
}

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
}

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
// PAGE
// ─────────────────────────────────────────────────────────
export default function AppAnalysisPage() {
    const [category, setCategory] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const [streamStep, setStreamStep] = useState(-1);
    const advance = useCallback(() => setStreamStep(s => s + 1), []);

    useEffect(() => {
        if (result) setStreamStep(0);
        else setStreamStep(-1);
    }, [result]);

    const painPointCount = result?.pain_points?.length ?? 0;
    const actionCount = result?.actions?.length ?? 0;
    const ppBase = 1;
    const actBase = ppBase + painPointCount * 2;
    const ppStep = (i, field) => ppBase + i * 2 + field;
    const actStep = (i) => actBase + i;
    const showPainPoints = streamStep >= ppBase;
    const showActions = streamStep >= actBase;

    const API_KEY = process.env.NEXT_PUBLIC_RUNPOD_API_KEY;

    const fetchResults = async (e) => {
        if (e) e.preventDefault();
        if (!category) return;
        setIsAnalyzing(true);
        setError(null);
        setResult(null);
        setStreamStep(-1);

        try {
            const submitRes = await fetch(API_URL, {
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
                if (statusData.status === 'COMPLETED') {
                    setResult(statusData.output?.body || statusData.output);
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

    const handleReset = () => {
        setResult(null);
        setCategory('');
        setStreamStep(-1);
    };

    return (
        <div className="min-h-screen font-sans" style={{ backgroundColor: 'var(--background)', color: 'var(--text-main)' }}>

            {/* ── TOPBAR ── */}
            <header
                className="sticky top-0 z-30 flex items-center justify-between h-[52px] px-8"
                style={{ backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border-solid)' }}
            >
                <div className="flex items-center gap-3">
                    <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center"
                        style={{
                            background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                            boxShadow: '0 2px 8px color-mix(in srgb, var(--primary) 30%, transparent)',
                        }}
                    >
                        <Globe className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-sm font-bold tracking-tight" style={{ color: 'var(--text-main)' }}>
                        App Store Intelligence
                    </span>
                    <div className="w-px h-4 mx-1" style={{ backgroundColor: 'var(--border-solid)' }} />
                    <Chip style={{
                        color: 'var(--success)',
                        borderColor: 'color-mix(in srgb, var(--success) 25%, transparent)',
                        backgroundColor: 'var(--success-bg)',
                    }}>
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse inline-block" style={{ backgroundColor: 'var(--success)' }} />
                        Engine Live
                    </Chip>
                </div>

                {result && (
                    <button
                        onClick={handleReset}
                        className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] font-mono px-3 py-1.5 rounded-lg cursor-pointer transition-all"
                        style={{ color: 'var(--text-muted)', border: '1px solid var(--border-solid)', backgroundColor: 'transparent' }}
                        onMouseEnter={e => {
                            e.currentTarget.style.borderColor = 'var(--primary)';
                            e.currentTarget.style.color = 'var(--primary)';
                            e.currentTarget.style.backgroundColor = 'var(--info-bg)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.borderColor = 'var(--border-solid)';
                            e.currentTarget.style.color = 'var(--text-muted)';
                            e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                    >
                        <RefreshCcw className="w-3 h-3" /> New Analysis
                    </button>
                )}
            </header>

            <div className="max-w-9xl mx-auto px-8 py-10 flex flex-col gap-6">

                {/* ── ERROR ── */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold"
                        style={{
                            backgroundColor: 'var(--destructive-bg)',
                            border: '1px solid color-mix(in srgb, var(--destructive) 25%, transparent)',
                            color: 'var(--destructive)',
                        }}
                    >
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />{error}
                    </motion.div>
                )}

                {/* ── IDLE STATE ── */}
                {!result && !isAnalyzing && (
                    <motion.div
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center pt-16 pb-16"
                    >
                        {/* Hero icon */}
                        <div className="relative mb-10">
                            <div
                                className="w-24 h-24 rounded-3xl flex items-center justify-center"
                                style={{
                                    background: 'linear-gradient(135deg, color-mix(in srgb, var(--primary) 15%, var(--surface)), color-mix(in srgb, var(--accent) 10%, var(--surface)))',
                                    border: '1px solid var(--glass-border)',
                                    boxShadow: '0 0 40px color-mix(in srgb, var(--primary) 15%, transparent), var(--shadow-md)',
                                }}
                            >
                                <Cpu className="w-11 h-11" style={{ color: 'var(--primary)' }} />
                            </div>
                            <div
                                className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }}
                            >
                                <Zap className="w-2.5 h-2.5" style={{ color: '#080f14' }} />
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold tracking-tight mb-3 text-center" style={{ color: 'var(--text-main)' }}>
                            What are we analyzing today?
                        </h2>
                        <p className="text-base mb-10 text-center" style={{ color: 'var(--text-muted)' }}>
                            Enter an app category to begin the deep-scan.
                        </p>

                        {/* Search input */}
                        <form onSubmit={fetchResults} className="relative w-full max-w-xl">
                            <div
                                className="relative rounded-2xl overflow-hidden transition-all"
                                style={{
                                    border: '1px solid var(--glass-border)',
                                    boxShadow: '0 0 0 4px color-mix(in srgb, var(--primary) 6%, transparent)',
                                }}
                                onFocusCapture={e => e.currentTarget.style.boxShadow = '0 0 0 4px color-mix(in srgb, var(--primary) 15%, transparent)'}
                                onBlurCapture={e => e.currentTarget.style.boxShadow = '0 0 0 4px color-mix(in srgb, var(--primary) 6%, transparent)'}
                            >
                                <input
                                    type="text"
                                    value={category}
                                    onChange={e => setCategory(e.target.value)}
                                    placeholder="Enter app category (e.g. Fitness, Finance)..."
                                    className="w-full px-5 py-4 text-sm font-medium pr-36 outline-none"
                                    style={{ backgroundColor: 'var(--surface)', color: 'var(--text-main)' }}
                                />
                                <button
                                    type="submit"
                                    disabled={!category}
                                    className="absolute right-2 top-2 bottom-2 px-5 rounded-xl text-[10px] font-bold tracking-[0.1em] uppercase font-mono flex items-center gap-1.5 transition-all"
                                    style={{
                                        background: category
                                            ? 'linear-gradient(135deg, var(--primary), color-mix(in srgb, var(--primary) 70%, var(--accent)))'
                                            : 'var(--surface-raised)',
                                        color: category ? '#ffffff' : 'var(--text-subtle)',
                                        cursor: category ? 'pointer' : 'not-allowed',
                                        boxShadow: category ? '0 2px 12px color-mix(in srgb, var(--primary) 30%, transparent)' : 'none',
                                    }}
                                >
                                    Scan <ArrowRight className="w-3 h-3" />
                                </button>
                            </div>
                        </form>

                        {/* Quick picks */}
                        <div className="flex flex-wrap gap-2 mt-5 justify-center">
                            {['Fitness', 'Finance', 'Productivity', 'Social', 'Health', 'EdTech'].map(s => (
                                <button
                                    key={s}
                                    onClick={() => setCategory(s)}
                                    className="px-3 py-1.5 text-[11px] font-semibold font-mono rounded-lg cursor-pointer transition-all"
                                    style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border-solid)', color: 'var(--text-muted)' }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.borderColor = 'var(--primary)';
                                        e.currentTarget.style.color = 'var(--primary)';
                                        e.currentTarget.style.backgroundColor = 'var(--info-bg)';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.borderColor = 'var(--border-solid)';
                                        e.currentTarget.style.color = 'var(--text-muted)';
                                        e.currentTarget.style.backgroundColor = 'var(--surface)';
                                    }}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* ── ANALYZING ── */}
                {isAnalyzing && (
                    <div className="flex flex-col items-center justify-center py-24 gap-8">
                        <div className="relative w-20 h-20">
                            <div
                                className="absolute inset-0 rounded-full animate-spin"
                                style={{ border: '2px solid var(--border-solid)', borderTopColor: 'var(--primary)' }}
                            />
                            <div
                                className="absolute inset-2 rounded-full animate-spin"
                                style={{
                                    border: '2px solid transparent',
                                    borderTopColor: 'var(--accent)',
                                    animationDirection: 'reverse',
                                    animationDuration: '0.7s',
                                }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Sparkles className="w-6 h-6 animate-pulse" style={{ color: 'var(--accent)' }} />
                            </div>
                        </div>
                        <div className="text-center space-y-2">
                            <p className="text-sm font-bold animate-pulse" style={{ color: 'var(--text-main)' }}>
                                Analyzing Market Signals…
                            </p>
                            <p className="text-[10px] font-bold uppercase tracking-[0.18em] font-mono" style={{ color: 'var(--text-subtle)' }}>
                                Connecting to GPU Node · Polling Status
                            </p>
                        </div>
                        <div className="w-64 h-1 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--surface-raised)' }}>
                            <div
                                className="h-full rounded-full animate-pulse"
                                style={{ width: '60%', background: 'linear-gradient(90deg, var(--primary), var(--accent))' }}
                            />
                        </div>
                    </div>
                )}

                {/* ── RESULTS ── */}
                <AnimatePresence>
                    {result && !isAnalyzing && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-5">

                            {/* ── SUMMARY CARD ── */}
                            <motion.div
                                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                                className="rounded-2xl p-8 relative overflow-hidden"
                                style={{
                                    backgroundColor: 'var(--surface)',
                                    border: '1px solid var(--glass-border)',
                                    boxShadow: 'var(--shadow-md)',
                                }}
                            >
                                {/* Top shimmer line */}
                                <div
                                    className="absolute top-0 left-0 right-0 h-px"
                                    style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)', opacity: 0.5 }}
                                />
                                {/* Background radial glow */}
                                <div
                                    className="absolute top-0 right-0 w-72 h-72 pointer-events-none"
                                    style={{
                                        background: 'radial-gradient(circle, color-mix(in srgb, var(--accent) 6%, transparent), transparent 70%)',
                                        transform: 'translate(30%, -30%)',
                                    }}
                                />

                                <div className="flex flex-wrap justify-between items-start gap-3 mb-6 relative">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-9 h-9 rounded-xl flex items-center justify-center"
                                            style={{
                                                background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                                                boxShadow: '0 2px 12px color-mix(in srgb, var(--primary) 30%, transparent)',
                                            }}
                                        >
                                            <BarChart2 className="w-4 h-4 text-white" />
                                        </div>
                                        <div>
                                            <Label>App Store Intelligence</Label>
                                            <p className="text-base font-bold tracking-tight" style={{ color: 'var(--text-main)' }}>
                                                {category} — Market Summary
                                            </p>
                                        </div>
                                    </div>
                                    <Chip style={{
                                        color: 'var(--primary)',
                                        borderColor: 'color-mix(in srgb, var(--primary) 25%, transparent)',
                                        backgroundColor: 'var(--info-bg)',
                                    }}>
                                        <Activity className="w-2.5 h-2.5" />
                                        Live Report
                                    </Chip>
                                </div>

                                <div
                                    className="relative pl-5 py-1 min-h-[3rem]"
                                    style={{ borderLeft: '3px solid var(--accent)' }}
                                >
                                    {streamStep === 0 ? (
                                        <StreamingText
                                            as="p"
                                            text={`"${result.summary}"`}
                                            active={true}
                                            speed={12}
                                            onDone={advance}
                                            className="text-base leading-loose italic"
                                            style={{ color: 'var(--text-muted)' }}
                                        />
                                    ) : (
                                        <p className="text-base leading-loose italic" style={{ color: 'var(--text-muted)' }}>
                                            &ldquo;{result.summary}&rdquo;
                                        </p>
                                    )}
                                </div>
                            </motion.div>

                            {/* ── PAIN POINTS ── */}
                            <AnimatePresence>
                                {showPainPoints && (
                                    <motion.div
                                        key="pain-points"
                                        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="flex flex-col gap-4"
                                    >
                                        <div className="flex items-center gap-2.5 px-1">
                                            <div
                                                className="w-5 h-5 rounded-md flex items-center justify-center"
                                                style={{
                                                    backgroundColor: 'var(--destructive-bg)',
                                                    border: '1px solid color-mix(in srgb, var(--destructive) 25%, transparent)',
                                                }}
                                            >
                                                <AlertCircle className="w-3 h-3" style={{ color: 'var(--destructive)' }} />
                                            </div>
                                            <span className="text-[9px] font-black uppercase tracking-[0.2em] font-mono" style={{ color: 'var(--text-subtle)' }}>
                                                Identified Pain Points
                                            </span>
                                            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, var(--border-solid), transparent)' }} />
                                        </div>

                                        {result.pain_points?.map((pt, i) => (
                                            <AnimatePresence key={i}>
                                                {streamStep >= ppStep(i, 0) && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 8 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ duration: 0.25 }}
                                                        className="rounded-2xl p-6 relative overflow-hidden"
                                                        style={{
                                                            backgroundColor: 'var(--surface)',
                                                            border: '1px solid var(--border-solid)',
                                                            boxShadow: 'var(--shadow-sm)',
                                                        }}
                                                    >
                                                        <div
                                                            className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full"
                                                            style={{ background: 'linear-gradient(180deg, var(--destructive), color-mix(in srgb, var(--destructive) 10%, transparent))' }}
                                                        />
                                                        <div className="flex flex-wrap justify-between items-start gap-2 mb-4 pl-4">
                                                            <div className="flex-1 min-w-0">
                                                                {streamStep === ppStep(i, 0) ? (
                                                                    <StreamingText
                                                                        as="h4"
                                                                        text={pt.issue}
                                                                        active={true}
                                                                        speed={14}
                                                                        onDone={advance}
                                                                        className="text-sm font-bold"
                                                                        style={{ color: 'var(--text-main)' }}
                                                                    />
                                                                ) : (
                                                                    <h4 className="text-sm font-bold" style={{ color: 'var(--text-main)' }}>{pt.issue}</h4>
                                                                )}
                                                            </div>
                                                            <Chip style={{
                                                                color: 'var(--destructive)',
                                                                borderColor: 'color-mix(in srgb, var(--destructive) 25%, transparent)',
                                                                backgroundColor: 'var(--destructive-bg)',
                                                                flexShrink: 0,
                                                            }}>
                                                                Freq: {pt.frequency}
                                                            </Chip>
                                                        </div>

                                                        {streamStep >= ppStep(i, 1) && (
                                                            <div
                                                                className="rounded-xl px-5 py-4 ml-4"
                                                                style={{
                                                                    backgroundColor: 'var(--surface-card)',
                                                                    border: '1px solid var(--border-solid)',
                                                                    borderLeft: '3px solid color-mix(in srgb, var(--destructive) 40%, transparent)',
                                                                }}
                                                            >
                                                                {streamStep === ppStep(i, 1) ? (
                                                                    <StreamingText
                                                                        as="p"
                                                                        text={`"${pt.example_quote}"`}
                                                                        active={true}
                                                                        speed={10}
                                                                        onDone={advance}
                                                                        className="text-sm font-mono italic leading-relaxed"
                                                                        style={{ color: 'var(--text-muted)' }}
                                                                    />
                                                                ) : (
                                                                    <p className="text-sm font-mono italic leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                                                                        &ldquo;{pt.example_quote}&rdquo;
                                                                    </p>
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
                                    <motion.div
                                        key="actions"
                                        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="flex items-center gap-2.5 px-1 mb-4">
                                            <div
                                                className="w-5 h-5 rounded-md flex items-center justify-center"
                                                style={{
                                                    backgroundColor: 'var(--success-bg)',
                                                    border: '1px solid color-mix(in srgb, var(--success) 25%, transparent)',
                                                }}
                                            >
                                                <CheckCircle2 className="w-3 h-3" style={{ color: 'var(--success)' }} />
                                            </div>
                                            <span className="text-[9px] font-black uppercase tracking-[0.2em] font-mono" style={{ color: 'var(--text-subtle)' }}>
                                                Recommended Actions
                                            </span>
                                            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, var(--border-solid), transparent)' }} />
                                        </div>

                                        <div
                                            className="rounded-2xl p-6 relative overflow-hidden"
                                            style={{
                                                backgroundColor: 'var(--surface)',
                                                border: '1px solid var(--border-solid)',
                                                boxShadow: 'var(--shadow-sm)',
                                            }}
                                        >
                                            <div
                                                className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
                                                style={{ background: 'linear-gradient(to top, color-mix(in srgb, var(--success) 4%, transparent), transparent)' }}
                                            />
                                            <div className="flex flex-col gap-3 relative">
                                                {result.actions?.map((action, i) => (
                                                    <AnimatePresence key={i}>
                                                        {streamStep >= actStep(i) && (
                                                            <motion.div
                                                                initial={{ opacity: 0, x: -8 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ duration: 0.2 }}
                                                                className="flex items-start gap-4 rounded-xl px-4 py-3.5"
                                                                style={{
                                                                    backgroundColor: 'var(--surface-card)',
                                                                    border: '1px solid var(--border-solid)',
                                                                }}
                                                            >
                                                                <div
                                                                    className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 text-[10px] font-bold font-mono"
                                                                    style={{
                                                                        background: 'linear-gradient(135deg, var(--success), color-mix(in srgb, var(--success) 70%, var(--accent)))',
                                                                        color: '#080f14',
                                                                    }}
                                                                >
                                                                    {i + 1}
                                                                </div>
                                                                {streamStep === actStep(i) ? (
                                                                    <StreamingText
                                                                        as="p"
                                                                        text={action}
                                                                        active={true}
                                                                        speed={12}
                                                                        onDone={i < actionCount - 1 ? advance : undefined}
                                                                        className="text-sm font-medium leading-snug"
                                                                        style={{ color: 'var(--text-muted)' }}
                                                                    />
                                                                ) : (
                                                                    <p className="text-sm font-medium leading-snug" style={{ color: 'var(--text-muted)' }}>{action}</p>
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
                                <motion.div
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    className="flex items-center justify-between px-5 py-3 rounded-xl"
                                    style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border-solid)' }}
                                >
                                    <p className="text-[10px] font-mono tracking-widest uppercase" style={{ color: 'var(--text-subtle)' }}>
                                        Query: <span style={{ color: 'var(--primary)' }}>{category}</span>
                                    </p>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--success)' }} />
                                        <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: 'var(--text-subtle)' }}>
                                            Analysis Complete
                                        </span>
                                    </div>
                                </motion.div>
                            )}

                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
}