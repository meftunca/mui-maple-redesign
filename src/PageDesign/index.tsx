import MenuIcon from "@mui/icons-material/Menu";
import { FormControlLabel, styled, Switch } from "@mui/material";
import MuiAppBar, { AppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import useThemeController from "../Store/theme";
import AppDrawer from "./AppDrawer";

const drawerWidth = 280;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps & { open: boolean }>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const PageWrapper: React.FC<Props> = (props) => {
  const { current, changeTheme } = useThemeController();
  const [open, setOpen] = React.useState(true);

  const handleDrawerToggle = () => {
    setOpen((f) => !f);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="secondary"
        open={open}
        // sx={{
        //   width: { sm: `calc(100% - ${open ? drawerWidth : 0}px)` },
        //   ml: { sm: `${open ? drawerWidth : 0}px` },
        // }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <FormControlLabel
            label={current}
            control={
              <Switch
                value={current}
                //@ts-ignore
                color="tertiary"
                onChange={() =>
                  changeTheme(current === "Dark" ? "Default" : "Dark")
                }
              />
            }
          />
        </Toolbar>
      </AppBar>
      <AppDrawer open={open} handleDrawerToggle={handleDrawerToggle} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
};

export default PageWrapper;
