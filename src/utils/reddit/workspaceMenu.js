import {
    LayoutDashboard,
    ChartNoAxesCombined,
} from "lucide-react";

export const workspaceMenu = {
    guest: [
        {
            title: "Analysis",
            href: "/reddit/analysis",
            icon: ChartNoAxesCombined,
        },
    ],

    authenticated: [
        // {
        //     title: "Dashboard",
        //     href: "/reddit/dashboard",
        //     icon: LayoutDashboard,
        // },
        {
            title: "Analysis",
            href: "/reddit/analysis",
            icon: ChartNoAxesCombined,
        },
    ],
};