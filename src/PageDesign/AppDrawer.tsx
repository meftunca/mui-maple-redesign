import InboxIcon from "@mui/icons-material/MoveToInbox";
import {
  CSSObject,
  styled,
  Theme,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("all", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("all", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  paddingLeft: 3,
  width: `calc(${theme.spacing(8)} + 3px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 3px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const RouteList = [
  {
    path: "/story-board",
    title: "StoryBoard",
    icon: <InboxIcon />,
  },
  {
    path: "/maple-board",
    title: "Maple Board",
    icon: <InboxIcon />,
  },
];

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  open: boolean;
  handleDrawerToggle: () => void;
}

const AppDrawer: React.FC<Props> = ({ open, handleDrawerToggle }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {RouteList.map(({ icon, title, path }, index) => (
          <ListItem button key={path} onClick={() => navigate(path)}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={title} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Drawer variant={"permanent"} open={open} onClose={handleDrawerToggle}>
      {drawer}
    </Drawer>
  );
};

export default AppDrawer;
