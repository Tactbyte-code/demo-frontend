import React from 'react'
import { FaTools, FaRocket } from "react-icons/fa"

const ValidateIdeaPage = () => {
    return (
        <div className="h-[91vh] flex flex-col items-center justify-center px-6 bg-background text-foreground">

            {/* Animated Icon */}
            <div className="relative mb-8">
                <div className="absolute inset-0 blur-2xl opacity-40 bg-primary rounded-full animate-pulse"></div>
                <FaTools className="relative text-6xl text-primary animate-bounce" />
            </div>

            {/* Heading */}
            <h1 className="text-3xl md:text-4xl font-semibold text-header mb-4 text-center">
                Validate Idea is Coming Soon 🚀
            </h1>

            {/* Description */}
            <p className="text-muted text-center max-w-xl mb-8">
                We're actively building this feature to help you validate your ideas with powerful insights and data-driven tools.
                Stay tuned — it’ll be available very soon!
            </p>

            {/* Animated Loader */}
            <div className="flex space-x-2 mb-10">
                <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>

            {/* Secondary Icon + Message */}
            <div className="flex items-center gap-3 text-subtle">
                <FaRocket className="text-accent animate-pulse" />
                <span>We’re launching this feature shortly</span>
            </div>

        </div>
    )
}

export default ValidateIdeaPage;