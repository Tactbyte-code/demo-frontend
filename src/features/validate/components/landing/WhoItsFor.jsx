
import {
    Rocket,
    Code2,
    BriefcaseBusiness,
    ChartNoAxesCombined,
    ArrowUpRight,
    Sparkles,
    Lightbulb,
    Search,
    Target,
} from "lucide-react";

const audiences = [
    {
        number: "01",
        title: "Aspiring founders",
        description:
            "You have an idea that could become something big. Find out whether the problem is real before putting your time, money, and energy behind it.",
        tag: "FROM IDEA TO OPPORTUNITY",
        icon: Rocket,
        className: "lg:col-span-7",
        accent: "#7138D5",
        background: "from-[#F2E9FF] to-[#FCF8FF]",
        visual: "founder",
    },
    {
        number: "02",
        title: "Indie hackers",
        description:
            "Build with direction. Discover underserved problems, understand what users are asking for, and find your next product opportunity.",
        tag: "BUILD WHAT PEOPLE NEED",
        icon: Code2,
        className: "lg:col-span-5",
        accent: "#A52BC2",
        background: "from-[#FBEAFF] to-[#FFF8FD]",
        visual: "builder",
    },
    {
        number: "03",
        title: "Business owners",
        description:
            "Explore new markets, uncover customer pain points, and evaluate your next product or business expansion with better context.",
        tag: "GROW WITH CLARITY",
        icon: BriefcaseBusiness,
        className: "lg:col-span-5",
        accent: "#C12D9A",
        background: "from-[#FCEAF4] to-[#FFFAFC]",
        visual: "business",
    },
    {
        number: "04",
        title: "Product builders",
        description:
            "Don't rely on assumptions. Understand market demand and competition before committing resources to your next product.",
        tag: "MAKE INFORMED DECISIONS",
        icon: ChartNoAxesCombined,
        className: "lg:col-span-7",
        accent: "#7138D5",
        background: "from-[#EEEAFE] to-[#FAF9FF]",
        visual: "product",
    },
];

function AudienceVisual({ type, accent }) {
    if (type === "founder") {
        return (
            <div className="relative flex h-32 w-full items-center justify-center">
                <div className="absolute h-28 w-28 rounded-full border border-dashed border-[#CDB5F0]" />
                <div className="absolute h-20 w-20 rounded-full border border-[#DCCAF5]" />

                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-white bg-white shadow-[0_12px_30px_rgba(113,56,213,0.16)]">
                    <Lightbulb
                        className="h-8 w-8"
                        style={{ color: accent }}
                    />
                </div>

                <div className="absolute left-[22%] top-4 flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-md">
                    <Sparkles className="h-4 w-4 text-[#A52BC2]" />
                </div>

                <div className="absolute bottom-3 right-[22%] flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-md">
                    <Target className="h-4 w-4 text-[#7138D5]" />
                </div>

                <div className="absolute right-[16%] top-5 h-2 w-2 rounded-full bg-[#D946EF]" />
                <div className="absolute bottom-5 left-[17%] h-2.5 w-2.5 rounded-full bg-[#A78BFA]" />
            </div>
        );
    }

    if (type === "builder") {
        return (
            <div className="relative flex h-32 items-center justify-center">
                <div className="w-full max-w-[230px] -rotate-2 rounded-xl border border-[#EAD9F5] bg-white p-3 shadow-[0_12px_30px_rgba(113,56,213,0.10)] transition-transform duration-500 group-hover:rotate-0">
                    <div className="mb-3 flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-[#F9A8D4]" />
                        <span className="h-2 w-2 rounded-full bg-[#C4B5FD]" />
                        <span className="h-2 w-2 rounded-full bg-[#A7F3D0]" />
                        <span className="ml-auto text-[9px] font-semibold text-[#A18CB8]">
                            idea.js
                        </span>
                    </div>

                    <div className="space-y-2 font-mono text-[10px]">
                        <p className="text-[#A52BC2]">
                            const <span className="text-[#7138D5]">idea</span> = {"{"}
                        </p>
                        <p className="pl-4 text-[#8A779E]">
                            problem: <span className="text-[#D946A8]">"real"</span>,
                        </p>
                        <p className="pl-4 text-[#8A779E]">
                            demand: <span className="text-emerald-600">"validated"</span>
                        </p>
                        <p className="text-[#A52BC2]">{"}"}</p>
                    </div>
                </div>
            </div>
        );
    }

    if (type === "business") {
        return (
            <div className="relative flex h-32 items-end justify-center gap-3 pb-2">
                {[38, 58, 46, 78, 65, 94, 75].map((height, index) => (
                    <div
                        key={index}
                        className="flex w-5 items-end overflow-hidden rounded-t-lg bg-white shadow-sm"
                        style={{ height: `${height}%` }}
                    >
                        <div
                            className="w-full rounded-t-lg transition-all duration-500 group-hover:opacity-100"
                            style={{
                                height: `${45 + index * 7}%`,
                                background: `linear-gradient(to top, ${accent}, #E9B9F4)`,
                            }}
                        />
                    </div>
                ))}

                <div className="absolute right-[12%] top-2 flex items-center gap-1.5 rounded-full border border-white bg-white px-3 py-1.5 shadow-md">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-[9px] font-bold text-slate-600">
                        Market insights
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className="relative flex h-32 items-center justify-center">
            <div className="relative flex w-full max-w-[240px] items-center justify-between">
                {[
                    { icon: Search, label: "Research" },
                    { icon: Target, label: "Validate" },
                    { icon: ChartNoAxesCombined, label: "Decide" },
                ].map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.label}
                            className="relative z-10 flex flex-col items-center gap-2"
                        >
                            <div
                                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white bg-white shadow-[0_8px_24px_rgba(113,56,213,0.12)] transition-transform duration-300 group-hover:-translate-y-1"
                                style={{ transitionDelay: `${index * 60}ms` }}
                            >
                                <Icon
                                    className="h-5 w-5"
                                    style={{ color: accent }}
                                />
                            </div>
                            <span className="text-[9px] font-semibold text-[#8B779F]">
                                {item.label}
                            </span>
                        </div>
                    );
                })}

                <div className="absolute left-[18%] right-[18%] top-6 h-px border-t border-dashed border-[#C9AFE9]" />
            </div>
        </div>
    );
}

