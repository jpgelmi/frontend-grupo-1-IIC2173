import React from "react";
import { Menu, Sun, Moon } from "lucide-react"; // Asegúrate de que la ruta sea correcta

const Header = ({ setSidebarOpen, sidebarOpen, toggleTheme, theme }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        </button>

        {/* Agregamos una etiqueta con el nombre de la app con margin-top = 10px */}
        <h1 className="text-xl font-bold text-gray-800 dark:text-white mt-2">
          ⚽ CoolGoat
        </h1>
        
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          disabled // Esactivado hasta que se implemente la funcionalidad en toda la app
        >
          {theme === 'dark' ? (
            <Sun className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          ) : (
            <Moon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
