import { ExpandLess, ExpandMore } from "@mui/icons-material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import {
  Collapse,
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
import { NavigateFunction, useNavigate } from "react-router-dom";

const drawerWidth = 280;
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

type RouteItem = {
  path: string;
  title: string;
  icon?: JSX.Element;
  children?: RouteItem[];
};
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
  {
    path: "/company-settings",
    title: "Company Settings",
    icon: <InboxIcon />,
    children: [
      {
        path: "/company-settings/coaching",
        title: "Coaching Competences",
      },
      {
        path: "/company-settings/buildings",
        title: "Buildings",
      },
      {
        path: "/company-settings/employees",
        title: "Employees",
      },
      {
        path: "/company-settings/users",
        title: "Users",
      },
      {
        path: "/company-settings/departments",
        title: "Departments",
      },
      {
        path: "/company-settings/roles",
        title: "Roles",
      },
      {
        path: "/company-settings/permissions",
        title: "Permissions",
      },
      {
        path: "/company-settings/districts",
        title: "Districts",
      },
      {
        path: "/company-settings/locations",
        title: "Locations",
      },
      {
        path: "/company-settings/regions",
        title: "Regions",
      },
      {
        path: "/company-settings/countries",
        title: "Countries",
      },
    ].sort((a, b) => a.title.localeCompare(b.title)),
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
        {RouteList.map((props, index) => (
          <RenderRouteItem key={index} navigate={navigate} {...props} />
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

const RenderRouteItem = ({
  icon,
  title,
  path,
  children,
  navigate,
}: RouteItem & { navigate: NavigateFunction }) => {
  const [open, setOpen] = React.useState(false);
  if (Array.isArray(children) && children.length > 0) {
    return (
      <>
        <ListItem
          button
          onClick={() => setOpen(!open)}
          key={title}
          selected={open}
        >
          {icon && <ListItemIcon>{icon}</ListItemIcon>}
          <ListItemText primary={title} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List sx={{ paddingLeft: 7 }} component="div" disablePadding>
            {children.map((props, index) => (
              <RenderRouteItem key={index} navigate={navigate} {...props} />
            ))}
          </List>
        </Collapse>
      </>
    );
  }
  return (
    <ListItem button key={path} onClick={() => path && navigate(path)}>
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText primary={title} />
    </ListItem>
  );
};

export default AppDrawer;
