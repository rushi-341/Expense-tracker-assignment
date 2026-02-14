import { useEffect, useState } from "react";
import axios from "../api/axios";
import TransactionTable from "../components/TransactionTable";
import Pagination from "../components/Pagination";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const [filters, setFilters] = useState({
    search: "",
    category: "",
  });

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    notes: "",
  });

  const fetchTransactions = async () => {
    const res = await axios.get("/transactions", {
      params: { ...filters, page },
    });

    setTransactions(res.data.data);
    setPages(res.data.pages);
  };

  useEffect(() => {
    fetchTransactions();
  }, [page, filters]);

  const handleAdd = async (e) => {
    e.preventDefault();
    await axios.post("/transactions", form);
    setForm({
      title: "",
      amount: "",
      category: "",
      date: "",
      notes: "",
    });
    fetchTransactions();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Transactions
      </h1>

      {/* Add Transaction Form */}
      <form
        onSubmit={handleAdd}
        className="bg-white p-6 rounded shadow mb-6 grid grid-cols-5 gap-4"
      >
        <input
          placeholder="Title"
          className="border p-2 rounded"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          required
        />

        <input
          type="number"
          placeholder="Amount"
          className="border p-2 rounded"
          value={form.amount}
          onChange={(e) =>
            setForm({ ...form, amount: e.target.value })
          }
          required
        />

        <input
          placeholder="Category"
          className="border p-2 rounded"
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
          required
        />

        <input
          type="date"
          className="border p-2 rounded"
          value={form.date}
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })
          }
          required
        />

        <button className="bg-blue-600 text-white rounded">
          Add
        </button>
      </form>

      {/* Filters */}
      <div className="bg-white p-4 rounded shadow mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="border p-2 rounded"
          onChange={(e) =>
            setFilters({ ...filters, search: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Category"
          className="border p-2 rounded"
          onChange={(e) =>
            setFilters({ ...filters, category: e.target.value })
          }
        />
      </div>

      <TransactionTable
        transactions={transactions}
        refresh={fetchTransactions}
      />

      <Pagination page={page} pages={pages} setPage={setPage} />
    </div>
  );
};

export default Transactions;
