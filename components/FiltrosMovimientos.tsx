// Archivo: components/FiltrosMovimientos.tsx

'use client'; 

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function FiltrosMovimientos() {
  const router = useRouter();
  const searchParams = useSearchParams(); // Hook para leer los parámetros actuales
  
  // Estados para controlar los inputs (inicializados con los valores de la URL si existen)
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [tipo, setTipo] = useState(searchParams.get('tipo') || ''); 

  // Función que construye la nueva URL y la navega
  const handleFiltroChange = (name: string, value: string) => {
    // 1. Crear una copia de los parámetros actuales
    const params = new URLSearchParams(searchParams.toString());
    
    // 2. Actualizar el valor o eliminarlo si está vacío
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    // 3. Navegar a la nueva URL (esto hace que page.tsx se ejecute de nuevo con los nuevos filtros)
    router.push(`/?${params.toString()}`);
  };

  // Función específica para la búsqueda por texto (se activa al presionar Enter o perder foco)
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleFiltroChange('q', query);
  };
  
  // Limpiar la query si el usuario borra todo
  useEffect(() => {
    if (query === '' && searchParams.get('q')) {
      handleFiltroChange('q', '');
    }
  }, [query]);


  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 p-4 bg-gray-50 rounded-lg shadow-inner border border-gray-200">
      
      {/* Filtro por Tipo */}
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">Filtrar por Tipo</label>
        <select
          value={tipo}
          onChange={(e) => {
            setTipo(e.target.value);
            handleFiltroChange('tipo', e.target.value); // Aplica el filtro inmediatamente
          }}
          className="w-full border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Mostrar Todos</option>
          <option value="Ingreso">Ingresos</option>
          <option value="Gasto">Gastos</option>
        </select>
      </div>

      {/* Búsqueda por Concepto */}
      <form onSubmit={handleSearchSubmit} className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">Buscar por Concepto</label>
        <div className="flex">
          <input
            type="text"
            placeholder="Buscar..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onBlur={handleSearchSubmit} // También busca al perder el foco
            className="w-full border-gray-300 rounded-l-md shadow-sm py-2 px-3 text-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-r-md hover:bg-blue-700 transition"
          >
            🔍
          </button>
        </div>
      </form>
    </div>
  );
}