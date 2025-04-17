import React from "react";
import { Link } from "react-router";

const Welcome: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Welcome to <span className="text-blue-600">YouQuote</span>
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Discover, share, and be inspired by a collection of meaningful quotes.
        </p>
        <div className="space-x-4">
          <Link
            to="/register"
            className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
          <Link
            to="/quotes"
            className="bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300 font-semibold py-3 px-6 rounded-lg shadow hover:bg-gray-300 dark:hover:bg-gray-700 transition"
          >
            Explore Quotes
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-16 w-full max-w-4xl">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Why Choose <span className="text-blue-600">YouQuote</span>?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="text-center bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Inspiring Quotes</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Browse a curated collection of quotes that inspire and motivate.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="text-center bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Share Your Favorites</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Save and share your favorite quotes with friends and family.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="text-center bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Explore Authors</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Discover quotes from your favorite authors and personalities.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="mt-16 text-center">
        <p className="text-lg md:text-xl">
          Ready to get started? Explore the world of quotes now!
        </p>
        <Link
          to="/quotes"
          className="mt-6 inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Browse Quotes
        </Link>
      </section>
    </div>
  );
};

export default Welcome;
