'use client';
import React, { useEffect, useState } from 'react';
import ShowComparison from './ShowComparison';

const DisplayShows = () => {
    const [shows, setShows] = useState([]);
    const [eloScores, setEloScores] = useState({});
    const [currentPair, setCurrentPair] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUserShows = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/userShows');
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            
            setShows(data);

            const scores = {};
            data.forEach((show) => {
                scores[show.id] = show.elo_score || 1000;
            });
            setEloScores(scores);

            selectRandomPair(data);
            setLoading(false);
        } catch (err) {
            console.error('Failed to fetch shows:', err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchUserShows();
    }, []);


    const selectRandomPair = (data) => {
        if (data.length < 2) return;
        const [show1, show2] = data.sort(() => 0.5 - Math.random()).slice(0, 2);
        setCurrentPair([show1, show2]);
    };

    const handleSelection = async (winnerId) => {
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

    if (loading) return <div>Loading shows...</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">ELO Ranking Showdown</h1>
            <ShowComparison pair={currentPair} onSelectWinner={handleSelection} />
        </div>
    );
};

export default DisplayShows;
