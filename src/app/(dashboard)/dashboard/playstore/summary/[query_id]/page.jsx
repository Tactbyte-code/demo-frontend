"use client"

import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation';
import { SummaryResult } from '../../query/[query_id]/_components/SummaryResult';
import { LoadingSkeleton, PageShell } from '../../query/[query_id]/_components/Layout';
import { QueryCard } from '../../query/[query_id]/_components/QueryCard';
import { useGetPlaystoreSummary } from '@/features/playstore/hooks/useGetPlaystoreSummary';
import { useGetPlaystoreQuery } from '@/features/playstore/hooks/useGetPlaystoreQuery';
import { useGetReviews } from '@/features/playstore/hooks/useGetReviews';

const page = () => {

    const { query_id } = useParams();

    // const [isRequerying, setIsRequerying] = useState(false);

    const { data: summary, isLoading: isSummaryLoading } = useGetPlaystoreSummary(query_id);
    const { data: reviews, isLoading: isReviewsLoading } = useGetReviews(query_id);
    const { data: queryData, isLoading: isQueryLoading } = useGetPlaystoreQuery(query_id);

    const query = queryData?.query;
    const status = queryData?.status;

    // loading for all states
    if (isSummaryLoading || isQueryLoading) {
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
                // isCompleted={isCompleted}
                // onRequeryStart={() => setIsRequerying(true)}
            />

            {!isSummaryLoading && <SummaryResult data={summary} reviews={reviews} />}

        </PageShell>
    )
}

export default page;
