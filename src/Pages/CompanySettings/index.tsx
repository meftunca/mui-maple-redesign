import { Box, Stack } from "@mui/material";
import React from "react";
import { Outlet, RouteObject } from "react-router-dom";
import CompanySettingsCreateBuilding from "./CreateBuilding";

const subRoutesList = [
  {
    path: "/company-settings/coaching",
    title: "Coaching Competences",
  },
  {
    path: "/company-settings/buildings",
    title: "Buildings",
    element: <CompanySettingsCreateBuilding />,
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
];

const CompanySettingRoutes: RouteObject = {
  path: "/company-settings",
  element: (
    <Stack direction={"row"} gap={4}>
      <Box width="100%">
        <Outlet />
      </Box>
    </Stack>
  ),
  children: subRoutesList,
};

export default CompanySettingRoutes;
