import { Lightbulb, MessageSquare, Smartphone, Briefcase, AlertTriangle, Users } from "lucide-react";

export const features = [
  {
    number: "01",
    title: "Validate Idea",
    description: "Evaluate your startup idea through market demand, customer pain points, competition, and economics.",
    href: "/validate-idea",
    icon: Lightbulb,
    iconColor: "text-[#FA418B]",
    iconBg: "bg-[#FA418B]/10",
    hoverBorder: "hover:border-[#FA418B]/50",
    hoverIcon: "group-hover:bg-[#FA418B] group-hover:text-white",
    tag: "Validate your thinking",
  },
  {
    number: "02",
    title: "Reddit Analysis",
    description: "Discover real user frustrations, recurring problems, and unmet needs through conversations across Reddit.",
    href: "/reddit",
    icon: MessageSquare,
    iconColor: "text-[#7138D5]",
    iconBg: "bg-[#7138D5]/10",
    hoverBorder: "hover:border-[#9326D5]/50",
    hoverIcon: "group-hover:bg-[#7138D5] group-hover:text-white",
    tag: "Explore communities",
  },
  {
    number: "03",
    title: "Play Store Analysis",
    description: "Understand what users love, dislike, and wish existed by analyzing app reviews and feedback.",
    href: "/playstore",
    icon: Smartphone,
    iconColor: "text-[#C12AAE]",
    iconBg: "bg-[#C12AAE]/10",
    hoverBorder: "hover:border-[#D82C9E]/50",
    hoverIcon: "group-hover:bg-[#C12AAE] group-hover:text-white",
    tag: "Analyze app reviews",
  },
];

export const navItems = [
  { id: "how-it-works", name: "How It Works", icon: Briefcase },
  { id: "market-friction", name: "Market Friction", icon: AlertTriangle },
  { id: "who-for", name: "Who Is It For", icon: Users },
];

export const navButtonClass = "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-[#756B80] transition hover:bg-[#F4EFFA] hover:text-[#5F19C5]";

// Maps shared components (sections, pricing page) onto the site's purple palette without touching their files.
export const purpleTheme = {
  "--primary": "#7138D5",
  "--primary-hover": "#5F19C5",
  "--secondary": "#9326D5",
  "--accent": "#D82C9E",
  "--background": "#FDFBFF",
  "--surface": "#F4EFFA",
  "--surface-card": "#F8F4FC",
  "--surface-raised": "#F4EFFA",
  "--text-main": "#292333",
  "--text-muted": "#756B80",
  "--text-subtle": "#968AA3",
  "--text-light": "#FFFFFF",
  "--border": "#EAE2F1",
  "--border-solid": "#D9CCE8",
  "--glass-border": "#E2D6F0",
};