import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-white z-50 flex flex-col items-center justify-center">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-t-4 border-accent rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-r-4 border-accent-light rounded-full animate-spin animation-delay-150"></div>
        <div className="absolute inset-4 border-b-4 border-accent-dark rounded-full animate-spin animation-delay-300"></div>
      </div>
      <h2 className="mt-8 text-2xl font-serif text-gallery-800">Chargement de la Galerie</h2>
      <p className="mt-2 text-gallery-600">Préparation de votre expérience virtuelle...</p>
    </div>
  );
};

export default LoadingScreen;
