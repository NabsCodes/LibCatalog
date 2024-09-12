import { useContext, useState, useRef } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import useClickOutside from "../../hooks/useClickOutside";
import { Sun, Moon, Monitor } from "lucide-react";

const ThemeToggle = () => {
  const { theme, setMode } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const handleToggle = (newTheme) => {
    setMode(newTheme);
    setIsOpen(false);
  };

  const themes = [
    { name: "light", icon: Sun, label: "Light" },
    { name: "dark", icon: Moon, label: "Dark" },
    { name: "system", icon: Monitor, label: "System" },
  ];

  const getCurrentTheme = () =>
    themes.find((t) => t.name === theme) || themes[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 rounded-full bg-gray-100 p-2 text-gray-700 transition-all duration-300 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:ring-blue-700"
        aria-label="Theme toggle"
      >
        <CurrentThemeIcon theme={getCurrentTheme()} />
      </button>
      <div
        className={`absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-300 dark:bg-gray-800 ${isOpen ? "scale-100 transform opacity-100" : "pointer-events-none scale-95 transform opacity-0"} `}
      >
        <div
          className="py-1"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="theme-menu"
        >
          {themes.map((t) => (
            <ThemeOption
              key={t.name}
              theme={t}
              isActive={t.name === theme}
              onClick={() => handleToggle(t.name)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const CurrentThemeIcon = ({ theme }) => {
  const Icon = theme.icon;
  return (
    <div className="rounded-full bg-white p-1 shadow-md dark:bg-gray-700">
      <Icon size={20} className="text-gray-800 dark:text-gray-200" />
    </div>
  );
};

const ThemeOption = ({ theme, isActive, onClick }) => {
  const Icon = theme.icon;
  return (
    <button
      className={`flex w-full items-center px-4 py-2 text-sm transition-colors duration-300 ${
        isActive
          ? "bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100"
          : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
      } `}
      onClick={onClick}
    >
      <Icon size={18} className="mr-3" />
      {theme.label}
    </button>
  );
};

export default ThemeToggle;
