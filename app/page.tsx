// Archivo: app/page.tsx

import { supabase } from '@/utils/supabase';
import FormularioMovimiento from '@/components/FormularioMovimiento'; 
import MovimientoData from '@/components/MovimientoData'; // Se queda
// import TablaMovimientos from '@/components/TablaMovimientos'; // Ya no se necesita aquí
// import BalanceSummary from '@/components/BalanceSummary'; // Ya no se necesita aquí
// import FiltrosMovimientos from '@/components/FiltrosMovimientos'; // Ya no se necesita aquí

// Eliminamos la interfaz SearchParams de aquí
// interface SearchParams { ... }

// Home ya no necesita ser async ni recibir searchParams
export default async function Home() { 

  // Chequeo de conexión simple
  const { error } = await supabase.from('movimientos').select('id').limit(1);

  return (
    <main className="p-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800">
        Dashboard de Finanzas
      </h1>

      {/* Muestra el estado de la conexión */}
      <div className={`p-4 rounded-lg text-sm mb-8 ${error ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
        {error ? `Error al cargar datos: ${error.message}` : '¡Conexión a Supabase Exitosa!'}
      </div>
      
      {/* Estructura principal: Formulario a la izquierda */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <FormularioMovimiento />
        </div>
        
        {/* El componente MovimientoData ahora se encarga de sí mismo */}
        <div className="lg:col-span-2">
          {/* El error se resolvió delegando la lectura al cliente: */}
          <MovimientoData /> 
        </div>
      </div>
    </main>
  );
}