function AudienceCard({ item }) {
    const Icon = item.icon;

    return (
        <article
            className={`group relative flex min-h-[330px] flex-col overflow-hidden rounded-[26px] border border-[#EDE3F6] bg-gradient-to-br ${item.background} p-6 shadow-[0_8px_28px_rgba(73,35,112,0.05)] transition-all duration-500 hover:-translate-y-2 hover:border-[#D8C2EF] hover:shadow-[0_22px_50px_rgba(113,56,213,0.13)] sm:p-7 ${item.className}`}
        >
            <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-white/60 blur-3xl transition-transform duration-700 group-hover:scale-150" />

            <div className="relative z-10 flex items-start justify-between">
                <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/80 bg-white shadow-sm"
                >
                    <Icon
                        className="h-5 w-5"
                        style={{ color: item.accent }}
                    />
                </div>

                <span className="font-mono text-xs font-semibold tracking-wider text-[#B6A3C9]">
                    / {item.number}
                </span>
            </div>

            <div className="relative z-10 mt-5">
                <p
                    className="text-[10px] font-bold tracking-widest"
                    style={{ color: item.accent }}
                >
                    {item.tag}
                </p>

                <h3 className="mt-2 text-xl font-extrabold tracking-tight text-[#291542] sm:text-2xl">
                    {item.title}
                </h3>

                <p className="mt-2 max-w-[440px] text-sm leading-6 text-[#78658D]">
                    {item.description}
                </p>
            </div>

            <div className="relative z-10 mt-auto pt-3">
                <AudienceVisual type={item.visual} accent={item.accent} />
            </div>
        </article>
    );
}

export default function WhoItsFor() {
    return (
        <section
            id="who-its-for"
            className="relative overflow-hidden bg-[#FDFBFF] px-5 py-20 sm:px-8 lg:px-12 lg:pb-20"
        >
            {/* Ambient background details */}
            <div className="pointer-events-none absolute -left-40 top-40 h-96 w-96 rounded-full bg-[#E9D5FF]/30 blur-[110px]" />
            <div className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-[#FBCFE8]/30 blur-[110px]" />

            <div className="relative mx-auto max-w-[1240px]">
                {/* Section heading */}
                <div className="mb-12 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 rounded-full border border-[#E9D5FF] bg-white px-4 py-2 shadow-sm">
                            <Sparkles className="h-3.5 w-3.5 text-[#A52BC2]" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#7138D5]">
                                Made for idea people
                            </span>
                        </div>

                        <h2 className="mt-6 text-4xl font-black leading-[1.12] tracking-tight text-[#291542] sm:text-5xl lg:text-[58px]">
                            Different journeys.
                            <br />
                            <span className="bg-gradient-to-r from-[#7138D5] via-[#A52BC2] to-[#E0449B] bg-clip-text text-transparent">
                                One clearer direction.
                            </span>
                        </h2>
                    </div>

                    <p className="max-w-sm text-sm leading-7 text-[#78658D] lg:pb-2">
                        Great ideas come from everywhere. Whether you're
                        starting from scratch or building your next product,
                        start with a better understanding of the opportunity.
                    </p>
                </div>

                {/* Audience bento grid */}
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
                    {audiences.map((item) => (
                        <AudienceCard key={item.number} item={item} />
                    ))}
                </div>

                {/* Closing statement */}
                <div className="mt-10 flex flex-col items-center justify-center gap-3 text-center">
                    <div className="flex items-center gap-2 text-[#A52BC2]">
                        <span className="h-px w-8 bg-[#DCC8EF]" />
                        <Sparkles className="h-4 w-4" />
                        <span className="h-px w-8 bg-[#DCC8EF]" />
                    </div>

                    <p className="text-sm font-semibold text-[#78658D]">
                        You bring the idea. We'll help you understand the opportunity.
                    </p>
                </div>
            </div>
        </section>
    );
}
