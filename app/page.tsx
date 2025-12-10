// Archivo: mi-web-finanzas/app/page.tsx
import { supabase } from '@/utils/supabase'; // Importamos nuestro cliente Supabase

// Definición del Tipo de Dato (TypeScript) para lo que esperamos recibir
// Esto nos da seguridad y autocompletado en VS Code
interface TipoActivo {
  id: number;
  nombre: string;
}

// Componente principal de la página (será nuestro Dashboard inicial)
export default async function HomePage() {
  
  // 1. Lógica de Lectura de la Base de Datos
  const { data: tiposActivo, error } = await supabase
    .from('tipos_activo') // Nombre de la tabla que creamos
    .select('id, nombre') // Columnas que queremos seleccionar
    .order('id', { ascending: true }); // Ordenar por ID

  // Manejo de errores de Supabase
  if (error) {
    console.error("Error al cargar los tipos de activo:", error);
    return <div>Error al conectar con la base de datos: {error.message}</div>;
  }

  // Si la consulta fue exitosa
  const tipos = tiposActivo as TipoActivo[] || [];

  // 2. Renderizado de la Interfaz (Frontend)
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Estado de la Conexión a Supabase</h1>
      
      {tipos.length > 0 ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">¡Conexión Exitosa!</strong>
          <span className="block sm:inline"> Se han recuperado datos de la tabla `tipos_activo`.</span>
        </div>
      ) : (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Advertencia:</strong>
          <span className="block sm:inline"> Se ha conectado a Supabase, pero la tabla está vacía.</span>
        </div>
      )}

      <h2 className="text-xl font-semibold mt-8 mb-4">Tipos de Activos Cargados:</h2>
      <ul className="list-disc pl-5">
        {tipos.map((tipo) => (
          <li key={tipo.id} className="text-lg">
            {tipo.id}. {tipo.nombre}
          </li>
        ))}
      </ul>
      
      <p className="mt-6 text-gray-500">Este es el inicio de tu aplicación de finanzas personales. ¡Aún faltan estilos!</p>
    </div>
  );
}