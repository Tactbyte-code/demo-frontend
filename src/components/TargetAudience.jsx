"use client";
import { motion } from 'framer-motion';
import {
    Rocket,
    Building2,
    UserCheck,
    Users,
    CheckCircle2,
    Activity,
    ShieldCheck
} from 'lucide-react';

const audiences = [
    {
        title: "Startup Founders",
        subtitle: "Product-Market Fit",
        description: "Validate ideas before writing a single line of code or spending a dollar.",
        icon: Rocket,
        metric: "De-risk MVP",
        features: ["P-M Fit Analysis", "Gap Discovery"],
        color: "text-blue-500"
    },
    {
        title: "Agencies & Consultants",
        subtitle: "Strategic Delivery",
        description: "Discover services businesses are actively seeking and build offers around real demand.",
        icon: Building2,
        metric: "Higher Win-Rate",
        features: ["Client ROI", "Trend Logic"],
        color: "text-amber-500"
    },
    {
        title: "Product Managers",
        subtitle: "Expert Advisory",
        description: "Identify unmet needs in your market with evidence, not internal politics.",
        icon: UserCheck,
        metric: "Evidence-Based",
        features: ["Niche Research", "Deep Metrics"],
        color: "text-emerald-500"
    },
    {
        title: "Entrepreneurs",
        subtitle: "Engineering Units",
        description: "Find profitable opportunities without guessing. Data-backed confidence from day one.",
        icon: Users,
        metric: "Sprint Velocity",
        features: ["Backlog Grooming", "Validation"],
        color: "text-primary"
    }
];

export default function TargetAudience() {
    return (
        <section className="pb-24 bg-background relative overflow-hidden">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[40px_40px]" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="h-px w-8 bg-primary" />
                        <span className="text-primary font-bold text-xs uppercase tracking-[0.3em]">User Segments</span>
                        <div className="h-px w-8 bg-primary" />
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
                        Built for the people <br />
                        <span className="text-primary">building the future.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {audiences.map((group, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex flex-col bg-surface border border-border-solid rounded-[2.5rem] p-2 hover:border-primary/40 transition-all duration-500 group"
                        >
                            {/* Inner Dashboard Module — distinct from page bg */}
                            <div className="rounded-4xl p-8 flex-1 flex flex-col" style={{ background: 'var(--gradient-card)' }}>
                                <div className="flex justify-between items-start mb-8">
                                    <div className={`p-3 rounded-2xl bg-surface shadow-sm border border-border-solid ${group.color} group-hover:scale-110 transition-transform duration-500`}>
                                        <group.icon className="w-6 h-6" />
                                    </div>
                                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success-bg border border-success/20">
                                        <div className="w-1 h-1 rounded-full bg-success" />
                                        <span className="text-[9px] font-bold text-success uppercase tracking-wider">Verified</span>
                                    </div>
                                </div>

                                <div className="space-y-3 mb-8">
                                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{group.subtitle}</p>
                                    <h3 className="text-2xl font-bold text-foreground tracking-tight leading-tight">
                                        {group.title}
                                    </h3>
                                    <p className="text-muted text-sm leading-relaxed min-h-[80px]">
                                        {group.description}
                                    </p>
                                </div>

                                {/* Feature Tags */}
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {group.features.map((tag, i) => (
                                        <span key={i} className="text-[10px] font-bold py-1 px-2.5 bg-background border border-border-solid rounded-lg text-subtle">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Footer */}
                                <div className="mt-auto pt-6 border-t border-border-solid flex justify-between items-center">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[9px] text-subtle font-bold uppercase tracking-widest">Primary KPI</span>
                                        <span className="text-xs font-bold text-foreground flex items-center gap-1">
                                            <Activity className="w-3 h-3 text-primary" />
                                            {group.metric}
                                        </span>
                                    </div>
                                    <div className="h-8 w-8 rounded-full border border-border-solid flex items-center justify-center text-muted group-hover:text-primary group-hover:border-primary/40 transition-colors">
                                        <CheckCircle2 className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}