import {
    Document,
    Page,
    Text,
    View,
    Image as PDFImage,
    StyleSheet,
} from "@react-pdf/renderer";

/* ─────────────────────────────
   PALETTE — one accent, clean
──────────────────────────── */
const C = {
    accent: "#4F46E5", // single brand color
    accentSoft: "#EEF2FF",
    ink: "#0F172A",
    body: "#374151",
    muted: "#6B7280",
    subtle: "#9CA3AF",
    border: "#E5E7EB",
    bg: "#F9FAFB",
    white: "#FFFFFF",

    // status chips
    green: "#059669",
    greenBg: "#ECFDF5",
    orange: "#D97706",
    orangeBg: "#FFFBEB",
    red: "#DC2626",
    redBg: "#FEF2F2",
};

const styles = StyleSheet.create({
    page: {
        paddingTop: 52,
        paddingBottom: 56,
        paddingHorizontal: 52,
        fontFamily: "Helvetica",
        fontSize: 10,
        color: C.body,
        lineHeight: 1.7,
        backgroundColor: C.white,
    },

    /* ── HEADER ── */
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 32,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: C.border,
    },
    logo: { width: 110 },
    headerRight: { alignItems: "flex-end" },
    headerTag: {
        fontSize: 7.5,
        color: C.accent,
        textTransform: "uppercase",
        letterSpacing: 2,
        marginBottom: 4,
        fontFamily: "Helvetica-Bold",
    },
    headerMeta: {
        fontSize: 8,
        color: C.muted,
    },

    /* ── HERO ── */
    hero: { marginBottom: 28 },
    reportTitle: {
        fontSize: 22,
        fontFamily: "Helvetica-Bold",
        color: C.ink,
        lineHeight: 1.25,
        marginBottom: 6,
    },
    accentLine: {
        width: 36,
        height: 3,
        backgroundColor: C.accent,
        borderRadius: 2,
    },

    /* ── STATS ROW ── */
    statsRow: {
        flexDirection: "row",
        marginBottom: 36,
        gap: 0,
    },
    statItem: {
        flex: 1,
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: C.border,
        marginRight: -1, // collapse borders
    },
    statItemFirst: {
        borderLeftWidth: 3,
        borderLeftColor: C.accent,
    },
    statValue: {
        fontSize: 18,
        fontFamily: "Helvetica-Bold",
        color: C.ink,
        marginBottom: 2,
    },
    statLabel: {
        fontSize: 7,
        color: C.muted,
        textTransform: "uppercase",
        letterSpacing: 1,
    },

    /* ── SECTION ── */
    section: { marginBottom: 28 },
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: C.border,
    },
    sectionNum: {
        fontSize: 12,
        fontFamily: "Helvetica-Bold",
        color: C.accent,
        marginRight: 8,
        letterSpacing: 0.5,
    },
    sectionLabel: {
        fontSize: 12,
        fontFamily: "Helvetica-Bold",
        color: C.ink,
        letterSpacing: 0.2,
    },

    body: {
        fontSize: 10,
        color: C.body,
        lineHeight: 1.8,
    },

    /* ── THEME CARD ── */
    themeCard: {
        marginBottom: 16,
    },
    themeCardTop: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 14,
        paddingVertical: 10,
    },
    themeNum: {
        fontSize: 10,
        fontFamily: "Helvetica-Bold",
        color: C.accent,
        marginRight: 8,
        width: 18,
    },
    themeTitle: {
        fontSize: 10,
        fontFamily: "Helvetica-Bold",
        color: C.ink,
    },
    themeBody: {
        paddingHorizontal: 14,
        paddingTop: 10,
        paddingBottom: 2,
        fontSize: 9.5,
        color: C.body,
        lineHeight: 1.75,
    },

    /* ── PAIN POINTS ── */
    painWrap: { paddingHorizontal: 14, paddingBottom: 12 },
    painPoint: {
        marginTop: 8,
        paddingLeft: 10,
        paddingVertical: 8,
        paddingRight: 10,
    },
    painIssue: {
        fontSize: 9.5,
        fontFamily: "Helvetica-Bold",
        color: C.ink,
        marginBottom: 3,
    },
    painIssueTop: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
    },
    painIssueNum: {
        fontSize: 9,
        fontFamily: "Helvetica-Bold",
        color: C.accent,
        marginRight: 8,
        width: 16,
    },
    painImpact: {
        fontSize: 9,
        color: C.body,
        lineHeight: 1.65,
        marginBottom: 4,
    },
    quote: {
        fontSize: 8.5,
        fontFamily: "Helvetica-Oblique",
        color: C.muted,
        lineHeight: 1.6,
    },

    /* ── RECOMMENDATIONS ── */
    recRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 14,
        paddingBottom: 14,
        borderBottomWidth: 1,
        borderBottomColor: C.border,
    },
    recNumText: {
        fontSize: 10,
        fontFamily: "Helvetica-Bold",
        color: C.accent,
        marginRight: 8,
        width: 18,
    },
    recContent: { flex: 1 },
    recTitle: {
        fontSize: 10,
        fontFamily: "Helvetica-Bold",
        color: C.ink,
        marginBottom: 4,
    },
    recBadgeRow: {
        flexDirection: "row",
        gap: 6,
        marginBottom: 6,
    },
    badge: {
        paddingHorizontal: 7,
        paddingVertical: 2,
        borderRadius: 4,
    },
    badgeText: {
        fontSize: 7,
        fontFamily: "Helvetica-Bold",
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    recBody: {
        fontSize: 9.5,
        color: C.body,
        lineHeight: 1.75,
    },

    /* ── MARKET TILES ── */
    marketTile: {
        padding: 12,
        marginBottom: 8,
    },
    marketTileTop: {
        fontSize: 9,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
    },
    marketTileNum: {
        fontSize: 9,
        fontFamily: "Helvetica-Bold",
        color: C.accent,
        textTransform: "uppercase",
        letterSpacing: 1.5,
        marginBottom: 6,
        paddingRight: 8,
    },
    marketTileLabel: {
        fontSize: 9,
        fontFamily: "Helvetica-Bold",
        color: C.accent,
        textTransform: "uppercase",
        letterSpacing: 1.5,
        marginBottom: 6,
    },
    marketTileBody: {
        fontSize: 9,
        color: C.body,
        lineHeight: 1.7,
    },

    /* ── METHODOLOGY ── */
    methodBox: {
        padding: 14,
    },
    methodText: {
        fontSize: 9,
        color: C.muted,
        lineHeight: 1.75,
    },

    /* ── FOOTER ── */
    footer: {
        position: "absolute",
        bottom: 22,
        left: 185,
        right: 52,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    footerText: {
        fontSize: 7.5,
        color: C.subtle,
    },
    footerAccent: {
        fontSize: 7.5,
        color: C.accent,
        fontFamily: "Helvetica-Bold",
    },
});

