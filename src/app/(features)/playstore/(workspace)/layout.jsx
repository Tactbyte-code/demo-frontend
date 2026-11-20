"use client";

import { useState } from "react";
import PlaystoreWorkspaceSidebar from "@/features/playstore/components/workspace/PlaystoreWorkspaceSidebar";
import PlaystoreWorkspaceGuard from "@/features/playstore/components/workspace/PlaystoreWorkspaceGuard";
import PlaystoreWorkspaceTopbar from "@/features/playstore/components/workspace/PlaystoreWorkspaceTopbar";
import { motion } from "framer-motion";

export default function PlaystoreWorkspaceLayout({ children }) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    return (
        <PlaystoreWorkspaceGuard>
            <div className="min-h-screen bg-[#F8FCF9] text-[#142B1B]">
                <PlaystoreWorkspaceSidebar
                    collapsed={sidebarCollapsed}
                    onToggle={() => setSidebarCollapsed((prev) => !prev)}
                    onTopUp={() => setSidebarCollapsed(true)}
                />

                <motion.main
                    initial={false}
                    animate={{
                        marginLeft: sidebarCollapsed ? 72 : 280,
                    }}
                    transition={{
                        duration: 0.3,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="min-h-screen min-w-0 bg-[#F8FCF9] max-lg:!ml-0"
                >
                    <PlaystoreWorkspaceTopbar />

                    <div className="min-h-[calc(100vh-64px)]">
                        {children}
                    </div>
                </motion.main>
            </div>
        </PlaystoreWorkspaceGuard>
    );
}