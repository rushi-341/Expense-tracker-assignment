import { useEffect, useState } from "react";
import axios from "../api/axios";

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/dashboard");
      setData(res.data);
    };
    fetchData();
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Total Expense */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-gray-500">Total Expenses</h2>
        <p className="text-3xl font-bold text-blue-600">
          ₹ {data.totalExpense}
        </p>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="font-semibold mb-4">Category Breakdown</h2>
        {Object.entries(data.categoryBreakdown).map(
          ([category, amount]) => (
            <div
              key={category}
              className="flex justify-between border-b py-2"
            >
              <span>{category}</span>
              <span>₹ {amount}</span>
            </div>
          )
        )}
      </div>

      {/* Recent Transactions */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="font-semibold mb-4">
          Recent Transactions
        </h2>

        {data.recentTransactions.map((t) => (
          <div
            key={t._id}
            className="flex justify-between border-b py-2"
          >
            <span>{t.title}</span>
            <span>₹ {t.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
