import React, { useState } from 'react';
import { Painting } from '@/lib/data';

interface SelectionCartProps {
  selectedPaintings: Painting[];
  onRemoveFromSelection: (paintingId: string) => void;
  onCheckout: () => void;
}

const SelectionCart: React.FC<SelectionCartProps> = ({ 
  selectedPaintings, 
  onRemoveFromSelection,
  onCheckout
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const totalPrice = selectedPaintings.reduce((sum, painting) => sum + painting.price, 0);
  
  return (
    <>
      {/* Cart button */}
      <button 
        className="fixed top-6 right-6 z-20 bg-white rounded-full p-3 shadow-lg flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gallery-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          
          {selectedPaintings.length > 0 && (
            <div className="absolute -top-2 -right-2 bg-accent text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {selectedPaintings.length}
            </div>
          )}
        </div>
      </button>
      
      {/* Cart panel */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-20 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-serif text-gallery-800">Ma Sélection</h2>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gallery-500 hover:text-gallery-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          {selectedPaintings.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-gallery-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <p>Votre sélection est vide</p>
              <p className="text-sm mt-2">Cliquez sur "Ajouter à ma sélection" pour les œuvres qui vous intéressent</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-auto">
                <ul className="space-y-4">
                  {selectedPaintings.map(painting => (
                    <li key={painting.id} className="bg-gallery-50 rounded-lg p-3 flex">
                      <div className="w-20 h-20 bg-white rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={painting.imageUrl} 
                          alt={painting.title} 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="ml-3 flex-1">
                        <h3 className="text-sm font-medium text-gallery-800">{painting.title}</h3>
                        <p className="text-xs text-gallery-600">{painting.dimensions}</p>
                        <p className="text-sm font-medium text-gallery-900 mt-1">{painting.price.toLocaleString()} $</p>
                      </div>
                      <button 
                        onClick={() => onRemoveFromSelection(painting.id)}
                        className="text-gallery-400 hover:text-red-500 self-start"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gallery-100">
                <div className="flex justify-between mb-4">
                  <span className="font-medium text-gallery-700">Total</span>
                  <span className="font-medium text-gallery-900">{totalPrice.toLocaleString()} $</span>
                </div>
                
                <button 
                  onClick={onCheckout}
                  className="w-full bg-accent hover:bg-accent-dark text-white py-3 rounded-md transition-colors"
                >
                  Demander plus d'informations
                </button>
                
                <p className="text-xs text-gallery-500 mt-3 text-center">
                  Nous vous contacterons pour discuter des détails de votre sélection et des options d'achat.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-10"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default SelectionCart;
