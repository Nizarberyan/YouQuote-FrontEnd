import type { Author, Quote as QuoteElement } from "./Authors";
export const Quote = ({
  id,
  content,
  author,
  popularity_count,
  user,
  created_at,
  deleted_at,
}: Partial<QuoteElement>) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 border border-gray-200 dark:border-gray-700 max-w-xl mx-auto">
      <p className="text-lg italic text-gray-800 dark:text-gray-200 mb-4">
        "{content}"
      </p>

      <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
        <span className="font-medium">— {author}</span>

        <div className="flex gap-2 flex-wrap">
          <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full text-xs">
            #{id} • {popularity_count} likes
          </span>
          {created_at && (
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full text-xs">
              Created: {new Date(created_at).toLocaleDateString()}
            </span>
          )}
          {deleted_at && (
            <span className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 px-2 py-1 rounded-full text-xs">
              Deleted: {new Date(deleted_at).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
