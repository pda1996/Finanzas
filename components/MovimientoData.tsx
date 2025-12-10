// Archivo: components/MovimientoData.tsx

'use client'; // <-- ¡CRÍTICO! Convertimos este contenedor en Componente Cliente

import { useSearchParams } from 'next/navigation'; // <-- Usamos el hook de Cliente
import { supabase } from '@/utils/supabase';
import TablaMovimientos from './TablaMovimientos';
import BalanceSummary from './BalanceSummary';
import FiltrosMovimientos from './FiltrosMovimientos';
import { useState, useEffect } from 'react';

// Función para manejar la obtención de datos (Server-side logic en Client Component)
async function fetchMovimientos(params: URLSearchParams) {
  
  const query = params.get('q');
  const tipoFiltro = params.get('tipo');

  let consulta = supabase.from('movimientos').select('*');

  // Aplicar filtros
  if (tipoFiltro) { 
    consulta = consulta.eq('tipo', tipoFiltro);
  }
  if (query) { 
    consulta = consulta.ilike('concepto', `%${query}%`);
  }
  
  // Ejecutar la consulta
  const { data, error } = await consulta.order('fecha', { ascending: false }); 
  return { data, error };
}


export default function MovimientoData() {
  const searchParams = useSearchParams(); // Leemos la URL sin errores de Promesa
  const [data, setData] = useState<any[] | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 1. Efecto que se dispara cada vez que la URL (searchParams) cambia
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    
    setLoading(true);
    fetchMovimientos(params)
      .then(result => {
        setData(result.data);
        setError(result.error);
        setLoading(false);
      });
  }, [searchParams]); // <-- Dependencia clave

  if (loading) {
    return (
      <>
        <FiltrosMovimientos />
        <div className="text-gray-500 p-8">Cargando datos...</div>
      </>
    );
  }

  return (
    <>
      {/* Filtros para cambiar la URL */}
      <FiltrosMovimientos /> 
      
      {/* Manejo de Errores */}
      {error && (
          <div className="p-4 bg-red-100 text-red-800 rounded-md">
              Error al cargar los datos: {error.message}
          </div>
      )}
      
      {/* Balance y Tabla */}
      {!error && (
        <>
          <BalanceSummary transacciones={data} />
          <div className="mt-6"> 
            <TablaMovimientos data={data} />
          </div>
        </>
      )}
    </>
  );
}