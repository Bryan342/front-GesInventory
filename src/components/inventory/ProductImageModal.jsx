import React from 'react';
import { X } from 'lucide-react';

const ProductImageModal = ({ isOpen, onClose, productName }) => {
  if (!isOpen) return null;

  // URL de imagen de ejemplo (parecida a tu diseño)
  // En un futuro, esto vendría de tu base de datos para cada producto.
  const imageUrl = "https://www.hp.com/content/dam/sites/worldwide/personal-computers/consumer/laptops/pavilion/pavilion-15-eg/pavilion-15-eg-nt-natural-silver-front-right.png";

  return (
    <div className="fixed inset-0 bg-black/50 z-[70] flex items-center justify-center backdrop-blur-sm animate-fade-in p-4">
      <div className="bg-white rounded-[3rem] p-8 w-full max-w-2xl shadow-2xl relative border border-gray-200">
        
        {/* Header con Título y Botón X */}
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-300 relative">
          <h2 className="text-2xl font-normal text-black ml-4">Imagen</h2>
          <button onClick={onClose} className="text-xl font-bold text-black px-2 hover:bg-gray-100 rounded-full transition">
           X
          </button>
        </div>
        
        {/* Contenedor de la imagen */}
        <div className="flex justify-center items-center p-4 pb-8 border-b border-gray-300">
            <img 
              src={imageUrl} 
              alt={productName} 
              className="max-h-[400px] object-contain drop-shadow-xl"
            />
        </div>
         {/* Espacio inferior para igualar tu diseño */}
        <div className="h-8"></div>
      </div>
    </div>
  );
};

export default ProductImageModal;