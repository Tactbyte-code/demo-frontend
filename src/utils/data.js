import {
    LayoutDashboard,
    ChartNoAxesCombined,
    Target,
    UserRound,
    ShieldCheck,
    Wallet,
    Bell,
    Database,
} from 'lucide-react';
import { Activity } from 'react';
import { BsRobot } from "react-icons/bs";
import { FaCheckCircle, FaReddit } from "react-icons/fa";
import { FaGooglePlay } from "react-icons/fa";

export const apiData = {
    "query": "gym in india",
    "subreddit": "r/Fitness_India",
    "analyzed_at": "2026-02-27T14:35:36Z",
    "executive_summary": "The r/Fitness_India community focuses on fitness challenges, nutrition debates, and supplement controversies in India. Users discuss protein intake, gym routines, and parental attitudes toward health, with strong opinions about brand quality and health risks.",
    "overall_sentiment": "mixed",
    "total_signals": 40,
    "themes": [
        {
            "id": "theme_1",
            "title": "Protein Consumption Challenges",
            "summary": "Users express frustration about Indian parents' lack of awareness about daily protein needs, often resorting to self-sourcing supplements like whey and chicken. Cultural preferences for vegetarian diets and reliance on dal as protein are frequently criticized as inadequate.",
            "sentiment": "negative",
            "signal_count": 2,
            "relevance_score": 90,
            "brands_mentioned": [
                "Muscleblaze",
                "Avvatar",
                "QNT",
                "Muscletech",
                "Healthfarm"
            ],
            "demographic_signals": [
                "Indian parents",
                "vegetarian households"
            ],
            "pain_points": [
                {
                    "issue": "Parental Disinterest in Nutrition",
                    "severity": "High",
                    "sentiment": "negative",
                    "example_quote": "Personllly I have given up on explaining shit to them",
                    "impact": "Health consequences for individuals"
                },
                {
                    "issue": "Protein Misunderstanding",
                    "severity": "High",
                    "sentiment": "negative",
                    "example_quote": "They’ll happily drown everything in ghee and call it healthy, but ask them to think about eating protein regularly? They’d say they eat dal everyday which is enough protein as per them.",
                    "impact": "Nutritional deficiencies"
                }
            ],
            "quotes": [
                {
                    "text": "Personllly I have given up on explaining shit to them",
                    "author": "o6rbw9j",
                    "comment_id": "o6rbw9j",
                    "permalink": "https://reddit.com/r/Fitness_India/comments/1rbjy20/indian_parents_are_so_unaware_and_disinterested/-/o6rbw9j/"
                },
                {
                    "text": "They’ll happily drown everything in ghee and call it healthy, but ask them to think about eating protein regularly? They’d say they eat dal everyday which is enough protein as per them.",
                    "author": "o6rfvky",
                    "comment_id": "o6rfvky",
                    "permalink": "https://reddit.com/r/Fitness_India/comments/1rbjy20/indian_parents_are_so_unaware_and_disinterested/-/o6rfvky/"
                }
            ],
            "sources": [
                {
                    "kind": "comment",
                    "id": "o6rbw9j",
                    "permalink": "/r/Fitness_India/comments/1rbjy20/o6rbw9j",
                    "preview": "Personllly I have given up on explaining shit to them",
                    "author": "o6rbw9j",
                    "score": 12,
                    "created": "2024-06-20T12:00:00Z"
                },
                {
                    "kind": "comment",
                    "id": "o6rfvky",
                    "permalink": "/r/Fitness_India/comments/1rbjy20/o6rfvky",
                    "preview": "They’ll happily drown everything in ghee and call it healthy, but ask them to think about eating protein regularly? They’d say they eat dal everyday which is enough protein as per them.",
                    "author": "o6rfvky",
                    "score": 28,
                    "created": "2024-06-20T12:00:00Z"
                }
            ],
            "reddit_user_actions": [
                "Discussing brand authenticity",
                "Sharing personal supplement experiences",
                "Seeking advice on protein alternatives"
            ],
            "system_actions": [
                "Develop educational content on protein sources",
                "Create tools to verify supplement authenticity",
                "Promote culturally relevant vegetarian protein options"
            ]
        },
        {
            "id": "theme_2",
            "title": "Supplement Brand Controversies",
            "summary": "Users debate the quality and safety of protein brands like Herbalife, with multiple accounts of health risks and scams. There is skepticism toward white-labeled products and calls for transparency in manufacturing.",
            "sentiment": "negative",
            "signal_count": 2,
            "relevance_score": 84,
            "brands_mentioned": [
                "Herbalife",
                "Muscleblaze",
                "Avvatar",
                "QNT",
                "Healthfarm",
                "Optimum"
            ],
            "demographic_signals": [
                "Fitness enthusiasts",
                "Parents"
            ],
            "pain_points": [
                {
                    "issue": "Herbalife Health Risks",
                    "severity": "High",
                    "sentiment": "negative",
                    "example_quote": "2 time kidney transplant recipient here because of this bloody shit",
                    "impact": "Severe health consequences"
                },
                {
                    "issue": "White-Labeled Product Fraud",
                    "severity": "High",
                    "sentiment": "negative",
                    "example_quote": "You can't. Same is the case with mine. Ive made my mum understand but my dad, no way",
                    "impact": "Financial and health risks"
                }
            ],
            "quotes": [
                {
                    "text": "2 time kidney transplant recipient here because of this bloody shit",
                    "author": "o75d926",
                    "comment_id": "o75d926",
                    "permalink": "https://reddit.com/r/Fitness_India/comments/1rdfiwj/guys_recently_my_mum_started_taking_this/-/o75d926/"
                },
                {
                    "text": "You can't. Same is the case with mine. Ive made my mum understand but my dad, no way",
                    "author": "o6rcrql",
                    "comment_id": "o6rcrql",
                    "permalink": "https://reddit.com/r/Fitness_India/comments/1rbjy20/indian_parents_are_so_unaware_and_disinterested/-/o6rcrql/"
                }
            ],
            "sources": [
                {
                    "kind": "comment",
                    "id": "o75d926",
                    "permalink": "/r/Fitness_India/comments/1rdfiwj/o75d926",
                    "preview": "2 time kidney transplant recipient here because of this bloody shit",
                    "author": "o75d926",
                    "score": 337,
                    "created": "2024-06-20T12:00:00Z"
                },
                {
                    "kind": "comment",
                    "id": "o6rcrql",
                    "permalink": "/r/Fitness_India/comments/1rbjy20/o6rcrql",
                    "preview": "You can't. Same is the case with mine. Ive made my mum understand but my dad, no way",
                    "author": "o6rcrql",
                    "score": 6,
                    "created": "2024-06-20T12:00:00Z"
                }
            ],
            "reddit_user_actions": [
                "Reporting health issues",
                "Calling out scams",
                "Comparing brand quality"
            ],
            "system_actions": [
                "Implement stricter brand regulation",
                "Create health safety alerts",
                "Enhance user reporting mechanisms"
            ]
        },
        {
            "id": "theme_3",
            "title": "Gym and Fitness Accessibility",
            "summary": "A few users mention gym routines and challenges, such as timing protein intake post-workout. There is limited discussion about gym availability or accessibility in India, with most focus on nutrition and supplements.",
            "sentiment": "neutral",
            "signal_count": 1,
            "relevance_score": 78,
            "brands_mentioned": [],
            "demographic_signals": [
                "Urban fitness enthusiasts"
            ],
            "pain_points": [
                {
                    "issue": "Post-Workout Protein Timing",
                    "severity": "Medium",
                    "sentiment": "neutral",
                    "example_quote": "I drink this at 8. The muscles I worked on, I wouldn't be able to use them for simple tasks til",
                    "impact": "Training effectiveness"
                }
            ],
            "quotes": [
                {
                    "text": "I drink this at 8. The muscles I worked on, I wouldn't be able to use them for simple tasks til",
                    "author": "lz84qxp",
                    "comment_id": "lz84qxp",
                    "permalink": "https://reddit.com/r/Fitness_India/comments/1d9aqni/fitness_india_mega_thread_june_2024/-/lz84qxp/"
                }
            ],
            "sources": [
                {
                    "kind": "comment",
                    "id": "lz84qxp",
                    "permalink": "/r/Fitness_India/comments/1d9aqni/lz84qxp",
                    "preview": "I drink this at 8. The muscles I worked on, I wouldn't be able to use them for simple tasks til",
                    "author": "lz84qxp",
                    "score": 3,
                    "created": "2024-06-20T12:00:00Z"
                }
            ],
            "reddit_user_actions": [
                "Discussing workout routines",
                "Sharing supplement timing issues"
            ],
            "system_actions": [
                "Develop gym accessibility resources",
                "Integrate fitness timing guides"
            ]
        }
    ],
    "market_signals": {
        "brands_mentioned": [
            "Herbalife",
            "Muscleblaze",
            "Avvatar",
            "QNT",
            "Muscletech",
            "Healthfarm",
            "Optimum"
        ],
        "demographic_signals": [
            "Indian parents",
            "Urban fitness enthusiasts",
            "Vegetarian households"
        ],
        "geographic_signals": [
            "India",
            "Urban areas"
        ],
        "emerging_topics": [
            "Supplement safety",
            "Cultural nutrition education",
            "Gym accessibility"
        ]
    },
    "meta": {
        "confidence": "Low",
        "caveats": "No significant caveats.",
        "total_posts": 5,
        "total_comments": 40,
        "model": "qwen3:8b",
        "subreddit_rank": 2623,
        "subreddit_score": 0.5521
    }
};

