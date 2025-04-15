export const Quote = ({ quoteId }: any) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 max-w-xl mx-auto">
      <p className="text-lg italic text-gray-800 mb-4">
        “Le succès n’est pas la clé du bonheur. Le bonheur est la clé du
        succès.”
      </p>

      <div className="flex justify-between items-center text-sm text-gray-600">
        <span className="font-medium">— Albert Schweitzer</span>

        <div className="flex gap-2 flex-wrap">
          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
            #inspiration post id: {quoteId}
          </span>
          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
            #motivation
          </span>
        </div>
      </div>
    </div>
  );
};
