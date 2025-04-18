import React, { useState, useEffect } from "react";
import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
}

interface Quote {
  id: number;
  content: string;
  author: string;
  user: User;
  deleted_at: string | null;
}

interface ApiResponse {
  message: string;
  count: number;
  users?: User[];
  quotes?: Quote[];
}

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [deletedQuotes, setDeletedQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState(0);
  const [activeTab, setActiveTab] = useState<
    "overview" | "users" | "quotes" | "deleted"
  >("overview");

  useEffect(() => {
    fetchUsers();
    fetchQuotes();
    fetchDeletedQuotes();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get<ApiResponse>(
        `${import.meta.env.VITE_APP_API_URL}/admin/users`,
      );
      setUsers(response.data.users || []);
      setCount(response.data.count);
      setLoading(false);
    } catch (err) {
      setError("Failed to load users");
      setLoading(false);
    }
  };

  const fetchQuotes = async () => {
    try {
      const response = await axios.get<ApiResponse>(
        `${import.meta.env.VITE_APP_API_URL}/admin/quotes`,
      );
      setQuotes(response.data.quotes || []);
    } catch (err) {
      setError("Failed to load quotes");
    }
  };

  const fetchDeletedQuotes = async () => {
    try {
      const response = await axios.get<ApiResponse>(
        `${import.meta.env.VITE_APP_API_URL}/admin/quotes/deleted`,
      );
      setDeletedQuotes(response.data.quotes || []);
    } catch (err) {
      setError("Failed to load deleted quotes");
    }
  };

  const handleChangeRole = async (userId: number, newRole: string) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_APP_API_URL}/admin/users/${userId}/role`,
        { role: newRole },
      );
      fetchUsers();
    } catch (err) {
      setError("Failed to update user role");
    }
  };

  const handleDeleteQuote = async (quoteId: number) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_APP_API_URL}/admin/quotes/${quoteId}`,
      );
      fetchQuotes();
      fetchDeletedQuotes();
    } catch (err) {
      setError("Failed to delete quote");
    }
  };

  const handleRestoreQuote = async (quoteId: number) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/admin/quotes/${quoteId}/restore`,
      );
      fetchQuotes();
      fetchDeletedQuotes();
    } catch (err) {
      setError("Failed to restore quote");
    }
  };

  const handleForceDeleteQuote = async (quoteId: number) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_APP_API_URL}/admin/quotes/${quoteId}/force`,
      );
      fetchDeletedQuotes();
    } catch (err) {
      setError("Failed to permanently delete quote");
    }
  };

  const handleRestoreAllQuotes = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/admin/quotes/restore-all`,
      );
      fetchQuotes();
      fetchDeletedQuotes();
    } catch (err) {
      setError("Failed to restore all quotes");
    }
  };

  const handleForceDeleteAllQuotes = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_APP_API_URL}/admin/quotes/force-delete-all`,
      );
      fetchDeletedQuotes();
    } catch (err) {
      setError("Failed to permanently delete all quotes");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <main className="flex-1 p-6">
        <header className="flex items-center justify-between pb-6 border-b dark:border-gray-700">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">
            Admin Dashboard
          </h2>
        </header>

        <nav className="flex space-x-4 mt-6 mb-8 border-b dark:border-gray-700 pb-2">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 rounded-lg ${activeTab === "overview" ? "bg-blue-500 text-white" : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`px-4 py-2 rounded-lg ${activeTab === "users" ? "bg-blue-500 text-white" : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"}`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab("quotes")}
            className={`px-4 py-2 rounded-lg ${activeTab === "quotes" ? "bg-blue-500 text-white" : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"}`}
          >
            Active Quotes
          </button>
          <button
            onClick={() => setActiveTab("deleted")}
            className={`px-4 py-2 rounded-lg ${activeTab === "deleted" ? "bg-blue-500 text-white" : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"}`}
          >
            Deleted Quotes
          </button>
        </nav>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
            {error}
          </div>
        )}
        <section className="mt-8">
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  Users
                </h3>
                <p className="text-2xl font-semibold text-gray-800 dark:text-white mt-4">
                  {count}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  Active Quotes
                </h3>
                <p className="text-2xl font-semibold text-gray-800 dark:text-white mt-4">
                  {quotes.length}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  Deleted Quotes
                </h3>
                <p className="text-2xl font-semibold text-gray-800 dark:text-white mt-4">
                  {deletedQuotes.length}
                </p>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
              <div className="p-4 border-b dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  User Management
                </h3>
              </div>
              <table className="min-w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left font-medium text-gray-700 dark:text-gray-300 p-4 border-b dark:border-gray-700">
                      Name
                    </th>
                    <th className="text-left font-medium text-gray-700 dark:text-gray-300 p-4 border-b dark:border-gray-700">
                      Role
                    </th>
                    <th className="text-left font-medium text-gray-700 dark:text-gray-300 p-4 border-b dark:border-gray-700">
                      Email
                    </th>
                    <th className="text-left font-medium text-gray-700 dark:text-gray-300 p-4 border-b dark:border-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="p-4 text-center">
                        Loading...
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan={4} className="p-4 text-center text-red-600">
                        {error}
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <td className="p-4 text-gray-700 dark:text-gray-300">
                          {user.name}
                        </td>
                        <td className="p-4 text-gray-700 dark:text-gray-300">
                          {user.role}
                        </td>
                        <td className="p-4 text-gray-700 dark:text-gray-300">
                          {user.email}
                        </td>
                        <td className="p-4 text-gray-700 dark:text-gray-300">
                          <select
                            className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-2 py-1"
                            value={user.role}
                            onChange={(e) =>
                              handleChangeRole(user.id, e.target.value)
                            }
                          >
                            <option value="user">User</option>
                            <option value="moderator">Moderator</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "quotes" && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
              <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  Active Quotes
                </h3>
              </div>
              <table className="min-w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left font-medium text-gray-700 dark:text-gray-300 p-4 border-b dark:border-gray-700">
                      Content
                    </th>
                    <th className="text-left font-medium text-gray-700 dark:text-gray-300 p-4 border-b dark:border-gray-700">
                      Author
                    </th>
                    <th className="text-left font-medium text-gray-700 dark:text-gray-300 p-4 border-b dark:border-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {quotes.map((quote) => (
                    <tr
                      key={quote.id}
                      className="hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <td className="p-4 text-gray-700 dark:text-gray-300">
                        {quote.content}
                      </td>
                      <td className="p-4 text-gray-700 dark:text-gray-300">
                        {quote.author}
                      </td>
                      <td className="p-4 text-gray-700 dark:text-gray-300">
                        <button
                          onClick={() => handleDeleteQuote(quote.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "deleted" && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
              <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  Deleted Quotes
                </h3>
                <div className="space-x-2">
                  <button
                    onClick={handleRestoreAllQuotes}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Restore All
                  </button>
                  <button
                    onClick={handleForceDeleteAllQuotes}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete All Permanently
                  </button>
                </div>
              </div>
              <table className="min-w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left font-medium text-gray-700 dark:text-gray-300 p-4 border-b dark:border-gray-700">
                      Content
                    </th>
                    <th className="text-left font-medium text-gray-700 dark:text-gray-300 p-4 border-b dark:border-gray-700">
                      Author
                    </th>
                    <th className="text-left font-medium text-gray-700 dark:text-gray-300 p-4 border-b dark:border-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {deletedQuotes.map((quote) => (
                    <tr
                      key={quote.id}
                      className="hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <td className="p-4 text-gray-700 dark:text-gray-300">
                        {quote.content}
                      </td>
                      <td className="p-4 text-gray-700 dark:text-gray-300">
                        {quote.author}
                      </td>
                      <td className="p-4 text-gray-700 dark:text-gray-300 space-x-2">
                        <button
                          onClick={() => handleRestoreQuote(quote.id)}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        >
                          Restore
                        </button>
                        <button
                          onClick={() => handleForceDeleteQuote(quote.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Delete Permanently
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