export const plans = [
    {
        id: "basic",
        name: "Basic",
        tag: "Get started",
        monthlyPrice: 0,
        yearlyPrice: 0,
        description: "For individuals exploring what the platform can do.",
        accent: "var(--text-subtle)",
        accentBg: "var(--surface-raised)",
        cta: "Start Free",
        credits: {
            monthly: 500,
            yearly: 1200,
            unit: "credits",
            note: "Resets every month",
        },
        models: [
            { id: "qwen", name: "Qwen", included: true },
            { id: "sarvam", name: "Sarvam", included: false },
            { id: "claude", name: "Claude", included: false },
            { id: "gemini", name: "Gemini", included: false },
            { id: "openai", name: "OpenAI", included: false },
        ],
        features: [
            { text: "Up to 3 projects", included: true },
            { text: "100 credits / month", included: true },
            { text: "Qwen model access", included: true },
            { text: "Basic analytics dashboard", included: true },
            { text: "Community support", included: true },
            { text: "1 GB storage", included: true },
            { text: "API access", included: false },
            { text: "Custom integrations", included: false },
            { text: "Priority processing", included: false },
            { text: "Team collaboration", included: false },
            { text: "Dedicated account manager", included: false },
        ],
    },
    {
        id: "go",
        name: "Go",
        tag: "Most popular",
        monthlyPrice: 19,
        yearlyPrice: 15,
        description: "For growing teams who need more power and fewer limits.",
        accent: "var(--primary)",
        accentBg: "var(--info-bg)",
        cta: "Get Started",
        credits: {
            monthly: 2000,
            yearly: 25200,  // 2100/month — ~5% bonus for annual
            unit: "credits",
            note: "Resets every month",
        },
        models: [
            { id: "qwen", name: "Qwen", included: true },
            { id: "sarvam", name: "Sarvam", included: true },
            { id: "claude", name: "Claude", included: false },
            { id: "gemini", name: "Gemini", included: false },
            { id: "openai", name: "OpenAI", included: false },
        ],
        features: [
            { text: "Up to 15 projects", included: true },
            { text: "2,000 credits / month", included: true },
            { text: "Qwen + Sarvam model access", included: true },
            { text: "Advanced analytics & reports", included: true },
            { text: "Email support (48h SLA)", included: true },
            { text: "10 GB storage", included: true },
            { text: "API access", included: true },
            { text: "Custom integrations", included: false },
            { text: "Priority processing", included: false },
            { text: "Team collaboration (3 seats)", included: true },
            { text: "Dedicated account manager", included: false },
        ],
    },
    {
        id: "plus",
        name: "Plus",
        tag: "Best value",
        monthlyPrice: 49,
        yearlyPrice: 39,
        description: "For teams scaling fast and needing enterprise-grade tools.",
        accent: "var(--accent)",
        accentBg: "rgba(0, 229, 255, 0.06)",
        cta: "Upgrade to Plus",
        popular: true,
        credits: {
            monthly: 5000,
            yearly: 132000,  // 11000/month — ~10% bonus for annual
            unit: "credits",
            note: "Resets every month",
        },
        models: [
            { id: "qwen", name: "Qwen", included: true },
            { id: "sarvam", name: "Sarvam", included: true },
            { id: "claude", name: "Claude", included: true },
            { id: "gemini", name: "Gemini", included: true },
            { id: "openai", name: "OpenAI", included: false },
        ],
        features: [
            { text: "Unlimited projects", included: true },
            { text: "10,000 credits / month", included: true },
            { text: "Qwen, Sarvam, Claude, Gemini access", included: true },
            { text: "Full analytics suite + exports", included: true },
            { text: "Priority email & chat support", included: true },
            { text: "100 GB storage", included: true },
            { text: "Full API access + webhooks", included: true },
            { text: "Custom integrations", included: true },
            { text: "Priority processing", included: true },
            { text: "Team collaboration (10 seats)", included: true },
            { text: "Dedicated account manager", included: false },
        ],
    },
    {
        id: "pro",
        name: "Pro",
        tag: "Enterprise",
        monthlyPrice: 99,
        yearlyPrice: 79,
        description: "For large organizations with custom needs and SLA guarantees.",
        accent: "var(--warning)",
        accentBg: "var(--warning-bg)",
        cta: "Upgrade to Pro",
        credits: {
            monthly: 10000,
            yearly: 15000,
            unit: "credits",
            note: "Unlimited — no cap",
        },
        models: [
            { id: "qwen", name: "Qwen", included: true },
            { id: "sarvam", name: "Sarvam", included: true },
            { id: "claude", name: "Claude", included: true },
            { id: "gemini", name: "Gemini", included: true },
            { id: "openai", name: "OpenAI", included: true },
        ],
        features: [
            { text: "Unlimited projects", included: true },
            { text: "Unlimited credits", included: true },
            { text: "All models — Qwen, Sarvam, Claude, Gemini, OpenAI", included: true },
            { text: "Custom analytics + white-label", included: true },
            { text: "24/7 phone & dedicated support", included: true },
            { text: "Unlimited storage", included: true },
            { text: "Full API access + webhooks", included: true },
            { text: "Custom integrations", included: true },
            { text: "Priority processing + SLA", included: true },
            { text: "Unlimited team seats", included: true },
            { text: "Dedicated account manager", included: true },
        ],
    },
];

