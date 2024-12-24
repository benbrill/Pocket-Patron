import React from 'react';

const ShowModal = ({ show, onClose }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                >
                    ✖️
                </button>
                <h2 className="text-2xl font-bold mb-4">{show.title}</h2>
                <img
                    src={show.image_url || '/placeholder.jpg'}
                    alt={show.title}
                    className="w-full rounded-md mb-4"
                />
            </div>
        </div>
    );
};

export default ShowModal;
