import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import {
  Users,
  Quote,
  Trash2,
  UserCheck,
  FileText,
  BookOpen,
  UserCog,
  Archive,
  Trash,
} from "lucide-react";

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
  error?: string;
  details?: string;
}

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [deletedQuotes, setDeletedQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState(0);
  const [axiosAuthHeaders, setAxiosAuthHeaders] = useState<string | null>("");
  const [activeTab, setActiveTab] = useState<
    "overview" | "users" | "quotes" | "deleted"
  >("overview");

  const handleError = (err: unknown) => {
    if (axios.isAxiosError(err)) {
      const axiosError = err as AxiosError<ApiResponse>;
      if (axiosError.response?.data) {
        const data = axiosError.response.data;
        setError(
          `${data.error || "Error"}: ${data.message || "An error occurred"}${
            data.details ? ` (${data.details})` : ""
          }`,
        );
      } else {
        setError(err.message);
      }
    } else {
      setError("An unexpected error occurred");
    }
  };

  const fetchUsers = async () => {
    try {
      const axiosAuthHeaders = localStorage.getItem("authToken");

      const response = await axios.get<ApiResponse>(
        `${import.meta.env.VITE_APP_API_URL}/admin/users`,
        {
          headers: {
            Authorization: `Bearer ${axiosAuthHeaders}`,
          },
        },
      );
      setUsers(response.data.users || []);
      setCount(response.data.count);
      setLoading(false);
    } catch (err) {
      handleError(err);
      setLoading(false);
    }
  };

  const fetchQuotes = async () => {
    try {
      const axiosAuthHeaders = localStorage.getItem("authToken");
      const response = await axios.get<ApiResponse>(
        `${import.meta.env.VITE_APP_API_URL}/admin/quotes`,
        {
          headers: {
            Authorization: `Bearer ${axiosAuthHeaders}`,
          },
        },
      );
      setQuotes(response.data.quotes || []);
    } catch (err) {
      handleError(err);
    }
  };

  const fetchDeletedQuotes = async () => {
    try {
      const axiosAuthHeaders = localStorage.getItem("authToken");
      const response = await axios.get<ApiResponse>(
        `${import.meta.env.VITE_APP_API_URL}/admin/quotes/deleted`,
        {
          headers: {
            Authorization: `Bearer ${axiosAuthHeaders}`,
          },
        },
      );
      setDeletedQuotes(response.data.quotes || []);
    } catch (err) {
      handleError(err);
    }
  };

  const handleChangeRole = async (userId: number, newRole: string) => {
    try {
      const axiosAuthHeaders = localStorage.getItem("authToken");
      await axios.patch(
        `${import.meta.env.VITE_APP_API_URL}/admin/users/${userId}/role`,
        { role: newRole },
        {
          headers: {
            Authorization: `Bearer ${axiosAuthHeaders}`,
          },
        },
      );
      fetchUsers();
    } catch (err) {
      handleError(err);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      const axiosAuthHeaders = localStorage.getItem("authToken");
      await axios.delete(
        `${import.meta.env.VITE_APP_API_URL}/admin/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${axiosAuthHeaders}`,
          },
        },
      );
      fetchUsers();
    } catch (err) {
      handleError(err);
    }
  };

  const handleDeleteQuote = async (quoteId: number) => {
    try {
      const axiosAuthHeaders = localStorage.getItem("authToken");
      await axios.delete(
        `${import.meta.env.VITE_APP_API_URL}/admin/quotes/${quoteId}`,
        {
          headers: {
            Authorization: `Bearer ${axiosAuthHeaders}`,
          },
        },
      );
      fetchQuotes();
      fetchDeletedQuotes();
    } catch (err) {
      handleError(err);
    }
  };

  const handleRestoreQuote = async (quoteId: number) => {
    try {
      const axiosAuthHeaders = localStorage.getItem("authToken");
      await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/admin/quotes/${quoteId}/restore`,
        {},
        {
          headers: {
            Authorization: `Bearer ${axiosAuthHeaders}`,
          },
        },
      );
      fetchQuotes();
      fetchDeletedQuotes();
    } catch (err) {
      handleError(err);
    }
  };

  const handleForceDeleteQuote = async (quoteId: number) => {
    try {
      const axiosAuthHeaders = localStorage.getItem("authToken");
      await axios.delete(
        `${import.meta.env.VITE_APP_API_URL}/admin/quotes/${quoteId}/force`,
        {
          headers: {
            Authorization: `Bearer ${axiosAuthHeaders}`,
          },
        },
      );
      fetchDeletedQuotes();
    } catch (err) {
      handleError(err);
    }
  };

  const handleRestoreAllQuotes = async () => {
    try {
      const axiosAuthHeaders = localStorage.getItem("authToken");
      await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/admin/quotes/restore-all`,
        {},
        {
          headers: {
            Authorization: `Bearer ${axiosAuthHeaders}`,
          },
        },
      );
      fetchQuotes();
      fetchDeletedQuotes();
    } catch (err) {
      handleError(err);
    }
  };

  const handleForceDeleteAllQuotes = async () => {
    try {
      const axiosAuthHeaders = localStorage.getItem("authToken");
      await axios.delete(
        `${import.meta.env.VITE_APP_API_URL}/admin/quotes/force-delete-all`,
        {
          headers: {
            Authorization: `Bearer ${axiosAuthHeaders}`,
          },
        },
      );
      fetchDeletedQuotes();
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchQuotes();
    fetchDeletedQuotes();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <main className="flex-1 p-6">
        <header className="flex items-center justify-between pb-6 border-b dark:border-gray-700">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">
            Admin Dashboard
          </h2>
        </header>

        <nav className="flex space-x-4 mt-6 mb-8 border-b pb-2 dark:border-gray-700">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 transition-all duration-300 rounded-lg focus:outline-none flex items-center gap-2 ${
              activeTab === "overview"
                ? "bg-blue-500 text-white shadow"
                : "bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-300 hover:text-gray-800 dark:hover:bg-gray-700"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`px-4 py-2 transition-all duration-300 rounded-lg focus:outline-none flex items-center gap-2 ${
              activeTab === "users"
                ? "bg-blue-500 text-white shadow"
                : "bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-300 hover:text-gray-800 dark:hover:bg-gray-700"
            }`}
          >
            <UserCog className="w-4 h-4" />
            Users
          </button>
          <button
            onClick={() => setActiveTab("quotes")}
            className={`px-4 py-2 transition-all duration-300 rounded-lg focus:outline-none flex items-center gap-2 ${
              activeTab === "quotes"
                ? "bg-blue-500 text-white shadow"
                : "bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-300 hover:text-gray-800 dark:hover:bg-gray-700"
            }`}
          >
            <Archive className="w-4 h-4" />
            Active Quotes
          </button>
          <button
            onClick={() => setActiveTab("deleted")}
            className={`px-4 py-2 transition-all duration-300 rounded-lg focus:outline-none flex items-center gap-2 ${
              activeTab === "deleted"
                ? "bg-blue-500 text-white shadow"
                : "bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-300 hover:text-gray-800 dark:hover:bg-gray-700"
            }`}
          >
            <Trash className="w-4 h-4" />
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
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transform transition-all hover:scale-105">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                    Total Users
                  </h3>
                  <Users className="w-8 h-8 text-blue-500" />
                </div>
                <p className="text-3xl font-bold text-gray-800 dark:text-white mt-4">
                  {count}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Active accounts on the platform
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transform transition-all hover:scale-105">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                    Active Quotes
                  </h3>
                  <Quote className="w-8 h-8 text-green-500" />
                </div>
                <p className="text-3xl font-bold text-gray-800 dark:text-white mt-4">
                  {quotes.length}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Published quotes in circulation
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transform transition-all hover:scale-105">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                    Deleted Quotes
                  </h3>
                  <Trash2 className="w-8 h-8 text-red-500" />
                </div>
                <p className="text-3xl font-bold text-gray-800 dark:text-white mt-4">
                  {deletedQuotes.length}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Quotes in trash
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transform transition-all hover:scale-105">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                    Verified Users
                  </h3>
                  <UserCheck className="w-8 h-8 text-green-500" />
                </div>
                <p className="text-3xl font-bold text-gray-800 dark:text-white mt-4">
                  {users.filter((u) => u.email_verified_at).length}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Users with verified email
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transform transition-all hover:scale-105">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                    Admin Users
                  </h3>
                  <FileText className="w-8 h-8 text-purple-500" />
                </div>
                <p className="text-3xl font-bold text-gray-800 dark:text-white mt-4">
                  {users.filter((u) => u.role === "admin").length}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Users with admin privileges
                </p>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b dark:border-gray-700">
                <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300">
                  User Management
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {users.map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                          {user.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex justify-end gap-4">
                            <select
                              className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-sm px-3 py-1"
                              value={user.role}
                              onChange={(e) =>
                                handleChangeRole(user.id, e.target.value)
                              }
                            >
                              <option value="user">User</option>
                              <option value="admin">Admin</option>
                            </select>
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "quotes" && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b dark:border-gray-700">
                <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300">
                  Active Quotes
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Content
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Author
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {quotes.map((quote) => (
                      <tr
                        key={quote.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                          {quote.content}
                        </td>
                        <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                          {quote.author}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => handleDeleteQuote(quote.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition-colors"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "deleted" && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b dark:border-gray-700 flex justify-between items-center">
                <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300">
                  Deleted Quotes
                </h3>
                <div className="space-x-4">
                  <button
                    onClick={handleRestoreAllQuotes}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm transition-colors"
                  >
                    Restore All
                  </button>
                  <button
                    onClick={handleForceDeleteAllQuotes}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition-colors"
                  >
                    Delete All Permanently
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Content
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Author
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {deletedQuotes.map((quote) => (
                      <tr
                        key={quote.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                          {quote.content}
                        </td>
                        <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                          {quote.author}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-4">
                            <button
                              onClick={() => handleRestoreQuote(quote.id)}
                              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm transition-colors"
                            >
                              Restore
                            </button>
                            <button
                              onClick={() => handleForceDeleteQuote(quote.id)}
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
