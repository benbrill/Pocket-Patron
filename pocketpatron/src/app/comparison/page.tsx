'use client'
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

type Show = {
  show_id: number;
  image_url: string;
  image_filename: string;
  elo_score: number;
  title: string;
  season: number;
  created_at: EpochTimeStamp;
  url: string;
}

// type EloScores = {
//   [show_id: number]: number;
// }


type ComparisonKey = `${number}-${number}`;

const ShowComparison: React.FC = () => {
    const [shows, setShows] = useState<Show[]>([]);
    const [currentPair, setCurrentPair] = useState<[Show, Show] | null>(null);
    const [comparisonHistory, setComparisonHistory] = useState<Set<ComparisonKey>>(new Set());
    const [matchups, setMatchups] = useState<Array<{ winner_id: number; loser_id: number }>>([])
    const router = useRouter();

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
    
        // Save locally
        setMatchups((prev) => [...prev, { winner_id: winnerId, loser_id: loserId }]);
        // Select next pair
        selectRandomPair(shows);
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
        console.log('Submitting matchups...');
    
        fetch(`/api/matchups`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ matchups }),
        })
            .then((res) => {
                if (!res.ok) throw new Error('Failed to submit matchups');
                console.log('Matchups submitted successfully');
                router.push('/dashboard');
            })
            .catch((err) => console.error(err));
    };
    

    const truncate = (text: string) => {
        return text.length > 35 ? text.substring(0, 35) + '...' : text;
    }

    return (
        <div className="flex items-center flex-col bg-gradient-to-t h-lvh from-zinc-900 from-10% to-transparent to-30%">
            <div className="text-3xl font-semibold tracking-tigheter font-sans mb-3">Choose your favorite</div>
            {currentPair ? (
                <div className="show-comparison flex lg:flex-row flex-col lg:justify-center items-center gap-4 w-full">
                    {currentPair.map((show) => (
                        <div onClick={() => handleShowClick(show.show_id)} key = {show.show_id} 
                            className="w-2/5 lg:w-1/6 px-1 flex flex-col items-center justify-start bg-gradient-to-bl from-zinc-600 to-zinc-800 rounded-md backdrop-opacity-20 ring-2 ring-zinc-600 cursor-pointer">
                            <div className="relative h-72 w-full cursor-pointer"> 
                                <Image src={`/${show.image_filename}`} alt = {show.title} layout="fill" objectFit="contain" unoptimized />
                            </div>
                            <div>
                                <div className = "font-mono text-m text-center">{show.season}</div>
                                <div className="text-xl font-black font-sans text-center opacity-100-important">{truncate(show.title)}</div>
                            </div>
                        </div>
                        // <ShowCard
                        //     key={show.show_id}
                        //     title={show.title}
                        //     imageUrl={show.image_url}
                        //     show_id={show.show_id}
                        //     handleClick={handleShowClick}
                        // />
                    ))}
                </div>
            ) : (
                <div className="show-comparison flex lg:flex-row flex-col lg:justify-center items-center gap-4 w-full">
                    <div></div>
                    <Skeleton className="w-2/5 lg:w-1/6 h-80 flex flex-col items-center gap-2"> 
                        <Skeleton className="h-72 w-3/4" />
                        <Skeleton className="w-44 h-7 p-4"/>
                    </Skeleton>
                    <Skeleton className="w-2/5 lg:w-1/6 h-80 flex flex-col items-center gap-2"> 
                        <Skeleton className="h-72 w-3/4" />
                        <Skeleton className="w-44 h-7 p-4"/>
                    </Skeleton>
                </div>
            )}

            <Button onClick={handleRankingsSubmit} className = "mt-4">Submit Rankings</Button>
        </div>
    );
};

export default ShowComparison;
