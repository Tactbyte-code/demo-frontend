"use client"

import React, { useEffect, useRef, useState } from 'react'
import { useGetSummary } from '@/features/reddit/hooks/useGetSummary';
import { useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { SummaryResult } from '../../query/[query_id]/_components/SummaryResult';
import { useGetPosts } from '@/features/reddit/hooks/useGetPosts';
import { LoadingSkeleton, PageShell } from '../../query/[query_id]/_components/Layout';
import { getQuery } from '@/lib/api/playstore';
import { QueryCard } from '../../query/[query_id]/_components/QueryCard';

const page = () => {

    const { query_id } = useParams();

    const { data, isLoading: isSummaryLoading } = useGetSummary(query_id);
    const { data: sources, isLoading: isPostsLoading } = useGetPosts(query_id);

    // const [query, setQuery] = useState(null);
    // const [status, setStatus] = useState(null);
    // const [editing, setEditing] = useState(false);
    // const [value, setValue] = useState(query || null);
    // const textareaRef = useRef(null);
    // const router = useRouter();

    // const fetchQuery = async () => {
    //     const data = await getQuery(query_id);

    //     setQuery(data?.query);
    //     setStatus(data?.status);
    // }

    // useEffect(() => {
    //     fetchQuery();
    // }, [query_id])

    // loading
    if (isSummaryLoading || isPostsLoading) {
        return (
            <PageShell>
                <LoadingSkeleton />
            </PageShell>
        );
    };

    // const isCompleted = status === "COMPLETED";

    return (
        <PageShell>

            {/* <QueryCard
                query={query}
                isCompleted={isCompleted}
            /> */}

            <SummaryResult data={data} sources={sources} approvedCount={10} />
        </PageShell>
    )
}

export default page;
