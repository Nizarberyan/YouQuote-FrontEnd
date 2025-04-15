import { useState } from "react";
import { NavLink } from "react-router";
import { Menu, X } from "lucide-react";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="md:hidden p-3 fixed top-4 left-4 z-50 bg-white dark:bg-gray-800 dark:text-white border rounded shadow"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-md p-4 z-40 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-8">
          YouQuote
        </h1>

        <nav className="flex flex-col space-y-4">
          {["/", "/register", "/login", "/quotes"].map((path, i) => (
            <NavLink
              key={i}
              to={path}
              className={({ isActive }) => {
                return `px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`;
              }}
              onClick={() => setIsOpen(false)}
            >
              {path === "/"
                ? "Accueil"
                : path === "/register"
                  ? "S'inscrire"
                  : path === "/quotes"
                    ? "Citations"
                    : "Se connecter"}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};