export const STATUS_TIER = {
    INITIALIZED: { label: 'Queued', color: 'var(--info)', tint: 'var(--info-bg)' },
    CREATED: { label: 'Queued', color: 'var(--info)', tint: 'var(--info-bg)' },
    VALIDATING: { label: 'In progress', color: 'var(--warning)', tint: 'var(--warning-bg)' },
    VALIDATED: { label: 'In progress', color: 'var(--warning)', tint: 'var(--warning-bg)' },
    SEARCHING: { label: 'In progress', color: 'var(--warning)', tint: 'var(--warning-bg)' },
    SEARCH_COMPLETED: { label: 'In progress', color: 'var(--warning)', tint: 'var(--warning-bg)' },
    SCORING: { label: 'In progress', color: 'var(--warning)', tint: 'var(--warning-bg)' },
    COMPLETED: { label: 'Completed', color: 'var(--success)', tint: 'var(--success-bg)' },
    FAILED: { label: 'Failed', color: 'var(--destructive)', tint: 'var(--destructive-bg)' },
};

export const reportData = {
    "schema_version": "1.0",
    "report_id": "rpt_7c1d9e42",
    "query_id": "q_8f3a2c1e",
    "status": "COMPLETED",
    "generated_at": "2026-10-15T09:30:00Z",
    "idea": {
        "title": "Automated invoice chasing for freelancers",
        "description": "A tool that tracks client invoices and sends polite automated payment reminders.",
        "industry": "Fintech / SaaS",
        "stage": "idea",
        "location": "Guwahati",
        "country_iso2": "IN",
        "business_type": "digital",
        "target_segment": "freelancers and solo consultants who invoice clients",
        "problem_statement": "Freelancers lose time and cash flow chasing late client payments."
    },
    "overall": {
        "viability_score": 81.7,
        "scale": "0-100, higher is more favourable for launching",
        "band": "Promising",
        "band_scale": [
            { "min": 75, "label": "Strong" },
            { "min": 55, "label": "Promising" },
            { "min": 40, "label": "Mixed" },
            { "min": 0, "label": "Weak" }
        ],
        "confidence": "medium",
        "verdict": "The pain is real and recurring, and launch costs are modest, but the invoicing space is crowded and several figures rest on assumptions.",
        "score_breakdown": [
            { "parameter": "pain", "label": "Problem and pain-point severity", "weight": 0.20, "effective_weight": 0.2105, "score": 69.0, "rating": "moderate", "confidence": "high", "status": "scored", "contribution": 14.5 },
            { "parameter": "market", "label": "Market size and growth", "weight": 0.15, "effective_weight": 0.1579, "score": 64.0, "rating": "moderate", "confidence": "low", "status": "scored", "contribution": 10.1 },
            { "parameter": "competition", "label": "Competition and differentiation", "weight": 0.15, "effective_weight": 0.1579, "score": 48.0, "rating": "weak", "confidence": "medium", "status": "scored", "contribution": 7.6 },
            { "parameter": "demand", "label": "Demand signals", "weight": 0.10, "effective_weight": 0.1053, "score": 58.0, "rating": "moderate", "confidence": "medium", "status": "scored", "contribution": 6.1 },
            { "parameter": "unit_economics", "label": "Unit economics and pricing", "weight": 0.10, "effective_weight": 0.1053, "score": 55.0, "rating": "moderate", "confidence": "low", "status": "scored", "contribution": 5.8 },
            { "parameter": "cost", "label": "Startup cost and runway", "weight": 0.10, "effective_weight": 0.1053, "score": 70.0, "rating": "strong", "confidence": "medium", "status": "scored", "contribution": 7.4 },
            { "parameter": "regulatory", "label": "Feasibility and regulatory risk", "weight": 0.10, "effective_weight": 0.1053, "score": 66.0, "rating": "moderate", "confidence": "low", "status": "scored", "contribution": 6.9 },
            { "parameter": "survival_funding", "label": "Funding climate and survival", "weight": 0.05, "effective_weight": 0.0, "score": null, "rating": null, "confidence": null, "status": "insufficient_data", "contribution": null },
            { "parameter": "macro", "label": "Macro and timing", "weight": 0.05, "effective_weight": 0.0526, "score": 62.0, "rating": "moderate", "confidence": "medium", "status": "scored", "contribution": 3.3 }
        ],
        "strengths": [
            "Recurring, first-hand complaints about late payments across several independent sources",
            "Low estimated launch cost for a digital product",
            "Rising discussion volume around late payments"
        ],
        "risks": [
            "Crowded market with several established invoicing tools",
            "Willingness to pay is only weakly evidenced",
            "CAC and churn are assumptions, not measured data",
            "No funding or survival data available for this sector and country"
        ]
    },
    "parameters": {
        "pain": {
            "score": 69.0,
            "band": "Significant",
            "confidence": "high",
            "effective_sample": 27.8,
            "components": { "volume": 0.78, "intensity": 0.71, "breadth": 0.66, "payment": 0.36, "gap": 0.86 },
            "counts": {
                "collected": 412,
                "after_dedupe": 356,
                "after_filter": 150,
                "relevant": 63,
                "by_source": { "hackernews": 140, "stackexchange": 88, "youtube": 60, "appstore": 112, "grounded_search": 12 }
            },
            "themes": [
                { "label": "Chasing late client payments takes hours each month", "post_count": 22, "avg_intensity": 3.9, "example_urls": ["https://news.ycombinator.com/item?id=EXAMPLE_1"] },
                { "label": "No reliable way to track which invoices are overdue", "post_count": 15, "avg_intensity": 3.4, "example_urls": ["https://news.ycombinator.com/item?id=EXAMPLE_2"] },
                { "label": "Reminding clients feels awkward and risks the relationship", "post_count": 11, "avg_intensity": 3.2, "example_urls": ["https://stackexchange.com/questions/EXAMPLE_3"] },
                { "label": "Existing tools charge too much for basic reminders", "post_count": 8, "avg_intensity": 2.8, "example_urls": ["https://apps.apple.com/app/EXAMPLE_4"] },
                { "label": "GST invoice formats confuse freelancers", "post_count": 7, "avg_intensity": 3.0, "example_urls": ["https://stackexchange.com/questions/EXAMPLE_5"] }
            ],
            "top_evidence": [
                { "source": "hackernews", "url": "https://news.ycombinator.com/item?id=EXAMPLE_1", "excerpt": "Clients pay weeks late and I spend Fridays writing reminder emails.", "intensity": 4, "workaround": "inadequate", "payment_signal": "implied" },
                { "source": "appstore", "url": "https://apps.apple.com/app/EXAMPLE_4", "excerpt": "Reminders are locked behind the expensive plan, not worth it.", "intensity": 3, "workaround": "inadequate", "payment_signal": "explicit" }
            ],
            "caveats": [
                "Online communities over-represent technical and English-speaking users.",
                "Most sources cannot be filtered by country, so evidence may not reflect India."
            ]
        },
        "market": {
            "score": 64.0,
            "confidence": "low",
            "components": { "size_adequacy": 0.70, "growth": 0.62, "data_agreement": 0.55 },
            "tam": {
                "value": 54000000000, "currency": "INR", "label": "estimated", "method": "bottom_up",
                "formula": "addressable_users x annual_price_per_user",
                "inputs": [
                    { "name": "addressable_users", "value": 15000000, "unit": "people", "label": "estimated", "source_ids": ["src_wb_1"], "assumption_id": "as_01" },
                    { "name": "annual_price_per_user", "value": 3600, "unit": "INR/year", "label": "assumed", "assumption_id": "as_04" }
                ],
                "range": { "low": 36000000000, "base": 54000000000, "high": 72000000000 }
            },
            "sam": {
                "value": 16200000000, "currency": "INR", "label": "estimated", "method": "bottom_up",
                "formula": "TAM users x online_invoicing_share x annual_price_per_user",
                "inputs": [
                    { "name": "online_invoicing_share", "value": 0.30, "unit": "ratio", "label": "assumed", "assumption_id": "as_02" }
                ],
                "serviceable_users": 4500000,
                "range": { "low": 10800000000, "base": 16200000000, "high": 21600000000 }
            },
            "som": {
                "value": 162000000, "currency": "INR", "label": "assumed", "method": "share_of_sam", "horizon_years": 3,
                "formula": "SAM x obtainable_share",
                "inputs": [
                    { "name": "obtainable_share", "value": 0.01, "unit": "ratio", "label": "assumed", "assumption_id": "as_03" }
                ],
                "obtainable_users": 45000,
                "range": { "low": 81000000, "base": 162000000, "high": 324000000 }
            },
            "cross_check": { "method": "top_down", "value": 41000000000, "currency": "INR", "label": "estimated", "divergence_pct": -24.1, "note": "Top-down estimate is lower than bottom-up; treat TAM as a range." },
            "growth": { "cagr_pct": 12.0, "horizon": "2026-2031", "label": "estimated", "confidence": "low", "basis": "Trend in self-employment counts and digital payment adoption", "source_ids": ["src_wb_1"] }
        },
        "demand": {
            "score": 58.0,
            "confidence": "medium",
            "search_interest": { "available": false, "reason": "No official free API; unofficial Google Trends access is disabled." },
            "signals": [
                {
                    "name": "Wikipedia pageviews: Invoice (index, 2025-Q4 = 100)", "source_ids": ["src_wiki"], "direction": "rising", "change_pct": 12.0,
                    "series": [{ "period": "2025-Q4", "value": 100 }, { "period": "2026-Q1", "value": 104 }, { "period": "2026-Q2", "value": 109 }, { "period": "2026-Q3", "value": 112 }]
                },
                {
                    "name": "Discussion mentions: late payments and freelancers", "source_ids": ["src_hn", "src_se"], "direction": "rising", "change_pct": 50.0,
                    "series": [{ "period": "2025-Q4", "value": 14 }, { "period": "2026-Q1", "value": 17 }, { "period": "2026-Q2", "value": 16 }, { "period": "2026-Q3", "value": 21 }]
                }
            ]
        },
        "competition": {
            "score": 48.0,
            "confidence": "medium",
            "saturation": "high",
            "incumbent_strength": "moderate",
            "counts": { "direct": 5, "indirect": 4 },
            "direct_competitors": [
                {
                    "name": "Sample Competitor A", "url": "https://example.com/a", "offering": "Invoicing with automated payment reminders", "pricing_model": "subscription",
                    "price_from": { "amount": 299, "currency": "INR", "period": "month" }, "target_segment": "freelancers and small agencies",
                    "strengths": ["Automated reminders"], "weaknesses": ["Reminder wording is not customisable"],
                    "evidence_url": "https://example.com/a/pricing", "retrieved_at": "2026-10-15", "source_ids": ["src_vertex"], "confidence": "medium", "funding": null, "revenue": null
                },
                {
                    "name": "Sample Competitor B", "url": "https://example.com/b", "offering": "Free invoice generator with paid reminders", "pricing_model": "freemium",
                    "price_from": { "amount": 0, "currency": "INR", "period": "month" }, "target_segment": "individual freelancers",
                    "strengths": ["Free tier"], "weaknesses": ["Reminders only on the highest plan"],
                    "evidence_url": "https://example.com/b/pricing", "retrieved_at": "2026-10-15", "source_ids": ["src_vertex"], "confidence": "medium", "funding": null, "revenue": null
                },
                {
                    "name": "Sample Competitor C", "url": "https://example.com/c", "offering": "Pay-per-invoice billing platform", "pricing_model": "per_invoice",
                    "price_from": null, "target_segment": "small businesses",
                    "strengths": ["Payment collection built in"], "weaknesses": ["Fees on every invoice"],
                    "evidence_url": "https://example.com/c/pricing", "retrieved_at": "2026-10-15", "source_ids": ["src_vertex"], "confidence": "low", "funding": null, "revenue": null
                }
            ],
            "indirect_alternatives": ["Spreadsheets and manual email reminders", "Full accounting suites", "Messaging-app templates"],
            "differentiation_gaps": [
                "Relationship-friendly reminder tone and templates",
                "Reminders included in a low-cost plan",
                "Simple GST-ready invoice formats"
            ],
            "physical_density": null,
            "caveats": ["Competitor revenue, traffic and funding are not available from free sources."]
        },
        "unit_economics": {
            "score": 55.0,
            "confidence": "low",
            "pricing_benchmarks": {
                "sample_size": 8,
                "models": { "freemium": 3, "subscription": 4, "per_invoice": 1 },
                "monthly_price": { "min": 0, "median": 299, "max": 999, "currency": "INR" },
                "label": "sourced", "source_ids": ["src_vertex"]
            },
            "model": {
                "arpu_monthly": 300, "gross_margin_pct": 80, "monthly_churn_pct": 4, "cac": 1200, "currency": "INR",
                "label": "assumed", "assumption_ids": ["as_04", "as_05", "as_06", "as_07"]
            },
            "derived": { "ltv": 6000, "ltv_cac_ratio": 5.0, "cac_payback_months": 5.0, "break_even_paying_users": 625, "currency": "INR" },
            "caveats": ["No reliable free CAC or churn data exists; these values are editable assumptions."]
        },
        "cost": {
            "score": 70.0,
            "confidence": "medium",
            "currency": "INR",
            "one_time": [
                { "item": "Company registration", "low": 8000, "base": 15000, "high": 25000, "label": "estimated", "source_ids": ["src_gov_1"] },
                { "item": "Legal and compliance setup", "low": 10000, "base": 20000, "high": 40000, "label": "estimated", "source_ids": ["src_gov_1"] },
                { "item": "Brand and web presence", "low": 5000, "base": 15000, "high": 40000, "label": "assumed", "source_ids": [] },
                { "item": "MVP build (2 developers, 3 months)", "low": 360000, "base": 540000, "high": 780000, "label": "estimated", "source_ids": ["src_ilo"], "assumption_id": "as_08" }
            ],
            "monthly": [
                { "item": "Team salaries (2 developers)", "low": 90000, "base": 110000, "high": 160000, "label": "estimated", "source_ids": ["src_ilo"] },
                { "item": "Cloud hosting and LLM/API usage", "low": 8000, "base": 15000, "high": 35000, "label": "estimated", "source_ids": ["src_vertex"] },
                { "item": "Marketing (content and community)", "low": 10000, "base": 20000, "high": 50000, "label": "assumed", "source_ids": [] },
                { "item": "Tools, payment-gateway fees, accounting", "low": 3000, "base": 5000, "high": 10000, "label": "assumed", "source_ids": [] }
            ],
            "totals": {
                "one_time": { "low": 383000, "base": 590000, "high": 885000 },
                "monthly_burn": { "low": 111000, "base": 150000, "high": 255000 },
                "first_12_months": { "low": 1715000, "base": 2390000, "high": 3945000 }
            },
            "runway_months": null,
            "runway_note": "Not calculated because no starting budget was provided."
        },
        "regulatory": {
            "score": 66.0,
            "confidence": "low",
            "complexity": "low_to_medium",
            "requirements": [
                { "item": "Business registration", "applies": true, "note": "See cost.one_time for the estimate." },
                { "item": "GST registration", "applies": "conditional", "note": "Depends on turnover thresholds and service type." },
                { "item": "Personal data protection obligations for client contact details", "applies": true, "note": "Review the applicable data-protection law." },
                { "item": "Payment licences", "applies": false, "note": "Not needed while reminders only link to third-party gateways." }
            ],
            "legal_review_recommended": true,
            "source_ids": ["src_gov_1"]
        },
        "survival_funding": {
            "status": "insufficient_data",
            "score": null,
            "reason": "No free source provides sector-level survival or seed-funding data for this country.",
            "reference_benchmarks": [
                { "region": "US", "metric": "5-year establishment survival", "value_pct": 50, "label": "sourced", "reference_only": true, "source_ids": ["src_bls"] }
            ],
            "funding_activity": null
        },
        "macro": {
            "score": 62.0,
            "confidence": "medium",
            "outlook": "neutral_to_positive",
            "indicators": [
                { "name": "GDP growth (annual %)", "indicator_code": "NY.GDP.MKTP.KD.ZG", "value": 6.5, "year": 2024, "label": "sourced", "source_ids": ["src_wb_2"] },
                { "name": "Inflation, consumer prices (annual %)", "indicator_code": "FP.CPI.TOTL.ZG", "value": 4.8, "year": 2024, "label": "sourced", "source_ids": ["src_wb_3"] },
                { "name": "Self-employed (% of total employment)", "indicator_code": "SL.EMP.SELF.ZS", "value": 52.0, "year": 2024, "label": "sourced", "source_ids": ["src_wb_1"] }
            ],
            "timing_notes": ["Growth in self-employment supports the target segment.", "Inflation raises cost pressure on freelancers' tool budgets."]
        }
    },
    "assumptions": [
        { "id": "as_01", "name": "Addressable freelancers who invoice clients", "value": 15000000, "unit": "people", "label": "estimated", "affects": ["market"], "editable": true },
        { "id": "as_02", "name": "Share who invoice online", "value": 0.30, "unit": "ratio", "label": "assumed", "affects": ["market"], "editable": true },
        { "id": "as_03", "name": "Obtainable share of SAM by year 3", "value": 0.01, "unit": "ratio", "label": "assumed", "affects": ["market"], "editable": true },
        { "id": "as_04", "name": "Average revenue per user per month", "value": 300, "unit": "INR", "label": "assumed", "affects": ["market", "unit_economics"], "editable": true },
        { "id": "as_05", "name": "Gross margin", "value": 80, "unit": "percent", "label": "assumed", "affects": ["unit_economics"], "editable": true },
        { "id": "as_06", "name": "Monthly churn", "value": 4, "unit": "percent", "label": "assumed", "affects": ["unit_economics"], "editable": true },
        { "id": "as_07", "name": "Customer acquisition cost", "value": 1200, "unit": "INR", "label": "assumed", "affects": ["unit_economics"], "editable": true },
        { "id": "as_08", "name": "MVP team and duration", "value": "2 developers x 3 months", "unit": null, "label": "assumed", "affects": ["cost"], "editable": true }
    ],
    "narrative": {
        "executive_summary": "Freelancers repeatedly report time lost chasing late payments, and the cost to build a first version is modest. The invoicing space is crowded, however, and willingness to pay is only weakly evidenced, so the idea is promising rather than proven. Market size, churn and acquisition cost rest on editable assumptions.",
        "citations": ["src_hn", "src_se", "src_as", "src_vertex", "src_wb_1"],
        "sections": {
            "pain": { "summary": "Late-payment chasing is a recurring, moderately intense problem; five themes cover all relevant posts.", "source_ids": ["src_hn", "src_se", "src_yt", "src_as"] },
            "market": { "summary": "The estimated TAM is about INR 54 billion with a SOM of about INR 162 million by year 3, shown as ranges because the inputs are low-confidence.", "source_ids": ["src_wb_1"] },
            "competition": { "summary": "Five direct competitors were found. Gaps exist in reminder tone and affordable reminder plans.", "source_ids": ["src_vertex"] },
            "cost": { "summary": "First-year cost is estimated at INR 2.4 million (range 1.7 to 3.9 million).", "source_ids": ["src_ilo", "src_gov_1"] }
        },
        "next_steps": [
            "Interview 10 to 15 freelancers to confirm willingness to pay.",
            "Replace the assumed CAC and churn with figures from a small pilot.",
            "Review GST and data-protection obligations with a professional."
        ]
    },
    "sources": [
        { "id": "src_wb_1", "name": "World Bank Indicators API: SL.EMP.SELF.ZS", "type": "structured_api", "url": "https://api.worldbank.org/v2/country/IN/indicator/SL.EMP.SELF.ZS?format=json", "license": "CC BY 4.0", "retrieved_at": "2026-10-15", "used_for": ["market", "macro"] },
        { "id": "src_wb_2", "name": "World Bank Indicators API: NY.GDP.MKTP.KD.ZG", "type": "structured_api", "url": "https://api.worldbank.org/v2/country/IN/indicator/NY.GDP.MKTP.KD.ZG?format=json", "license": "CC BY 4.0", "retrieved_at": "2026-10-15", "used_for": ["macro"] },
        { "id": "src_wb_3", "name": "World Bank Indicators API: FP.CPI.TOTL.ZG", "type": "structured_api", "url": "https://api.worldbank.org/v2/country/IN/indicator/FP.CPI.TOTL.ZG?format=json", "license": "CC BY 4.0", "retrieved_at": "2026-10-15", "used_for": ["macro"] },
        { "id": "src_ilo", "name": "ILOSTAT wage data", "type": "structured_api", "url": "https://ilostat.ilo.org/data/", "license": "See provider terms", "retrieved_at": "2026-10-15", "used_for": ["cost"] },
        { "id": "src_bls", "name": "US BLS Business Employment Dynamics", "type": "structured_api", "url": "https://www.bls.gov/bdm/", "license": "US public domain", "retrieved_at": "2026-10-15", "used_for": ["survival_funding"] },
        { "id": "src_hn", "name": "Hacker News (Algolia Search API)", "type": "community", "url": "https://hn.algolia.com/api/v1/search", "license": "See provider terms", "retrieved_at": "2026-10-15", "used_for": ["pain", "demand"] },
        { "id": "src_se", "name": "Stack Exchange API", "type": "community", "url": "https://api.stackexchange.com/2.3/search/advanced", "license": "Attribution required", "retrieved_at": "2026-10-15", "used_for": ["pain", "demand"] },
        { "id": "src_yt", "name": "YouTube Data API v3 (comments)", "type": "community", "url": "https://www.googleapis.com/youtube/v3/commentThreads", "license": "See provider terms", "retrieved_at": "2026-10-15", "used_for": ["pain"] },
        { "id": "src_as", "name": "Apple iTunes Search API and public review feed", "type": "reviews", "url": "https://itunes.apple.com/search", "license": "See provider terms", "retrieved_at": "2026-10-15", "used_for": ["pain"] },
        { "id": "src_wiki", "name": "Wikimedia Pageviews API", "type": "structured_api", "url": "https://wikimedia.org/api/rest_v1/", "license": "CC0 data", "retrieved_at": "2026-10-15", "used_for": ["demand"] },
        { "id": "src_vertex", "name": "Vertex AI Search over public competitor and pricing pages", "type": "web_pages", "url": "https://example.com/a/pricing", "license": "Page-level; cited, not reproduced", "retrieved_at": "2026-10-15", "used_for": ["competition", "unit_economics", "cost"] },
        { "id": "src_gov_1", "name": "Official registration and regulatory portals (via Vertex)", "type": "web_pages", "url": "https://example.gov/registration-fees", "license": "Government publication", "retrieved_at": "2026-10-15", "used_for": ["cost", "regulatory"] }
    ],
    "data_quality": {
        "value_labels": { "sourced": 14, "estimated": 19, "assumed": 9 },
        "parameters_scored": 8,
        "parameters_insufficient": ["survival_funding"],
        "evidence_items_total": 412,
        "evidence_items_used": 63,
        "oldest_data_year": 2024,
        "limitations": [
            "Free sources lack competitor revenue, traffic, funding, CAC and churn.",
            "Community sources skew technical and English-speaking.",
            "Rent and equipment prices are low-confidence regional estimates."
        ]
    },
    "generation": {
        "pipeline_version": "1.0",
        "llm_provider": "sarvam",
        "llm_model": "sarvam-105b-conversations",
        "llm_calls": { "plan": 1, "classification_batches": 15, "summary": 1 },
        "duration_seconds": 212
    },
    "disclaimer": "This report supports, but does not replace, primary customer research. Scores are directional estimates, not probabilities of success."
};

