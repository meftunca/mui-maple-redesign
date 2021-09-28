import { CssBaseline, ThemeProvider } from "@mui/material";
import { useMemo } from "react";
import PageWrapper from "./PageDesign";
import useCreateRoutes from "./Router";
import useThemeController from "./Store/theme";

function App() {
  const routes = useCreateRoutes();
  const { current, themes } = useThemeController();

  const theme = useMemo(() => {
    return themes[current] || themes.Dark;
  }, [current]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PageWrapper>{routes}</PageWrapper>
    </ThemeProvider>
  );
}

export default App;
