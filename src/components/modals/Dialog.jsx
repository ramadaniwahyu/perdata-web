import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Don't render if not open

  return (
    <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50 overflow-auto overflow-x-hidden">
      <div className="bg-white p-6 rounded shadow-lg overflow-scroll max-h-[90vh] w-full md:w-1/2 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        >
          ✕
        </button>
        <div className='overflow-y-auto pr-4 flex-grow mt-5'>
          {children} {/* This is where your modal content goes */}
        </div>
      </div>
    </div>
  );
};

export default Modal;