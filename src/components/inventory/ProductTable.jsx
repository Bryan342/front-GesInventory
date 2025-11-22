import React, { useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { Edit2, Trash2, Image as ImageIcon, Search, Plus } from 'lucide-react';
// Importamos los 3 modales
import AddProductModal from './AddProductModal';
import EditProductModal from './EditProductModal';
import ProductImageModal from './ProductImageModal';

const ProductTable = () => {
  // Obtenemos todas las funciones del hook
  const { products, loading, deleteProduct, addProduct, updateProduct } = useProducts();
  
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estados para controlar los Modales
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // Producto a editar
  
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageProduct, setImageProduct] = useState(null); // Producto a ver imagen

  // Funciones para abrir modales específicos
  const handleEditClick = (product) => {
    setEditingProduct(product); // Guardamos cuál vamos a editar
    setIsEditModalOpen(true);   // Abrimos el modal
  };

  const handleImageClick = (product) => {
    setImageProduct(product); // Guardamos cuál vamos a ver
    setIsImageModalOpen(true); // Abrimos el modal
  };

  // Filtrado
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="p-10 text-center text-gray-400 animate-pulse">Cargando productos...</div>;

  return (
    <div className="space-y-6 relative z-0">
      
      {/* --- BARRA SUPERIOR --- */}
      <div className="bg-white rounded-full p-2 pl-6 border border-gray-200 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2 text-gray-400 w-full">
          <Search size={20} />
          <input 
            type="text" 
            placeholder="Buscar por nombre o código..." 
            className="outline-none w-full text-gray-600 placeholder-gray-400 bg-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button onClick={() => setIsAddModalOpen(true)} className="bg-[#1e1b4b] text-white px-6 py-2 rounded-full hover:bg-blue-900 transition flex items-center gap-2 font-medium shadow-md transform active:scale-95">
          <Plus size={18} /> Nuevo Producto
        </button>
      </div>

      {/* --- TABLA --- */}
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
        <h3 className="text-gray-500 mb-6 font-medium">Lista de Productos ({filteredProducts.length})</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-black font-bold border-b border-gray-200">
              <th className="pb-4 pl-2">Código</th>
              <th className="pb-4">Producto</th>
              <th className="pb-4">Categoría</th>
              <th className="pb-4">Precio</th>
              <th className="pb-4">Stock</th>
              <th className="pb-4">Estado</th>
              <th className="pb-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-600">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-b border-gray-100 hover:bg-blue-50/30 transition-colors group">
                <td className="py-4 pl-2 font-medium">{product.id}</td>
                <td className="py-4">
                  <div className="font-bold text-gray-800 flex items-center gap-2">
                    {product.name}
                    {/* BOTÓN IMAGEN: Ahora abre el modal */}
                    <button onClick={() => handleImageClick(product)} className="text-gray-400 hover:text-blue-600 transition">
                      <ImageIcon size={14} />
                    </button>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{product.description}</div>
                </td>
                <td className="py-4">{product.category}</td>
                <td className="py-4 font-medium text-gray-800">${product.price.toFixed(2)}</td>
                <td className="py-4">
                  <div className="flex flex-col"><span className="text-gray-800 font-medium">Actual: {product.currentStock}</span></div>
                </td>
                <td className="py-4">
                   <span className={`px-3 py-1 rounded-full text-xs font-bold border ${product.status === 'En Stock' ? 'bg-[#1e1b4b] text-white border-[#1e1b4b]' : 'bg-gray-300 text-white border-gray-300'}`}>{product.status}</span>
                </td>
                <td className="py-4 text-center">
                  <div className="flex items-center justify-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                    {/* BOTÓN EDITAR: Ahora abre el modal */}
                    <button onClick={() => handleEditClick(product)} className="p-2 border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-600 transition">
                      <Edit2 size={16} />
                    </button>
                    {/* BOTÓN BORRAR: Ya funcionaba */}
                    <button onClick={() => deleteProduct(product.id)} className="p-2 border border-gray-200 rounded-lg hover:bg-red-50 hover:text-red-500 transition">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- RENDERIZADO DE LOS MODALES --- */}
      
      {/* Modal Agregar */}
      <AddProductModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onSave={addProduct}
      />

      {/* Modal Editar */}
      <EditProductModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={updateProduct}
        productToEdit={editingProduct} // Pasamos el producto seleccionado
      />

      {/* Modal Imagen (Igual que tu foto) */}
      <ProductImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        productName={imageProduct?.name}
      />
    </div>
  );
};

export default ProductTable;