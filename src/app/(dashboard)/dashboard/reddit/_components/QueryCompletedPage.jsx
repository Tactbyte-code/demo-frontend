"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Loader2 } from "lucide-react";

const stages = [
    "Submitting query",
    "Query submitted",
    "Refining your query",
    "Getting a bit more context",
];

export default function QueryCompletedPage() {
    const [progress, setProgress] = useState(0);
    const [stageIndex, setStageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                const next = prev + Math.random() * 10;
                if (next >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return next;
            });
        }, 400);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const idx = Math.min(
            stages.length - 1,
            Math.floor((progress / 100) * stages.length)
        );
        setStageIndex(idx);
    }, [progress]);

    const isDone = progress === 100;

    return (
        <div className="flex items-center justify-center h-[80vh] px-4">
            <Card className="w-full max-w-md shadow-lg rounded-none">
                <CardHeader className="text-center space-y-2">
                    <CardTitle className="text-base font-semibold flex items-center justify-center gap-2">
                        Completed
                    </CardTitle>

                    <Badge variant="default" className={'rounded-none'}>
                        Done
                    </Badge>
                </CardHeader>

                <CardContent className="space-y-5">
                    <div className="space-y-2">
                        <Progress value={100} />
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>100%</span>
                            <span>Ready</span>
                        </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                        {stages.map((stage, i) => {
                            const isCompleted = true;
                            const isActive = i === stageIndex && !isDone;

                            return (
                                <div
                                    key={i}
                                    className="flex items-center justify-between p-3 border"
                                >
                                    <div className="flex items-center gap-3">
                                        {isCompleted && (
                                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                                        )}
                                        <span
                                            className={`text-sm ${isCompleted
                                                ? "text-green-600"
                                                : isActive
                                                    ? "text-foreground"
                                                    : "text-muted-foreground"
                                                }`}
                                        >
                                            {stage}
                                        </span>
                                    </div>

                                    {isCompleted && (
                                        <Badge variant="outline" className="text-xs rounded-none">
                                            Done
                                        </Badge>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
