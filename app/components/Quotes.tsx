import { Quote as QuoteElement } from "./Quote";
import axios from "axios";
import { useState, useEffect } from "react";
import type { Author, Quote } from "./Authors";

export const Quotes = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [userRole, setUserRole] = useState<string>("user");

  const fetchQuotes = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/quotes`,
      );
      setQuotes(
        response.data.map((item: any) => ({
          id: item.quote.id,
          content: item.quote.content,
          author: item.quote.author,
          length: item.quote.length,
          popularity_count: item.quote.popularity_count,
          created_at: item.quote.created_at,
          updated_at: item.quote.updated_at,
          deleted_at: item.quote.deleted_at,
          user: item.quote.user,
        })),
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchQuotes();
    setUserRole(localStorage.getItem("role") || "user");
  }, []);

  return (
    <div className="h-full flex-1 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            <span className="block">Inspiring Quotes</span>
            <span className="block text-blue-600 dark:text-blue-400">✨</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Discover wisdom from great minds across the ages
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-min">
          {quotes.map((quote) => (
            <QuoteElement
              key={quote.id}
              id={quote.id}
              content={quote.content}
              author={quote.author}
              popularity_count={quote.popularity_count}
              user={quote.user}
              {...(userRole === "admin" && {
                created_at: quote.created_at,
                deleted_at: quote.deleted_at,
              })}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
