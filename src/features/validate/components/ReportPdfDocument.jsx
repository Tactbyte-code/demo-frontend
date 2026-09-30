import React from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

// Print-ready PDF styles
const styles = StyleSheet.create({
    page: {
        padding: 36,
        fontSize: 10,
        fontFamily: 'Helvetica',
        color: '#1e293b',
        backgroundColor: '#ffffff',
    },
    header: {
        marginBottom: 16,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontFamily: 'Helvetica-Bold',
        color: '#0f172a',
        marginBottom: 8,
    },
    subTitle: {
        fontSize: 8,
        color: '#64748b',
    },
    scoreBox: {
        padding: 8,
        borderRadius: 6,
        backgroundColor: '#f8fafc',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 80,
    },
    scoreText: {
        fontSize: 16,
        fontFamily: 'Helvetica-Bold',
    },
    section: {
        marginBottom: 14,
    },
    sectionTitle: {
        fontSize: 12,
        fontFamily: 'Helvetica-Bold',
        color: '#1e3a8a',
        marginBottom: 10,
        paddingBottom: 3,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    paragraph: {
        lineHeight: 1.4,
        color: '#334155',
        marginBottom: 6,
    },
    card: {
        padding: 8,
        backgroundColor: '#f8fafc',
        borderRadius: 4,
        marginBottom: 6,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    cardTitle: {
        fontFamily: 'Helvetica-Bold',
        fontSize: 10,
        color: '#1e293b',
        marginBottom: 2,
    },
    badge: {
        fontSize: 7,
        fontFamily: 'Helvetica-Bold',
        paddingHorizontal: 4,
        paddingVertical: 2,
        borderRadius: 2,
        color: '#475569',
        backgroundColor: '#e2e8f0',
    },
    listItem: {
        flexDirection: 'row',
        marginBottom: 4,
    },
    bullet: {
        width: 12,
        fontSize: 10,
        color: '#4f46e5',
    },
    listText: {
        flex: 1,
        lineHeight: 1.3,
        color: '#334155',
    },
    footer: {
        position: 'absolute',
        bottom: 20,
        left: 36,
        right: 36,
        textAlign: 'center',
        fontSize: 8,
        color: '#94a3b8',
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
        paddingTop: 8,
    },
})

// Helper to format string keys like "pain_point_severity" into "Pain Point Severity"
const formatLabel = (key) => {
    return key
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase())
}

export const ReportPdfDocument = ({ summary, conviction }) => {
    // Transform dimensional_scores object into an array for easy mapping
    const dimensionsList = summary?.dimensional_scores
        ? Object.entries(summary.dimensional_scores).map(([key, value]) => ({
            key,
            label: formatLabel(key),
            ...value,
        }))
        : []

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={{ flex: 1, marginRight: 12 }}>
                        <Text style={styles.title}>{summary?.title || 'Idea Validation Report'}</Text>
                        <Text style={styles.subTitle}>
                            Industry: {summary?.industry || 'N/A'} | Stage: {summary?.stage || 'N/A'} | Generated on{' '}
                            {summary?.created_at ? new Date(summary.created_at).toLocaleDateString() : 'N/A'}
                        </Text>
                    </View>

                    <View style={styles.scoreBox}>
                        <Text style={[styles.scoreText, { color: conviction?.color || '#0f172a' }]}>
                            {summary?.aggregate_score ?? 0}/100
                        </Text>
                        <Text style={{ fontSize: 7, color: '#64748b', marginTop: 2 }}>
                            {conviction?.label?.toUpperCase() || 'SCORE'}
                        </Text>
                    </View>
                </View>

                {/* Executive Verdict Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Executive Verdict</Text>
                    <Text style={styles.paragraph}>
                        {summary?.executive_verdict || 'No verdict details provided.'}
                    </Text>
                </View>

                {/* Dimensional Scores Breakdown */}
                {dimensionsList.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Dimensional Breakdown</Text>
                        {dimensionsList.map((dim) => (
                            <View key={dim.key} style={styles.card}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
                                    <Text style={styles.cardTitle}>{dim.label}</Text>
                                    <Text style={{ fontFamily: 'Helvetica-Bold', color: '#4f46e5' }}>
                                        {dim.score}/10
                                    </Text>
                                </View>
                                {dim.rationale && <Text style={styles.paragraph}>{dim.rationale}</Text>}
                            </View>
                        ))}
                    </View>
                )}

                {/* Competitive Landscape */}
                {summary?.competitive_landscape?.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Competitive Landscape</Text>
                        {summary.competitive_landscape.map((comp, idx) => (
                            <View key={idx} style={styles.card}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                                    <Text style={styles.cardTitle}>{comp.name}</Text>
                                    <Text style={styles.badge}>Threat: {comp.threat_level}</Text>
                                </View>
                                <Text style={styles.paragraph}>{comp.description}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* Critical Vulnerabilities / Risks */}
                {summary?.critical_vulnerabilities?.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Critical Vulnerabilities & Risks</Text>
                        {summary.critical_vulnerabilities.map((risk, idx) => (
                            <View key={idx} style={styles.listItem}>
                                <Text style={styles.bullet}>•</Text>
                                <Text style={styles.listText}>{risk}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* Actionable Next Steps */}
                {summary?.actionable_next_steps?.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Actionable Next Steps</Text>
                        {summary.actionable_next_steps.map((step, idx) => (
                            <View key={idx} style={styles.listItem}>
                                <Text style={styles.bullet}>{idx + 1}.</Text>
                                <Text style={styles.listText}>{step}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* Footer */}
                <Text
                    style={styles.footer}
                    render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages} — Confidential Validation Report`}
                    fixed
                />
            </Page>
        </Document>
    )
}