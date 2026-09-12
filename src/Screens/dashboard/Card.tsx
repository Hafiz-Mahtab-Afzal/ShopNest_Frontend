import React from 'react';

interface CardProps {
  onCancel: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  isLoading?: boolean; // Taake delete hote waqt button "Loading..." dikhaye
}

const Card: React.FC<CardProps> = ({ 
  onCancel, 
  onConfirm, 
  title = "Are you sure?", 
  message = "Do you really want to continue? This process cannot be undone.",
  isLoading = false
}) => {
  return (
    // Backdrop Overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="group select-none w-[320px] flex flex-col p-6 bg-gray-800 border border-gray-700 shadow-2xl rounded-3xl animate-in fade-in zoom-in duration-300">
        
        {/* Icon */}
        <div className="text-center p-3 flex-auto justify-center">
          <svg fill="currentColor" viewBox="0 0 20 20" className="group-hover:animate-bounce w-16 h-16 flex items-center text-red-500 mx-auto" xmlns="http://www.w3.org/2000/svg">
            <path clipRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" fillRule="evenodd" />
          </svg>
          
          <h2 className="text-2xl font-bold py-4 text-gray-100">{title}</h2>
          <p className="text-sm text-gray-400 px-2 leading-relaxed">
            {message}
          </p>
        </div>

        {/* Buttons */}
        <div className="p-2 mt-4 text-center flex justify-center gap-3">
          <button 
            onClick={onCancel}
            className="px-6 py-2.5 text-sm font-semibold tracking-wide border-2 border-gray-600 text-gray-300 rounded-full hover:bg-gray-700 transition duration-300"
          >
            Cancel
          </button>
          
          <button 
            onClick={onConfirm}
            disabled={isLoading}
            className="px-6 py-2.5 text-sm font-semibold tracking-wide bg-red-600 hover:bg-red-700 text-white rounded-full transition duration-300 disabled:opacity-50"
          >
            {isLoading ? "Deleting..." : "Confirm Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;