export const mainItems = [
    { name: "Overview", icon: LayoutDashboard, href: "/dashboard" },
];

export const engineItems = [
    { name: 'Reddit Analysis', icon: FaReddit, href: '/dashboard/reddit', color: "#FF4500" },
    { name: 'Playstore Analysis', icon: FaGooglePlay, href: '/dashboard/playstore', color: "#4285F4" },
    { name: 'Validate Idea', icon: FaCheckCircle, href: '/dashboard/validate-idea', color: "#10b981" },
    { name: 'AI Workspace', icon: BsRobot, href: '/dashboard/ai-workspace', color: "#FF4500" },
];

export const leadGenerationItems = [
    { name: 'AI Lead Engine', icon: Target, href: '/dashboard/ai-lead-engine/campaigns', color: "#10b981" },
];

export const questions = [
    {
        id: 'discovery',
        step: '01',
        question: 'How did you discover us?',
        hint: 'Select all that apply',
        multi: true,
        options: [
            'Twitter / X', 'LinkedIn', 'Instagram', 'YouTube',
            'Google Search', 'DuckDuckGo', 'Bing',
            'Friend or Colleague', 'Word of Mouth',
            'Newsletter', 'Email Campaign',
            'Reddit', 'Hacker News', 'Product Hunt',
            'Blog or Article', 'Podcast', 'Webinar',
            'App Store', 'Other',
        ],
    },
    {
        id: 'usage',
        step: '02',
        question: 'How will you use Demo?',
        hint: 'Pick everything that fits',
        multi: true,
        options: [
            'Market Research', 'Competitor Analysis', 'Trend Tracking',
            'Product Ideation', 'Feature Validation', 'User Feedback Analysis',
            'Building a Product', 'Launching a Startup',
            'Marketing Insights', 'Content Strategy', 'Ad Research',
            'E-commerce Strategy', 'Pricing Research',
            'Client Consulting', 'Agency Work',
            'Academic Research', 'Personal Learning', 'Other',
        ],
    },
    {
        id: 'occupation',
        step: '03',
        question: 'What best describes you?',
        hint: 'Choose one',
        multi: false,
        options: [
            'Founder / Co-founder', 'Solo Entrepreneur', 'Early-stage Startup',
            'Product Manager', 'Product Designer', 'UX Researcher',
            'Software Engineer', 'Full-stack Developer', 'Data Scientist',
            'Growth Marketer', 'Content Creator', 'Brand Strategist',
            'VC / Investor', 'Business Analyst', 'Consultant',
            'Student', 'Academic / Researcher',
            'Enterprise Professional', 'Freelancer', 'Other',
        ],
    },
];

