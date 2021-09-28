import { createTheme } from "@mui/material";
import { deepmerge } from "@mui/utils";
import DefaultTheme, { themeGenerator } from "./Default";

const DarkTheme = themeGenerator("dark");

export default DarkTheme;
