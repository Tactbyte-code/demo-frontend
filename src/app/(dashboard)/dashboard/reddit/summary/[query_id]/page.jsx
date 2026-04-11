"use client"

import React, { useState } from 'react'
import { useGetSummary } from '@/features/reddit/hooks/useGetSummary';
import { useParams, useRouter } from 'next/navigation';
import { SummaryResult } from '../../query/[query_id]/_components/SummaryResult';
import { useGetPosts } from '@/features/reddit/hooks/useGetPosts';
import { LoadingSkeleton, PageShell } from '../../query/[query_id]/_components/Layout';
import { QueryCard } from '../../query/[query_id]/_components/QueryCard';
import { useGetQuery } from '@/features/reddit/hooks/useGetQuery';

const page = () => {

    const { query_id } = useParams();

    const [isRequerying, setIsRequerying] = useState(false);

    const { data, isLoading: isSummaryLoading } = useGetSummary(query_id);
    const { data: sources, isLoading: isPostsLoading } = useGetPosts(query_id);
    const { data: queryData, isLoading: isQueryLoading } = useGetQuery(query_id);

    const query = queryData?.query;
    const status = queryData?.status;

    // loading for all states
    if (isSummaryLoading || isPostsLoading || isQueryLoading) {
        return (
            <PageShell>
                <LoadingSkeleton />
            </PageShell>
        );
    };

    const isCompleted = status === "COMPLETED";

    return (
        <PageShell>

            {/* Query Card */}
            <QueryCard
                query={query}
                isCompleted={isCompleted}
                onRequeryStart={() => setIsRequerying(true)}
            />

            {!isRequerying && <SummaryResult data={data} sources={sources} approvedCount={10} />}

        </PageShell>
    )
}

export default page;
