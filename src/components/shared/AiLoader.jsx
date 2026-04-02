"use client";

import Lottie from "lottie-react";
import animationData from "../../../public/animations/ai-loader.json";

export default function AILoader() {
    return (
        <div className="flex items-center justify-center">
            <Lottie
                animationData={animationData}
                loop={true}
                className="w-40 h-40"
            />
        </div>
    );
}