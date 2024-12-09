import { useContext } from "react";
import { FaRegMoon, FaRegSun } from "react-icons/fa6";
import { ThemeProviderContext } from "../ThemeProvider";
export default function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeProviderContext);

  return (
    <button
      className="w-10 h-10 bg-emerald-500 items-center flex justify-center rounded-full p-2"
      onClick={() => {
        if (theme === "dark") {
          setTheme("light");
        } else if (theme === "light") {
          setTheme("dark");
        } else setTheme("system");
      }}
    >
        {
            theme === "dark" ? <FaRegSun size={24} /> : <FaRegMoon size={24} />
        }
    </button>
  );
}
