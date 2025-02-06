"use client"

import React from 'react';
import { useEffect, useState } from 'react';
import ShowCardLink from './ShowCardLink';


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
        <div className='grid grid-cols-3 lg:grid-cols-6 gap-2'    style={{
              margin: `0 auto`,
              maxWidth: 1080,
              padding: `0 1.0875rem 1.45rem`,
            }}>
            {shows.map((show: { show_id: number; image_url: string; title: string }) => (
            <ShowCardLink key={show.show_id} title = {show.title}  season={show.season} show_id = {show.show_id} imageUrl={show.image_url}/>
            ))}
        </div>
    );
};

export default DisplayCard;