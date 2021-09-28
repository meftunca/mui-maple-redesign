import { Theme } from "@mui/material";
import createStore from "zustand";
import DarkTheme from "../Utils/Dark";
import DefaultTheme from "../Utils/Default";

type Mode = "Default" | "Dark";

type ThemeState = {
  themes: {
    Default: Theme;
    Dark: Theme;
  };
  current: Mode;
  changeTheme: (mode: Mode) => void;
};
const getInitialState = (): Mode => {
  let beforeThemeMode = localStorage.getItem("maple:web-theme");
  if (beforeThemeMode === "Default" || beforeThemeMode === "Dark")
    return beforeThemeMode;
  return "Dark";
};

const useThemeController = createStore<ThemeState>((set) => ({
  themes: {
    Default: DefaultTheme,
    Dark: DarkTheme,
  },
  current: getInitialState(),
  changeTheme: (mode) => {
    localStorage.setItem("maple:web-theme", mode);
    set({ current: mode });
  },
}));
export default useThemeController;
