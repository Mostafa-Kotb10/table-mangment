import { prisma } from "@/lib/prisma";

type ProductForecast = {
  product: string;
  current: number;
  reserved: number;
  forecasted: number;
  available: number;
};

export default async function Dashboard() {
  const products = await prisma.product.findMany({
    include: {
      structures: {
        include: {
          structure: true,
        },
      },
      transactions: true,
    },
  });

  // Calculate forecast and reserved quantities
  const data: ProductForecast[] = products.map((p) => {
    const reserved = p.structures.reduce(
      (acc, ps) => acc + ps.quantity * ps.structure.table.length,
      0
    );

    const transactionSum = p.transactions.reduce((acc, t) => acc + t.quantity, 0);

    const current = p.quantity;
    const forecasted = current + transactionSum - reserved;
    const available = current - reserved;

    return {
      product: p.name,
      current,
      reserved,
      forecasted,
      available,
    };
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Forecast Dashboard</h2>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Product</th>
            <th className="border p-2">Current</th>
            <th className="border p-2">Reserved</th>
            <th className="border p-2">Forecasted</th>
            <th className="border p-2">Available</th>
          </tr>
        </thead>
        <tbody>
          {data.map((p) => (
            <tr key={p.product}>
              <td className="border p-2">{p.product}</td>
              <td className="border p-2">{p.current}</td>
              <td className="border p-2">{p.reserved}</td>
              <td className="border p-2">{p.forecasted}</td>
              <td className="border p-2">{p.available}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}