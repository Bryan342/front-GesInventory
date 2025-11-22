import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const EditProductModal = ({ isOpen, onClose, onSave, productToEdit }) => {
  const [formData, setFormData] = useState({
    id: '', name: '', category: '', price: '', currentStock: '', description: ''
  });

  // CLAVE: Cuando el modal se abre o cambia el producto a editar, rellenamos el formulario
  useEffect(() => {
    if (productToEdit) {
      setFormData({
        id: productToEdit.id,
        name: productToEdit.name,
        category: productToEdit.category,
        price: productToEdit.price,
        currentStock: productToEdit.currentStock,
        description: productToEdit.description
      });
    }
  }, [productToEdit, isOpen]);

  if (!isOpen || !productToEdit) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      price: parseFloat(formData.price),
      currentStock: parseInt(formData.currentStock),
      minStock: productToEdit.minStock // Mantenemos datos que no se editan
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition"><X size={20} /></button>
        
        <h2 className="text-2xl font-bold mb-2 text-[#1e1b4b]">Editar Producto</h2>
        <p className="text-gray-400 mb-6 text-sm">Editando: {formData.id}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Nombre</label>
            <input required type="text" className="w-full p-3 bg-gray-50 rounded-xl border focus:ring-2 focus:ring-blue-900 outline-none"
              value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Categoría</label>
              <select className="w-full p-3 bg-gray-50 rounded-xl border focus:ring-2 focus:ring-blue-900 outline-none"
                value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                <option value="Electrónicos">Electrónicos</option>
                <option value="Periféricos">Periféricos</option>
                <option value="Accesorios">Accesorios</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Precio ($)</label>
              <input required type="number" step="0.01" className="w-full p-3 bg-gray-50 rounded-xl border focus:ring-2 focus:ring-blue-900 outline-none"
                value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
            </div>
          </div>

          <div>
             <label className="block text-sm font-medium text-gray-600 mb-1">Stock Actual</label>
             <input required type="number" className="w-full p-3 bg-gray-50 rounded-xl border focus:ring-2 focus:ring-blue-900 outline-none"
              value={formData.currentStock} onChange={e => setFormData({...formData, currentStock: e.target.value})} />
          </div>

          <button type="submit" className="w-full bg-blue-800 text-white py-3 rounded-xl font-bold hover:bg-blue-900 transition mt-4">
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;