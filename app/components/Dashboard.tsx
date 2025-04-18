import React from "react";
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
}

const Dashboard: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Main Content */}
      <main className="flex-1 p-6">
        <header className="flex items-center justify-between pb-6 border-b dark:border-gray-700">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">
            Welcome to the Dashboard
          </h2>
        </header>

        <section className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Users
              </h3>
              <p className="text-2xl font-semibold text-gray-800 dark:text-white mt-4">
                1,200
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Sales
              </h3>
              <p className="text-2xl font-semibold text-gray-800 dark:text-white mt-4">
                $45,000
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Bounce Rate
              </h3>
              <p className="text-2xl font-semibold text-gray-800 dark:text-white mt-4">
                16.2%
              </p>
            </div>
          </div>

          {/* Table */}
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-4 border-b dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Recent Activities
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
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                  <td className="p-4 text-gray-700 dark:text-gray-300">
                    John Doe
                  </td>
                  <td className="p-4 text-gray-700 dark:text-gray-300">
                    Admin
                  </td>
                  <td className="p-4 text-green-600 font-medium">Active</td>
                </tr>
                <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                  <td className="p-4 text-gray-700 dark:text-gray-300">
                    Jane Smith
                  </td>
                  <td className="p-4 text-gray-700 dark:text-gray-300">
                    Editor
                  </td>
                  <td className="p-4 text-yellow-600 font-medium">Pending</td>
                </tr>
                <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                  <td className="p-4 text-gray-700 dark:text-gray-300">
                    Alice Johnson
                  </td>
                  <td className="p-4 text-gray-700 dark:text-gray-300">
                    Viewer
                  </td>
                  <td className="p-4 text-red-600 font-medium">Inactive</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
