"use client"

import React, { useEffect, useState } from 'react';
import { createQuery } from '@/lib/api/reddit';
import { useSearchParams } from 'next/navigation';
import ClarificationComponent from '../_components/ClarificationComponent';
import QueryProcessingLoader from '../_components/QueryProcessingLoader';
import { useSidebarStore } from '@/context/useSidebarStore';

const page = () => {

    const searchParams = useSearchParams();
    const [query, setQuery] = useState(searchParams.get('query') || '');
    const [queryId, setQueryId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(null);

    const { setSidebarOpen } = useSidebarStore();

    // Auto-collapse sidebar on mount, restore on leave
    useEffect(() => {
        setSidebarOpen(false);
        return () => setSidebarOpen(true);
    }, []);

    const submitQuery = async (e) => {
        e?.preventDefault();
        setLoading(true);
        setError(null);
        setStatus(null);

        try {
            const response = await createQuery(query);
            if (response) setQueryId(response.id);

            console.log('status: ', response?.status);

            if (response?.status === "CLARIFYING") setStatus("CLARIFYING");
            if (response?.status === "FAILED") {
                setStatus("FAILED");
                setError(response?.failure_reason || "Something went wrong");
            }
        } catch (err) {
            console.log('submit query error: ', err);
            setError(err?.response?.data?.detail || "Something went wrong");
            setStatus("FAILED");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (query) submitQuery();
    }, []);

    if (loading) return <QueryProcessingLoader />;
    if (status === "CLARIFYING") return <ClarificationComponent query_id={queryId} />;
    if (status === "FAILED") return (
        <div>
            <p style={{ color: 'red' }}>Failed: {error}</p>
        </div>
    );

    return (
        <div>
            <p className='text-base text-muted'>Page is loading...</p>
        </div>
    );
};

export default page;











// import React, { useEffect, useState } from 'react';
// import { createQuery } from '@/lib/api/reddit';
// import { useSearchParams } from 'next/navigation';

// const page = () => {

//     const searchParams = useSearchParams();
//     // const query = searchParams.get("query");

//     const [query, setQuery] = useState(searchParams.get('query') || '');
//     // console.log('query: ', query);

//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(false);

//     const submitQuery = async (e) => {
//         e?.preventDefault();
//         setLoading(true);
//         setError(null);

//         try {
//             const response = await createQuery(query);

//             if (response?.status === "CLARIFYING") {
//                 router.push(`/dashboard/reddit/query/${response.id}/clarify`);
//             };

//             if (response?.status === "CLARIFIED") {
//                 router.push(`/dashboard/reddit/query/${response.id}`);
//             };

//             if (response?.status === "FAILED") {
//                 setError(response?.failure_reason || "Something went wrong");
//             };
//         } catch (err) {
//             console.log('submit query error: ', err);
//             setError(err?.response?.data?.detail || "Something went wrong");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         submitQuery();
//     }, [submitQuery]);


//     return (
//         <div>

//         </div>
//     )
// }

// export default page;




