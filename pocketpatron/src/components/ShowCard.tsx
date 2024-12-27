import React from 'react';
import Image from 'next/image';

interface ShowCardProps {
    title: string;
    imageUrl: string;
    show_id: number
    handleClick?: (show_id: number) => void;
    active?: boolean;
}

const ShowCard: React.FC<ShowCardProps> = ({ title, imageUrl, show_id, handleClick, active }) => {
    console.log('active:', active);
    return (
        <div 
            // style = {{backgroundColor: active ? 'yellow' : 'black'}}
            className={`show-card cursor-pointer ${active ? 'bg-yellow-500' : 'bg-gray-800'}`} 
            onClick = {() => handleClick && handleClick(show_id)}
        >
            <Image src={imageUrl} alt={title} className="show-card__image" width={629} height={1024} />
            <div className="show-card__content">
                <div className="show-card__title font-sans text-2xl font-semibold tracking-tight">{title}</div>
            </div>
        </div>
    );
};

export default ShowCard;