import axios from "../api/axios";
import { useState } from "react";

const TransactionTable = ({ transactions, refresh }) => {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const deleteTransaction = async (id) => {
    await axios.delete(`/transactions/${id}`);
    refresh();
  };

  const startEdit = (transaction) => {
    setEditingId(transaction._id);
    setEditForm(transaction);
  };

  const saveEdit = async () => {
    await axios.put(
      `/transactions/${editingId}`,
      editForm
    );
    setEditingId(null);
    refresh();
  };

  if (transactions.length === 0)
    return (
      <div className="text-center text-gray-500">
        No transactions found
      </div>
    );

  return (
    <div className="bg-white rounded shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Title</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Category</th>
            <th className="p-3">Date</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t._id} className="border-b">
              <td className="p-3">
                {editingId === t._id ? (
                  <input
                    value={editForm.title}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        title: e.target.value,
                      })
                    }
                  />
                ) : (
                  t.title
                )}
              </td>

              <td className="p-3 text-center">
                {editingId === t._id ? (
                  <input
                    type="number"
                    value={editForm.amount}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        amount: e.target.value,
                      })
                    }
                  />
                ) : (
                  `₹ ${t.amount}`
                )}
              </td>

              <td className="p-3 text-center">
                {editingId === t._id ? (
                  <input
                    value={editForm.category}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        category: e.target.value,
                      })
                    }
                  />
                ) : (
                  t.category
                )}
              </td>

              <td className="p-3 text-center">
                {new Date(t.date).toLocaleDateString()}
              </td>

              <td className="p-3 text-center space-x-2">
                {editingId === t._id ? (
                  <button
                    onClick={saveEdit}
                    className="text-green-600"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => startEdit(t)}
                    className="text-blue-600"
                  >
                    Edit
                  </button>
                )}

                <button
                  onClick={() =>
                    deleteTransaction(t._id)
                  }
                  className="text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
