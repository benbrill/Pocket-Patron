import React from 'react';
import ShowCard from './showCard';

const ShowComparison = ({ pair, onSelectWinner }) => {
    if (pair.length < 2) {
        return <div className="text-center">Not enough shows to compare.</div>;
    }

    return (
        <div className="flex flex-col items-center space-y-4">
            <h2 className="text-2xl font-bold">Which Show Do You Prefer?</h2>
            <div className="flex space-x-8 justify-center">
                {pair.map((show) => (
                    <div key={show.id} className="w-1/3">
                        <ShowCard
                            data={show}
                            handleClick = {() => onSelectWinner(show.id)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShowComparison;
