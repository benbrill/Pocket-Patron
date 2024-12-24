'use client';
import React, { useEffect, useState } from 'react';
import ShowCard from './showCard';
import { useRouter } from 'next/navigation';

const DisplayShows = () => {
    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [addShows, setAddShows] = useState([]);
    const router = useRouter();

    // Fetch shows from the API endpoint
    const fetchShows = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/shows');
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            setShows(data);
        } catch (err) {
            console.error('Failed to fetch shows:', err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchShows();
    }, []);


    if (loading) {
        return <div>Loading shows...</div>;
    }

    if (error) {
        return <div>Error loading shows: {error}</div>;
    }


    const handleSelectItem = (itemId) => {
        const updatedSelection = addShows.includes(itemId)
            ? addShows.filter(id => id !== itemId)
            : [...addShows, itemId];
        console.log("click")
        setAddShows(updatedSelection);
    };

    const openModal = (id) => {
        router.push(`/shows/${id}`, { shallow: true });
    };

    const handleSubmit = async (winnerId) => {
        console.log('Winner:', winnerId);
        const loserId = currentPair.find((s) => s.id !== winnerId).id;

        const response = await fetch('/api/userRankings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                winnerId,
                loserId,
                currentEloScores: eloScores,
            }),
        });

        const result = await response.json();
        setEloScores(result.updatedScores);
        selectRandomPair(shows);
    };


    return (
        <div className='grid grid-cols-3 lg:grid-cols-6 gap-2'>
            {shows.map((show) => (
                <ShowCard data={show} key={show.id} handleClick={() => openModal(show.id)} isSelected={addShows ? addShows.includes(show.id) : null} />
            ))}
        </div>
    );
};

export default DisplayShows;
