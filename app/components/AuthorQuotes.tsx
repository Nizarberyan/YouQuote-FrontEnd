import axios from "axios";
import { useEffect, useState } from "react";

interface AuthorQuotesProps {
  authorId: string;
}

interface Quote {
  id: number;
  content: string;
  created_at: string;
  updated_at: string;
  author: string;
  user_id: number;
  popularity_count: number;
  length: number;
  deleted_at: string | null;
}

interface AuthorResponse {
  author: string;
  quotes: Quote[];
}

export const AuthorQuotes = ({ authorId }: AuthorQuotesProps) => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [authorName, setAuthorName] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        setLoading(true);
        const authToken = localStorage.getItem("authToken");
        const response = await axios.get<AuthorResponse>(
          `${import.meta.env.VITE_APP_API_URL}/authors/${authorId}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          },
        );
        console.log(response.data);
        setQuotes(response.data.quotes);
        setAuthorName(response.data.author);
        setError(null);
      } catch (err) {
        setError("Failed to fetch quotes");
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, [authorId]);

  if (loading) return <div>Loading quotes...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!quotes.length) return <div>No quotes found for this author.</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">{authorName}</h2>
      {quotes.map((quote) => (
        <div
          key={quote.id}
          className="p-4 bg-gray-100 dark:bg-gray-800 rounded"
        >
          <p className="text-lg">{quote.content}</p>
          <span className="text-sm text-gray-500">
            {new Date(quote.updated_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      ))}
    </div>
  );
};
