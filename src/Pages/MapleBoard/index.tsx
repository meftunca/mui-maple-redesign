import {
  Box,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Outlet, RouteObject, useNavigate } from "react-router-dom";
import SearchbarSection from "./Searchbar";

const subRoutesList = [
  { path: "/maple-board/searchbar", label: "maple searchbar" },
  // { path: "/storyboard/modal", label: "modal" },
  // { path: "/storyboard/drawer", label: "drawer" },
  // { path: "/storyboard/input", label: "input" },
  // { path: "/storyboard/pagination", label: "pagination" },
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

const MapleBoardRoutes: RouteObject = {
  path: "/maple-board",
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
      path: "/maple-board/searchbar",
      element: <SearchbarSection />,
      index: true,
    },
  ],
};

export default MapleBoardRoutes;
