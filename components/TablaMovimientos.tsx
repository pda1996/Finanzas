// Archivo: components/TablaMovimientos.tsx
// Componente de Servidor: Solo se encarga de dibujar el HTML con los datos.

interface Transaccion {
  id: number;
  fecha: string;
  concepto: string;
  monto: number;
  // Asegúrate de que los nombres de tus columnas coincidan aquí.
}

export default function TablaMovimientos({ data }: { data: Transaccion[] | null }) {
  
  if (!data || data.length === 0) {
    return (
      <div className="p-8 bg-white rounded-lg shadow-xl border-t-4 border-blue-500">
        <h2 className="text-xl font-semibold mb-4">Movimientos Recientes</h2>
        <p className="text-gray-600">No se encontraron movimientos. ¡Usa el formulario para añadir el primero!</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-white rounded-lg shadow-xl border-t-4 border-blue-500">
      <h2 className="text-xl font-semibold mb-4">Movimientos Recientes ({data.length})</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Concepto</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((t) => (
              <tr key={t.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{t.fecha}</td> 
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{t.concepto}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${t.monto < 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {t.monto.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}