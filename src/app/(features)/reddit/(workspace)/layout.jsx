"use client";

import { useState } from "react";
import WorkspaceSidebar from "@/features/reddit/components/workspace/WorkspaceSidebar";
import WorkspaceGuard from "@/features/reddit/components/workspace/WorkspaceGuard";
import WorkspaceTopbar from "@/features/reddit/components/workspace/WorkspaceTopbar";
import { motion } from "framer-motion";

export default function WorkspaceLayout({ children }) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    return (
        <WorkspaceGuard>
            <div className="min-h-screen bg-background">
                <WorkspaceSidebar
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
                    className="min-h-screen min-w-0 max-lg:!ml-0"
                >
                    <WorkspaceTopbar />

                    <div>
                        {children}
                    </div>
                </motion.main>
            </div>
        </WorkspaceGuard>
    );
}
