// Archivo: components/BalanceSummary.tsx

// Este es un componente simple que recibe los datos y calcula el total
export default function BalanceSummary({ transacciones }: { transacciones: any[] | null }) {

  if (!transacciones) return null;

  // 1. Calcular la suma total (reduce)
  const balanceTotal = transacciones.reduce((sum, t) => sum + t.monto, 0);

  // 2. Dar formato a la moneda
  const balanceFormato = balanceTotal.toLocaleString('es-ES', { style: 'currency', currency: 'USD' });

  return (
    <div className="bg-blue-600 text-white p-6 rounded-lg shadow-xl mb-8">
      <p className="text-lg font-medium opacity-80">BALANCE TOTAL ACTUAL</p>
      <p className="text-5xl font-extrabold mt-1">
        {balanceFormato}
      </p>
    </div>
  );
}