// new architecture - validate idea menu items
export const validateMenuItems = [
    {
        title: "Dashboard",
        href: "/validate-idea/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Analysis",
        href: "/validate-idea/analysis",
        icon: ChartNoAxesCombined,
    },
];

export const accountSections = [
    {
        icon: UserRound,
        title: "Personal Information",
        description: "Manage your name, email address, and profile photo.",
        href: "/my-account/personal-information",
        accent: "bg-violet-50 text-violet-700 ring-violet-100",
        hoverGlow: "group-hover:shadow-violet-500/10 group-hover:border-violet-200",
        badge: "Verified",
        badgeStyle: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
    },
    {
        icon: ShieldCheck,
        title: "Login & Security",
        description: "Manage your password, OAuth connections, and 2FA.",
        // href: "/profile/security",
        href: "#",
        accent: "bg-indigo-50 text-indigo-700 ring-indigo-100",
        hoverGlow: "group-hover:shadow-indigo-500/10 group-hover:border-indigo-200",
        badge: "Protected",
        badgeStyle: "bg-indigo-50 text-indigo-700 border-indigo-200/60",
    },
    {
        icon: Wallet,
        title: "Credits & Billing",
        description: "View your credit balance, top-ups, and invoices.",
        // href: "/profile/billing",
        href: "#",
        accent: "bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-100",
        hoverGlow: "group-hover:shadow-fuchsia-500/10 group-hover:border-fuchsia-200",
        badge: "240 Credits",
        badgeStyle: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200/60",
    },
    {
        icon: Activity,
        title: "Account Activity",
        description: "Track your recent research runs, exports, and usage.",
        // href: "/profile/activity",
        href: "#",
        accent: "bg-sky-50 text-sky-700 ring-sky-100",
        hoverGlow: "group-hover:shadow-sky-500/10 group-hover:border-sky-200",
        badge: "Active today",
        badgeStyle: "bg-slate-100 text-slate-600 border-slate-200/60",
    },
    {
        icon: Bell,
        title: "Notifications",
        description: "Configure trend alerts, digest emails, and updates.",
        // href: "/profile/notifications",
        href: "#",
        accent: "bg-amber-50 text-amber-700 ring-amber-100",
        hoverGlow: "group-hover:shadow-amber-500/10 group-hover:border-amber-200",
        badge: "Digest On",
        badgeStyle: "bg-amber-50 text-amber-700 border-amber-200/60",
    },
    {
        icon: Database,
        title: "Privacy & Data",
        description: "Export your saved insights or manage data preferences.",
        // href: "/profile/privacy",
        href: "#",
        accent: "bg-emerald-50 text-emerald-700 ring-emerald-100",
        hoverGlow: "group-hover:shadow-emerald-500/10 group-hover:border-emerald-200",
        badge: null,
        badgeStyle: "",
    },
];

export const featureShortcuts = [
    {
        name: "Reddit Analyzer",
        desc: "Subreddit & keyword defaults",
        href: "/settings/reddit",
    },
    {
        name: "Play Store Insights",
        desc: "Review scraping & region filters",
        href: "/settings/play-store",
    },
    {
        name: "Validate Idea",
        desc: "Scoring weights & report format",
        href: "/settings/validate",
    },
];