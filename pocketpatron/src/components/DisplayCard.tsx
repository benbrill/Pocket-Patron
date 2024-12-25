"use client"

import React from 'react';
import { useEffect, useState } from 'react';
import ShowCard from './ShowCard';


// TODO: see https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#generating-static-params
const DisplayCard: React.FC = () => {

    const [shows, setShows] = useState<{ show_id: number; image_url: string; title: string, season: number, created_at: EpochTimeStamp, url:string }[]>([]);

    useEffect(() => {
        fetch('/api/shows')
            .then(response => response.json())
            .then(data => setShows(data))
            .catch(error => console.error('Error fetching shows:', error));
    }, []);
    return (
        <div className='grid grid-cols-3 lg:grid-cols-6 gap-2'>
            {shows.map((show: { show_id: number; image_url: string; title: string }) => (
            <ShowCard key={show.show_id} title = {show.title} show_id = {show.show_id} imageUrl={show.image_url}/>
            ))}
        </div>
    );
};

export default DisplayCard;