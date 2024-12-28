'use client'
import { useState, useEffect } from "react";
import ShowCard from "@/components/ShowCard";
import { calculateElo } from "@/lib/eloAlgo";
import { Button } from "@/components/ui/button";

type Show = {
  show_id: number;
  image_url: string;
  elo_score: number;
  title: string;
  season: number;
  created_at: EpochTimeStamp;
  url: string;
}

type EloScores = {
  [show_id: number]: number;
}

type ComparisonKey = `${number}-${number}`;

const ShowComparison: React.FC = () => {
    const [shows, setShows] = useState<Show[]>([]);
    const [currentPair, setCurrentPair] = useState<[Show, Show] | null>(null);
    const [comparisonHistory, setComparisonHistory] = useState<Set<ComparisonKey>>(new Set());

    // ✅ Select a unique random pair
    const selectRandomPair = (data: Show[]) => {
        if (data.length < 2) return;

        let pair: [Show, Show] | null = null;

        // Shuffle the array and find a unique pair
        const shuffled = [...data].sort(() => 0.5 - Math.random());

        for (let i = 0; i < shuffled.length; i++) {
            for (let j = i + 1; j < shuffled.length; j++) {
                const show1 = shuffled[i];
                const show2 = shuffled[j];
                const key: ComparisonKey = `${Math.min(show1.show_id, show2.show_id)}-${Math.max(show1.show_id, show2.show_id)}`;

                if (!comparisonHistory.has(key)) {
                    pair = [show1, show2];
                    setComparisonHistory((prev) => new Set(prev).add(key));
                    break;
                }
            }
            if (pair) break;
        }

        if (pair) {
            setCurrentPair(pair);
        } else {
            console.warn('No unique comparisons left.');
            setCurrentPair(null);
        }
    };

    // ✅ Handle Show Click for Winner Selection
    const handleShowClick = (show_id: number) => {
        if (!currentPair) return;

        const [show1, show2] = currentPair;
        const winnerId = show_id;
        const loserId = show1.show_id === show_id ? show2.show_id : show1.show_id;

        // Prepare Elo scores
        const eloScores = shows.reduce((acc, show) => {
            acc[show.show_id] = show.elo_score;
            return acc;
        }, {} as Record<number, number>);

        // Calculate new Elo scores
        const newEloScores = calculateElo(eloScores, winnerId, loserId);

        // Update shows with new scores
        const updatedShows = shows.map((show) => ({
            ...show,
            elo_score: newEloScores[show.show_id] || show.elo_score,
        }));
        setShows(updatedShows);

        console.log('Updated Elo Scores:', newEloScores);

        // Select a new unique pair
        selectRandomPair(updatedShows);
    };

    // ✅ Fetch shows on initial load
    useEffect(() => {
        fetch(`/api/user_shows/`, { cache: 'no-store' })
            .then((response) => {
                if (!response.ok) throw new Error(`Failed to fetch shows: ${response.statusText}`);
                return response.json();
            })
            .then((data: Show[]) => {
                setShows(data);
                selectRandomPair(data);
            })
            .catch((error) => console.error('Error fetching shows:', error));
    }, []);

    const handleRankingsSubmit = () => {
      console.log('Submit Rankings');

      // fetch(`/api/submitRankings/${'98d5677a-aaad-473a-b798-284a244f261e'}`, {
      fetch(`/api/submitRankings`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(shows.map((show) => ({ show_id: show.show_id, elo_score: show.elo_score }))),
      })
          .then((response) => {
              if (!response.ok) throw new Error(`Failed to submit rankings: ${response.statusText}`);
              console.log('Rankings submitted successfully.');
          })
          .catch((error) => console.error('Error submitting rankings:', error));
    }

    return (
        <div>
            <h1>Show Comparison</h1>
            {currentPair ? (
                <div className="show-comparison grid grid-cols-3 lg:grid-cols-6 gap-2">
                    {currentPair.map((show) => (
                        <ShowCard
                            key={show.show_id}
                            title={show.title}
                            imageUrl={show.image_url}
                            show_id={show.show_id}
                            handleClick={handleShowClick}
                        />
                    ))}
                </div>
            ) : (
                <p>No more unique comparisons available.</p>
            )}

            <Button onClick={handleRankingsSubmit}>Submit Rankings</Button>
        </div>
    );
};

export default ShowComparison;
