import {
    LayoutDashboard,
    ChartNoAxesCombined,
} from "lucide-react";

export const workspaceMenu = {
    guest: [
        {
            title: "Analysis",
            href: "/validate-idea/analysis",
            icon: ChartNoAxesCombined,
        },
    ],

    authenticated: [
        // {
        //     title: "Dashboard",
        //     href: "/validate-idea/dashboard",
        //     icon: LayoutDashboard,
        // },
        {
            title: "Analysis",
            href: "/validate-idea/analysis",
            icon: ChartNoAxesCombined,
        },
    ],
};