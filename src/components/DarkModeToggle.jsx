import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="relative w-14 h-7 flex items-center bg-gray-300 hover:scale-105 dark:bg-gray-700 rounded-full transition-all duration-300 ease-in-out"
    >
      <span
        className={`absolute left-1 top-1 w-5 h-5 bg-white dark:bg-yellow-400 rounded-full shadow-md transform transition-transform duration-300 ${
          darkMode ? "translate-x-7" : ""
        }`}
      ></span>
    </button>
  );
}
