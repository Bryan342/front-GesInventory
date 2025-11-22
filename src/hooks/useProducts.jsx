import { useState, useEffect } from 'react';
import productsData from '../data/products.json';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      setTimeout(() => {
        setProducts(productsData);
        setLoading(false);
      }, 500);
    };
    loadData();
  }, []);

  // BORRAR
  const deleteProduct = (id) => {
    // Filtramos para dejar fuera al que tenga ese ID
    setProducts(products.filter(p => p.id !== id));
  };

  // AGREGAR
  const addProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: `PROD00${products.length + 1}`,
      status: parseInt(newProduct.currentStock) > 0 ? 'En Stock' : 'Sin Stock'
    };
    setProducts([...products, productWithId]);
  };

  // NUEVA FUNCIÓN: EDITAR (ACTUALIZAR)
  const updateProduct = (updatedProduct) => {
    // Recorremos la lista y reemplazamos solo el que coincida el ID
    const updatedList = products.map(p => 
      p.id === updatedProduct.id ? { 
        ...updatedProduct, 
        // Recalculamos el estado por si cambió el stock
        status: parseInt(updatedProduct.currentStock) > 0 ? 'En Stock' : 'Sin Stock' 
      } : p
    );
    setProducts(updatedList);
  };

  return { products, loading, deleteProduct, addProduct, updateProduct };
};