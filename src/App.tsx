import { Button, CssBaseline, styled, ThemeProvider } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import useApiStore from "./Core/createAPIStore";
import PageWrapper from "./PageDesign";
import useThemeController from "./Store/theme";
const headers = new Headers();
headers.set("authorization", "cjUu41Px2pixPMn6FElFKVUDTlBhKecU664_nqmRVmA=");
headers.set("x-company", "AAAAAAAAABAAAQAAAAAAAAAA74");
const MyThemeComponent = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
}));
const useBuildingStore = useApiStore({
  createEndPoint: "building",
  updateEndPoint: "building",
  deleteEndPoint: "building",
  readEndPoint: "building",
  headers: headers,
  isPagingEndpoint: false,
});

const App: React.FC = (props) => {
  const { current, themes } = useThemeController();
  const store = useBuildingStore();
  const theme = useMemo(() => {
    return themes[current] || themes.Dark;
  }, [current]);

  useEffect(() => {
    if (store.statuses.reading.fetching === false) store.read();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <MyThemeComponent />
      <Button></Button>
      <CssBaseline />
      <PageWrapper>{props.children}</PageWrapper>
    </ThemeProvider>
  );
};

export default App;
