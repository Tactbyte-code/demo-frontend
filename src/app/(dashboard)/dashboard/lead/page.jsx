"use client";

import React from "react";
import { Clock, Sparkles } from "lucide-react";

const Page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-6">
      <div className="max-w-xl w-full text-center">
        
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-blue-100 text-blue-600">
            <Clock size={32} />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-3">
          Coming Soon
        </h1>

        {/* Subtext */}
        <p className="text-gray-600 text-sm md:text-base mb-6">
          We're working on something awesome for{" "}
          <span className="font-medium text-blue-600">
            Lead Generation
          </span>. Stay tuned — it’ll be worth the wait.
        </p>

        {/* Divider */}
        <div className="flex items-center justify-center gap-2 text-gray-400 mb-6">
          <span className="h-px w-12 bg-gray-300" />
          <Sparkles size={16} />
          <span className="h-px w-12 bg-gray-300" />
        </div>

        {/* Status Badge */}
        <div className="inline-block px-4 py-2 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
          In Development
        </div>

      </div>
    </div>
  );
};

export default Page;