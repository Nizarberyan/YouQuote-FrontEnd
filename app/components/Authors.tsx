import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export type Quote = {
  id: string;
  content: string;
  author: string;
  length: number;
  popularity_count: number;
  created_at: string;
  updated_at: string;
  user: Author;
  deleted_at: string | null;
};
export type Author = {
  id: string;
  name: string;
  email: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
  role: string;
  quotes: Quote[];
};

export const Authors = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/authors`,
        );
        setAuthors(response.data);
      } catch (err) {
        setError("Failed to load authors");
      } finally {
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
        Authors
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {authors.map((author) => (
          <div
            key={author.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden p-4"
          >
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              {author.name}
            </h2>
            <button
              className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
              onClick={() => {
                navigate(/quote/ + author.id);
              }}
            >
              View Quotes
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
