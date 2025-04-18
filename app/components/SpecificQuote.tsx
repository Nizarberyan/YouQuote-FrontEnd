import { useState, useEffect } from "react";
import axios from "axios";
import * as process from "node:process";

interface Quote {
  id: string;
  content: string;
  author: string;
}

interface SpecificQuoteProps {
  quoteId: string;
}

export const SpecificQuote = ({ quoteId }: SpecificQuoteProps) => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/quotes/${quoteId}`,
        );
        setQuote(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch quote");
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, [quoteId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!quote) return <div>No quote found</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <blockquote className="text-xl italic">"{quote.content}"</blockquote>
      <p className="mt-4 text-right font-semibold">- {quote.author}</p>
    </div>
  );
};