/* ─────────────────────────────
   BADGE HELPERS
──────────────────────────── */
function effortBadge(effort = "") {
    const k = effort.toLowerCase();
    if (k.includes("low")) return { bg: C.greenBg, text: C.green };
    if (k.includes("high")) return { bg: C.redBg, text: C.red };
    return { bg: C.orangeBg, text: C.orange };
}
function impactBadge(impact = "") {
    const k = impact.toLowerCase();
    if (k.includes("high")) return { bg: C.accentSoft, text: C.accent };
    if (k.includes("low")) return { bg: C.bg, text: C.muted };
    return { bg: C.orangeBg, text: C.orange };
}

/* ─────────────────────────────
   SECTION WRAPPER
──────────────────────────── */
function Section({ num, label, children }) {
    return (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionNum}>{num}</Text>
                <Text style={styles.sectionLabel}>{label}</Text>
            </View>
            {children}
        </View>
    );
}

/* ─────────────────────────────
   MAIN
──────────────────────────── */
export const SummaryPdf = ({ data }) => {
    if (!data) return null;

    const themes = data.themes ?? [];
    const steps = (data.actionable_next_steps ?? []).sort(
        (a, b) => (a.priority ?? 0) - (b.priority ?? 0),
    );
    const brands = data.market_signals?.brands_mentioned ?? [];
    const demos = data.market_signals?.demographic_signals ?? [];
    const emerging = data.market_signals?.emerging_topics ?? [];
    const geo = data.market_signals?.geographic_signals ?? [];

    const analyzedDate = data.analyzed_at
        ? new Date(data.analyzed_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
          })
        : null;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* HEADER */}
                <View style={styles.header}>
                    <PDFImage
                        src="/images/logo_with_text_2.png"
                        style={styles.logo}
                    />
                    <Text style={styles.headerMeta}>
                        www.problempusle.site - TactByte Technologies
                    </Text>
                </View>

                {/* HERO */}
                <View style={styles.hero}>
                    <Text style={styles.headerTag}>
                        Reddit Intelligence Report
                    </Text>
                    <Text style={styles.reportTitle}>{data.search_query}</Text>
                    <View style={styles.accentLine} />
                </View>

                {/* STATS */}
                <View style={styles.statsRow}>
                    {[
                        {
                            value: data.total_signals ?? "—",
                            label: "Total Signals",
                            first: true,
                        },
                        {
                            value: data.meta?.total_posts ?? "—",
                            label: "Posts",
                        },
                        {
                            value: data.meta?.total_comments ?? "—",
                            label: "Comments",
                        },
                        { value: themes.length, label: "Themes" },
                    ].map((s, i) => (
                        <View
                            key={i}
                            style={[
                                styles.statItem,
                                s.first && styles.statItemFirst,
                            ]}
                        >
                            <Text style={styles.statValue}>{s.value}</Text>
                            <Text style={styles.statLabel}>{s.label}</Text>
                        </View>
                    ))}
                </View>

                {/* 01 EXECUTIVE SUMMARY */}
                {data.executive_summary && (
                    <Section num="1" label="Executive Summary">
                        <Text style={styles.body}>
                            {data.executive_summary}
                        </Text>
                    </Section>
                )}

                {/* 02 CORE INSIGHT */}
                {data.direct_answer && (
                    <Section num="2" label="Core Insight">
                        <Text style={styles.body}>{data.direct_answer}</Text>
                    </Section>
                )}

                {/* 03 THEMATIC INTELLIGENCE */}
                {themes.length > 0 && (
                    <Section num="3" label="Thematic Intelligence">
                        {themes.map((theme, ti) => (
                            <View key={ti} style={styles.themeCard}>
                                <View style={styles.themeCardTop}>
                                    <Text style={styles.themeNum}>
                                        {`3.${ti + 1}`}
                                    </Text>
                                    <Text style={styles.themeTitle}>
                                        {theme.title}
                                    </Text>
                                </View>
                                <Text style={styles.themeBody}>
                                    {theme.summary}
                                </Text>
                                {(theme.pain_points ?? []).length > 0 && (
                                    <View style={styles.painWrap}>
                                        {(theme.pain_points ?? []).map(
                                            (pp, pi) => (
                                                <View
                                                    key={pi}
                                                    style={styles.painPoint}
                                                >
                                                    <View
                                                        style={
                                                            styles.painIssueTop
                                                        }
                                                    >
                                                        <Text
                                                            style={
                                                                styles.painIssueNum
                                                            }
                                                        >
                                                            {`3.${ti + 1}.${pi + 1}`}
                                                        </Text>
                                                        <Text
                                                            style={
                                                                styles.painIssue
                                                            }
                                                        >
                                                            {pp.issue}
                                                        </Text>
                                                    </View>
                                                    <Text
                                                        style={
                                                            styles.painImpact
                                                        }
                                                    >
                                                        {pp.impact}
                                                    </Text>
                                                    {pp.example_quote && (
                                                        <Text
                                                            style={styles.quote}
                                                        >
                                                            "{pp.example_quote}"
                                                        </Text>
                                                    )}
                                                </View>
                                            ),
                                        )}
                                    </View>
                                )}
                            </View>
                        ))}
                    </Section>
                )}

                {/* 04 RECOMMENDATIONS */}
                {steps.length > 0 && (
                    <Section num="4" label="Strategic Recommendations">
                        {steps.map((step, i) => {
                            const eb = effortBadge(step.effort);
                            const ib = impactBadge(step.impact);
                            return (
                                <View key={i} style={styles.recRow}>
                                    <View>
                                        <Text style={styles.recNumText}>
                                            {`4.${i + 1}`}
                                        </Text>
                                    </View>
                                    <View style={styles.recContent}>
                                        <Text style={styles.recTitle}>
                                            {step.step}
                                        </Text>
                                        <View style={styles.recBadgeRow}>
                                            {step.impact && (
                                                <View
                                                    style={[
                                                        styles.badge,
                                                        {
                                                            backgroundColor:
                                                                ib.bg,
                                                        },
                                                    ]}
                                                >
                                                    <Text
                                                        style={[
                                                            styles.badgeText,
                                                            { color: ib.text },
                                                        ]}
                                                    >
                                                        {step.impact} impact
                                                    </Text>
                                                </View>
                                            )}
                                        </View>
                                        <Text style={styles.recBody}>
                                            {step.how}
                                        </Text>
                                    </View>
                                </View>
                            );
                        })}
                    </Section>
                )}

                {/* 05 MARKET INTELLIGENCE */}
                <Section num="5" label="Market Intelligence">
                    <View>
                        {[
                            { label: "Brands", items: brands },
                            { label: "Demographics", items: demos },
                            { label: "Emerging Topics", items: emerging },
                            { label: "Geography", items: geo },
                        ].map((tile, i) => (
                            <View key={i} style={styles.marketTile}>
                                <View style={styles.marketTileTop}>
                                    <Text style={styles.marketTileNum}>
                                        {`5.${i + 1}`}
                                    </Text>
                                    <Text style={styles.marketTileLabel}>
                                        {tile.label}
                                    </Text>
                                </View>
                                <Text style={styles.marketTileBody}>
                                    {tile.items.join(", ") || "—"}
                                </Text>
                            </View>
                        ))}
                    </View>
                </Section>

                {/* 06 METHODOLOGY */}
                {data.meta?.caveats && (
                    <Section num="6" label="Research Methodology">
                        <View style={styles.methodBox}>
                            <Text style={styles.methodText}>
                                {data.meta.caveats}
                            </Text>
                        </View>
                    </Section>
                )}

                {/* FOOTER */}
                <View style={styles.footer} fixed>
                    <Text style={styles.footerText}>
                        Generated by Problem Pulse AI at{" "}
                        <Text> {analyzedDate} </Text>· TactByte Technologies
                    </Text>
                </View>
            </Page>
        </Document>
    );
};
