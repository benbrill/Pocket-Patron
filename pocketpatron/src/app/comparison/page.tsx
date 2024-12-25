'use client'
import { useState, useEffect } from "react";
import ShowCard from "@/components/ShowCard";

type Shows = {
  show_id: number;
  image_url: string;
  title: string;
  season: number;
  created_at: EpochTimeStamp;
  url: string;
}

// export default function Page({params}: {params: {user_id: string}}) {
export default function Page() {
  const [shows, setShows] = useState<Shows[]>([]);
  useEffect(() => {
    fetch(`/api/user_shows/${"98d5677a-aaad-473a-b798-284a244f261e"}`, {cache: "no-store"})
      .then(response => response.json())
      .then(data => setShows(data))
      .catch(error => console.error('Error fetching shows:', error));
  }, []);

  console.log(shows);
  return (
    <div className='grid grid-cols-3 lg:grid-cols-6 gap-2'>
      {shows.map((show: { show_id: number; image_url: string; title: string }) => (
        <ShowCard key={show.show_id} title = {show.title} show_id = {show.show_id} imageUrl={show.image_url}/>
      ))}
    </div>
  );
}

  