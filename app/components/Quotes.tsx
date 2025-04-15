import { Quote } from "./Quote";

const quotes = [
  {
    id: 1,
    text: "Le succès n’est pas la clé du bonheur. Le bonheur est la clé du succès.",
    author: "Albert Schweitzer",
    tags: ["inspiration", "motivation"],
  },
  {
    id: 2,
    text: "La vie est un mystère qu’il faut vivre, et non un problème à résoudre.",
    author: "Gandhi",
    tags: ["life", "philosophy"],
  },
  {
    id: 3,
    text: "Croyez en vous et tout devient possible.",
    author: "Unknown",
    tags: ["belief", "mindset"],
  },
  // Add more quotes here
];

export const Quotes = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-10">
        Inspiring Quotes ✨
      </h1>

      <div className="flex flex-col items-center gap-6">
        {quotes.map((quote) => (
          <Quote key={quote.id} quoteId={quote.id} />
        ))}
      </div>
    </div>
  );
};
