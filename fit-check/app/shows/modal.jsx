'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const Modal = ({ children }) => {
    const router = useRouter();

    const closeModal = (e) => {
        e.stopPropagation(); // Prevent the modal click from propagating
        router.back(); // Close the modal without full refresh
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={closeModal} // Close modal when clicking outside
        >
            <div
                className="bg-white p-6 rounded-lg max-w-md w-full relative"
                onClick={(e) => e.stopPropagation()} // Prevent modal content clicks from closing
            >
                <button
                    onClick={closeModal}
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                >
                    ✖️
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
