import { Divider, Stack } from "@mui/material";
import React from "react";
import DrawerListExample from "./List";
import PersistentDrawerLeft from "./Persistant";
import DrawerSwipeableList from "./SwipeableList";

const SectionDrawer = () => {
  return (
    <>
      <Stack divider={<Divider sx={{ my: 1 }} />}>
        <DrawerListExample />
        <DrawerSwipeableList />
        <PersistentDrawerLeft />
      </Stack>
    </>
  );
};

export default SectionDrawer;
