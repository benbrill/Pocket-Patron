'use client'
import { useState, useEffect } from "react"
import ShowCard from "@/components/ShowCard";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import Image from "next/image";
import { useRouter } from 'next/navigation';



//cache shows?
export default function AddShows() {
    const [shows, setShows] = useState<{ show_id: number; image_url: string; title: string, season: number, created_at: EpochTimeStamp, url:string }[]>([]);
    const [selectedShows, setSelectedShows] = useState<number[]>([]);
    const router = useRouter();

    useEffect(() => {
        fetch('/api/shows')
            .then(response => response.json())
            .then(data => setShows(data))
            .catch(error => console.error('Error fetching shows:', error));
    }, []);

    const handleShowSelect = (show_id: number) => {
        if (selectedShows.includes(show_id)) {
            console.log('removing show');
            setSelectedShows(selectedShows.filter((id) => id !== show_id));
        }
        else {
            setSelectedShows([...selectedShows, show_id]);
        }
        console.log(selectedShows);
    }

    const handleSubmit = () => {
        fetch('/api/addShows', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ show_ids: selectedShows })
        })
        .then(response => {
            if (!response.ok) throw new Error(`Failed to submit shows: ${response.statusText}`);
            console.log('Shows submitted successfully.');
        })
        .catch(error => console.error('Error submitting shows:', error));

        
        router.push('/comparison');
        setSelectedShows([]);
    }

    return (
        <>
        <div className="h-72 w-full p-3 bg-gradient-to-t from-zinc-900 
        from-10% to-transparent to-30% mb-5 mt-5 flex 
        justify-center items-center border-b-2 overflow-x-scroll overflow-y-hidden">
        {selectedShows.length <= 0 && 
        <div className='text-2xl font-sans font-medium text-zinc-200'>
            Add some shows, why don't ya?
            </div>}
        <div className='flex flex-nowrap  gap-2 flex-shrink-0'>
            {selectedShows.map((show_id) => {
                const show = shows.find((show) => show.show_id === show_id);
                if (show) {
                    return (
                        <div className="relative h-80 w-40 cursor-pointer" key = {show.show_id} onClick={() => handleShowSelect(show.show_id)}> 
                            <Image src={show.image_url} alt = {show.title} layout="fill" objectFit="contain" />
                        </div>
                    );
                }
                return null;
            })}
        </div>
        </div>
        {
            selectedShows.length > 0 && 
            <Button onClick={handleSubmit} className="font-sans text-lg m-3">Submit Shows</Button>
        }
        <div className='grid grid-cols-3 lg:grid-cols-6 gap-4 '  style={{
              margin: `0 auto`,
              maxWidth: 1080,
              padding: `0 1.0875rem 1.45rem`,
            }}>
            {shows.map((show: { show_id: number; image_url: string; title: string; season: number}) => (
            <ShowCard key={show.show_id} 
                title = {show.title} 
                season = {show.season}
                show_id = {show.show_id} 
                imageUrl={show.image_url} 
                handleClick = {handleShowSelect}
                active = {selectedShows.includes(show.show_id)}
            />
            ))}
        </div>
        </>
    );
}