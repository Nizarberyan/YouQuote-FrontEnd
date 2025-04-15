import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
interface User {
  email: string;
  password: string;
}
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const loginUrl = import.meta.env.VITE_APP_API_URL;

  const attemptLogin = async (user: User) => {
    try {
      const response = await axios.post(`${loginUrl}/login`, {
        email: user.email,
        password: user.password,
      });

      if (response.status === 200) {
        const { token, user } = response.data;
        localStorage.setItem("authToken", token);
        localStorage.setItem("user", JSON.stringify(user));

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        console.log(`login successful ${user.name}`);
      }
    } catch (error: any) {
      if (error.response) {
        const errorData = error.response.data;
        setError(errorData.message);
      } else {
        alert("An error occurred during Login.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center items-center">
      <form className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-6 w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
          Se connecter
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded-md text-center">
            {error}
          </div>
        )}

        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Adresse e-mail
          </label>
          <input
            type="email"
            name="email"
            placeholder="exemple@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Mot de passe
          </label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
          onClick={(e) => {
            e.preventDefault();
            attemptLogin({ email, password });
          }}
        >
          Se connecter
        </button>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Pas encore de compte ?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            S'inscrire
          </a>
        </p>
      </form>
    </div>
  );
};
