// Archivo: app/page.tsx
// Server Component: Se enfoca en la obtención de datos (rápido y seguro).

import { supabase } from '@/utils/supabase';
import TablaMovimientos from '@/components/TablaMovimientos'; // Componente para la visualización
import FormularioMovimiento from '@/components/FormularioMovimiento'; // Componente para la inserción
import BalanceSummary from '@/components/BalanceSummary'; // <--- NUEVA IMPORTACIÓN
// ...
export default async function Home() {

  // --- 1. Lógica de Lectura de Datos ---
  // Reemplaza 'movimientos' con el nombre exacto de tu tabla de datos real
  const { data: transacciones, error } = await supabase
    .from('movimientos') 
    .select('*')
    .order('fecha', { ascending: false }); 

  // --- 2. Renderizado de la UI (Estructura Modular) ---
  return (
    <main className="p-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800">
        Dashboard de Finanzas
      </h1>

      {/* Muestra el estado de la conexión */}
      <div className={`p-4 rounded-lg text-sm mb-8 ${error ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
        {error ? `Error al cargar datos: ${error.message}` : '¡Conexión a Supabase Exitosa!'}
      </div>
      {/* AQUI VA EXACTAMENTE EL BALANCE */}
      <BalanceSummary transacciones={transacciones} />
      {/* Estructura principal: Formulario arriba, Tabla abajo */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          {/* A. Componente para Añadir Datos (Es un Cliente Component) */}
          <FormularioMovimiento />
        </div>
        
        <div className="lg:col-span-2">
          {/* B. Componente para Visualizar Datos (Es un Server Component) */}
          <TablaMovimientos data={transacciones} />
        </div>
      </div>
      
    </main>
  );
}