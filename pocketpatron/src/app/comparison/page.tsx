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
  const [currentPair, setCurrentPair] = useState<Shows[]>([]);

  useEffect(() => {
    fetch(`/api/user_shows/${"98d5677a-aaad-473a-b798-284a244f261e"}`, {cache: "no-store"})
      .then(response => response.json())
      .then(data => {setShows(data)
        selectRandomPair(data)
      })
      .catch(error => console.error('Error fetching shows:', error));
  }, []);

  const selectRandomPair = (data : Shows[] ) => {
    if (data.length < 2) return;
    const [show1, show2] = data.sort(() => 0.5 - Math.random()).slice(0, 2);
    setCurrentPair([show1, show2]);
};

  return (
    <>
    <div className='grid grid-cols-3 lg:grid-cols-6 gap-2'>
      {currentPair.map((show: { show_id: number; image_url: string; title: string }) => (
        <ShowCard key={show.show_id} title = {show.title} show_id = {show.show_id} imageUrl={show.image_url}/>
      ))}
    </div>
    <div className='grid grid-cols-3 lg:grid-cols-6 gap-2'>
      {shows.map((show: { show_id: number; image_url: string; title: string }) => (
        <ShowCard key={show.show_id} title = {show.title} show_id = {show.show_id} imageUrl={show.image_url}/>
      ))}
    </div>
    </>
  );
}

  