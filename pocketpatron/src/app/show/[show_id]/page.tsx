'use client';
import React, { useEffect, useState, use } from 'react';

interface Show {
    id: string;
    title: string;
    description?: string;
}

interface Props {
    params: Promise<{ show_id: string }>;
}

export default function ShowPage(props: Props) {
    const params = use(props.params);
    const { show_id } = params;
    const [show, setShow] = useState<Show | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchShow = async () => {
            try {
                const response = await fetch(`/api/show/${show_id}`);
                if (!response.ok) throw new Error('Failed to fetch show');

                const data: Show = await response.json();
                setShow(data);
            } catch (err) {
                if (err instanceof Error) setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchShow();
    }, [show_id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>{show?.title}</h1>
            <p>{show?.description}</p>
        </div>
    );
}
