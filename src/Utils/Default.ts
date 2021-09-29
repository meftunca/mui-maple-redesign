import { createTheme, responsiveFontSizes } from "@mui/material";
import { blue, blueGrey } from "@mui/material/colors";

const colors = [
  "primary",
  // "inherit",
  "tertiary",
  "secondary",
  "warning",
  "success",
  "error",
  "info",
];

const paletteColors = {
  primary: {
    light: "#ad2c23",
    main: "#992040",
    dark: "#7f131b",
  },
  success: {
    light: "#81c784",
    main: "#66bb6a",
    dark: "#388e3c",
  },
  error: {
    light: "#e57373",
    main: "#f44336",
    dark: "#d32f2f",
  },
  info: {
    light: blue["400"],
    main: blue["500"],
    dark: blue["800"],
  },
  secondary: {
    light: blueGrey["400"],
    main: blueGrey["500"],
    dark: blueGrey["800"],
  },
  warning: {
    light: "#ffb74d",
    main: "#ffa726",
    dark: "#f57c00",
  },
  tertiary: {
    light: "#D6C0AA",
    main: "#c4a78a",
    dark: "#CAA47E",
    contrastText: "white",
  },
};

const DefaultTheme = (mode: "light" | "dark") =>
  responsiveFontSizes(
    createTheme({
      palette: { ...paletteColors, mode },
      shape: {
        borderRadius: 12,
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: 6,
              margin: 2,
            },
          },
          //@ts-ignore
          variants: [
            ...colors.map((a) => ({
              props: { variant: "dashed", color: a },
              style: {
                border: "1px dashed " + paletteColors[a].main,
                color: paletteColors[a].main,
              },
            })),
          ],
        },
      },
    })
  );

export const themeGenerator = DefaultTheme;

export default DefaultTheme("light");
