import {
  Box,List,
  ListItem,
  ListItemText,
  Stack,Typography
} from "@mui/material";
import React from "react";
import { Outlet,RouteObject,useNavigate } from "react-router-dom";
import SectionButton from "./Sections/Button";
import SectionDrawer from "./Sections/Drawer";
import SectionInput from "./Sections/Inputs";
import SectionModal from "./Sections/Modals";
import SectionPagination from "./Sections/Pagination";

const subRoutesList = [
  { path: "/story-board/button", label: "button" },
  { path: "/story-board/modal", label: "modal" },
  { path: "/story-board/drawer", label: "drawer" },
  { path: "/story-board/input", label: "input" },
  { path: "/story-board/pagination", label: "pagination" },
];

const SidebarLinks = () => {
  const navigate = useNavigate();
  return (
    <Box
      position={"sticky"}
      top={100}
      minWidth={200}
      boxShadow={3}
      bgcolor={"background.paper"}
      alignItems="flex-start"
      p={1}
      borderRadius={1.5}
    >
      <List
        subheader={
          <Typography m={2} variant="caption">
            Components
          </Typography>
        }
      >
        {subRoutesList.map(({ path, label }) => (
          <ListItem dense button onClick={() => navigate(path)} id={path}>
            <ListItemText
              primary={label}
              primaryTypographyProps={{ sx: { textTransform: "capitalize" } }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

const StoryBoardRoutes: RouteObject = {
  path: "/story-board",
  element: (
    <Stack direction={"row"} gap={4}>
      <Box width="100%">
        <Outlet />
      </Box>
      <SidebarLinks />
    </Stack>
  ),
  children: [
    {
      path: "/story-board/button",
      element: <SectionButton />,
    },
    {
      path: "/story-board/modal",
      element: <SectionModal />,
    },
    {
      path: "/story-board/drawer",
      element: <SectionDrawer />,
    },
    {
      path: "/story-board/input",
      element: <SectionInput />,
    },
    {
      path: "/story-board/pagination",
      element: <SectionPagination />,
    },
  ],
};

export default StoryBoardRoutes;
