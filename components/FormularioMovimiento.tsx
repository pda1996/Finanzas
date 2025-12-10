// Archivo: components/FormularioMovimiento.tsx

'use client'; // ¡Necesario para useState y onSubmit!

import { useState } from 'react';
import { supabase } from '@/utils/supabase';

export default function FormularioMovimiento() {
  const [concepto, setConcepto] = useState('');
  const [monto, setMonto] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setLoading(true);
    setErrorMsg('');

    const nuevoMovimiento = { 
      concepto: concepto, 
      monto: monto,
      fecha: new Date().toISOString().split('T')[0], // Fecha de hoy
      id_cuenta: 1
    };

    const { error } = await supabase
      .from('movimientos') // <-- Verifica que este nombre sea correcto
      .insert(nuevoMovimiento);

    setLoading(false);

    if (error) {
      setErrorMsg(`Error: ${error.message}. Verifica que las columnas existan.`);
    } else {
      //alert('¡Movimiento registrado! Por favor, recarga la página.');
      setConcepto('');
      setMonto(0);
      window.location.reload(); // <--- USA ESTO PARA RECARGAR
      // Opcional: En un paso futuro, añadiremos un refresco automático.
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl border-t-4 border-blue-500 sticky top-4">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Añadir Nuevo Movimiento</h2>
      
      {/* Mensaje de Error */}
      {errorMsg && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">{errorMsg}</div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Input Concepto */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Concepto:</label>
          <input
            type="text"
            value={concepto}
            onChange={(e) => setConcepto(e.target.value)}
            required
            className="border border-gray-400 rounded w-full py-2 px-3 text-gray-700"
          />
        </div>

        {/* Input Monto */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Monto ($):</label>
          <input
            type="number"
            step="0.01"
            value={monto}
            onChange={(e) => setMonto(parseFloat(e.target.value))}
            required
            className="border border-gray-400 rounded w-full py-2 px-3 text-gray-700"
          />
        </div>

        {/* Botón */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition focus:outline-none disabled:opacity-50"
        >
          {loading ? 'Guardando...' : 'Guardar Movimiento'}
        </button>
      </form>
    </div>
  );
}