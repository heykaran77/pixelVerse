import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = ({ isDarkMode, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="p-2 text-light-text dark:text-dark-text hover:text-light-pink dark:hover:text-dark-pink transition-colors"
      aria-label="Toggle theme"
    >
      {isDarkMode ? (
        <FaSun className="w-5 h-5" />
      ) : (
        <FaMoon className="w-5 h-5" />
      )}
    </button>
  );
};

export default ThemeToggle;
