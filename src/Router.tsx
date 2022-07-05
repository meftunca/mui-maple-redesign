import CompanySettingRoutes from "Pages/CompanySettings";
import MapleBoard from "Pages/MapleBoard";
import React from "react";
import { BrowserRouter, RouteObject, useRoutes } from "react-router-dom";
import App from "./App";
import StoryBoardRoutes from "./Pages/StoryBoard";

const routes: RouteObject[] = [
  StoryBoardRoutes,
  MapleBoard,
  CompanySettingRoutes,
];
const GenerateRoutes = () => {
  const renderedRoutes = useRoutes(routes);
  return renderedRoutes;
};
const Router = () => {
  return (
    <BrowserRouter basename={import.meta.env.PROD ? "mui-maple-redesign" : ""}>
      <App>
        <GenerateRoutes />
      </App>
    </BrowserRouter>
  );
};

export default Router;
