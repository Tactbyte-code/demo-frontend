"use client"

import React from 'react'
import dynamic from 'next/dynamic'
import { Download, Loader2 } from 'lucide-react'
import { ReportPdfDocument } from './ReportPdfDocument'

// Dynamically import PDFDownloadLink to bypass SSR issues
const PDFDownloadLink = dynamic(
    () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
    {
        ssr: false,
        loading: () => (
            <button disabled className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-[var(--surface-raised)] text-[var(--text-subtle)] opacity-60">
                <Loader2 className="w-4 h-4 animate-spin" />
                Preparing PDF...
            </button>
        ),
    }
)

export const DownloadPdfButton = ({ summary, conviction }) => {
    const fileName = `${(summary?.title || 'validation-report').toLowerCase().replace(/[^a-z0-9]/g, '-')}-report.pdf`

    return (
        <PDFDownloadLink
            document={<ReportPdfDocument summary={summary} conviction={conviction} />}
            fileName={fileName}
        >
            {({ loading, error }) => (
                <button
                    disabled={loading}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-[var(--surface-raised)] hover:bg-[var(--surface-hover)] text-[var(--text-header)] border border-[var(--border)] transition-all shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--primary)] disabled:opacity-50"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Generating...</span>
                        </>
                    ) : (
                        <>
                            <Download className="w-4 h-4" />
                            <span>Download as PDF</span>
                        </>
                    )}
                </button>
            )}
        </PDFDownloadLink>
    )
}