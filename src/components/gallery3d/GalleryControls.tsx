import React from 'react';

interface GalleryControlsProps {
  viewMode: 'walk' | 'orbit';
  onViewModeChange: (mode: 'walk' | 'orbit') => void;
  onResetCamera: () => void;
}

const GalleryControls: React.FC<GalleryControlsProps> = ({ 
  viewMode, 
  onViewModeChange,
  onResetCamera
}) => {
  return (
    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 bg-white/80 backdrop-blur-md rounded-full px-6 py-3 shadow-lg flex items-center space-x-4">
      <button
        onClick={() => onViewModeChange('walk')}
        className={`px-4 py-2 rounded-md transition-colors ${
          viewMode === 'walk' 
            ? 'bg-accent text-white' 
            : 'bg-white text-gallery-700 hover:bg-gallery-100'
        }`}
        title="Mode marche (contrôles WASD)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      </button>
      
      <button
        onClick={() => onViewModeChange('orbit')}
        className={`px-4 py-2 rounded-md transition-colors ${
          viewMode === 'orbit' 
            ? 'bg-accent text-white' 
            : 'bg-white text-gallery-700 hover:bg-gallery-100'
        }`}
        title="Mode orbite (contrôles de la souris)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
        </svg>
      </button>
      
      <div className="h-6 w-px bg-gallery-300"></div>
      
      <button
        onClick={onResetCamera}
        className="px-4 py-2 rounded-md bg-white text-gallery-700 hover:bg-gallery-100 transition-colors"
        title="Réinitialiser la caméra"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
        </svg>
      </button>
      
      <div className="h-6 w-px bg-gallery-300"></div>
      
      <div className="text-sm text-gallery-700">
        <span className="font-medium">Aide:</span> 
        {viewMode === 'walk' ? (
          <span className="ml-2">Utilisez WASD pour vous déplacer, cliquez sur une œuvre pour plus de détails</span>
        ) : (
          <span className="ml-2">Cliquez et faites glisser pour orbiter, molette pour zoomer</span>
        )}
      </div>
    </div>
  );
};

export default GalleryControls;
