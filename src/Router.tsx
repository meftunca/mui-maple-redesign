import React from "react";
import { BrowserRouter, RouteObject, useRoutes } from "react-router-dom";
import StoryBoardPage from "./Pages/StoryBoard";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <StoryBoardPage />,
  },
];
const GenerateRoutes = () => {
  const renderedRoutes = useRoutes(routes);
  return renderedRoutes;
};
const useCreateRoutes = () => {
  return (
    <BrowserRouter>
      <GenerateRoutes />
    </BrowserRouter>
  );
};

export default useCreateRoutes;
