import { useState, useEffect, useMemo } from "react";
import { NavLink, useNavigate } from "react-router";
import { Menu, X } from "lucide-react";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string>("user");
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token: string | null = localStorage.getItem("authToken");
      setIsLoggedIn(!!token);
    }
    setUserRole(localStorage.getItem("role") || "user");
  }, []);

  const logOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const routes = useMemo(() => {
    if (isLoggedIn) {
      return [
        { path: "/", label: "Home" },
        { path: "/quotes", label: "Quotes" },
        { path: "/authors", label: "Authors" },
        { path: "/dashboard", label: "Dashboard", isPrivate: true },
      ];
    } else {
      return [
        { path: "/", label: "Home" },
        { path: "/register", label: "Register" },
        { path: "/login", label: "Login" },
      ];
    }
  }, [isLoggedIn]);

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="md:hidden p-3 fixed top-4 left-4 z-50 bg-white dark:bg-gray-800 dark:text-white border rounded shadow"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-md p-4 z-40 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-8">
          YouQuote
        </h1>

        <nav className="flex flex-col space-y-4">
          {routes
            .filter(({ isPrivate }) => !isPrivate || userRole === "admin")
            .map(({ path, label }, i) => (
              <NavLink
                key={i}
                to={path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                {label}
              </NavLink>
            ))}
        </nav>

        {isLoggedIn && (
          <div className="mt-8 border-t dark:border-gray-700">
            <button
              onClick={logOut}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
            >
              Log Out
            </button>
          </div>
        )}
      </aside>
    </>
  );
};
