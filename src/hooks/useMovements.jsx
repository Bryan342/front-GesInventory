import { useState, useEffect } from 'react';
import movementsData from '../data/movements.json';

export const useMovements = () => {
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setMovements(movementsData);
      setLoading(false);
    }, 500);
  }, []);

  // Editar Movimiento
  const updateMovement = (updatedMov) => {
    const newList = movements.map(m => m.id === updatedMov.id ? updatedMov : m);
    setMovements(newList);
  };

  return { movements, loading, updateMovement };
};