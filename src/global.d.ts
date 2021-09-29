import "@mui/material";
declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    dashed: true;
  }
  interface ButtonPropsColorOverrides {
    tertiary: Palette["primary"];
  }
}
declare module "@mui/material/Slider" {
  interface SliderPropsColorOverrides {
    tertiary: Palette["primary"];
    warning: Palette["warning"];
    error: Palette["error"];
    info: Palette["info"];
    success: Palette["success"];
  }
}
declare module "@mui/material/styles" {
  interface Palette {
    tertiary: Palette["primary"];
  }
  interface PaletteOptions {
    tertiary: PaletteOptions["primary"];
  }
}
