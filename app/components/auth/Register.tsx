import axios from "axios";
import { useState } from "react";

export const Register = () => {
  interface User {
    name: string;
    email: string;
    password: string;
  }

  const registerUrl = import.meta.env.VITE_APP_API_URL;

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const attemptRegister = async (user: User) => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(`${registerUrl}/register`, {
        name: user.name,
        email: user.email,
        password: user.password,
        password_confirmation: confirmPassword,
      });

      if (response.status === 201) {
        const data = response.data;
        alert("Registration successful!");
        console.log("User registered:", data.user);
      }
    } catch (error: any) {
      if (error.response) {
        const errorData = error.response.data;
        alert(`Registration failed: ${errorData.message}`);
      } else {
        alert("An error occurred during registration.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
          Créer un compte
        </h2>

        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Nom complet
          </label>
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

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
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Confirmer le mot de passe
          </label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
          onClick={(e) => {
            e.preventDefault();
            attemptRegister({ name, email, password });
          }}
        >
          S'inscrire
        </button>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Déjà un compte ?{" "}
          <a
            href="/login"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Se connecter
          </a>
        </p>
      </form>
    </div>
  );
};
