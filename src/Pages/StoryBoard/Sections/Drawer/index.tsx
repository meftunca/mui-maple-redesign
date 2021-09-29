import { Divider, Stack } from "@mui/material";
import ExpandableCard from "PageDesign/ExpandableCard";
import React from "react";
import DrawerListExample from "./List";
import PersistentDrawerLeft from "./Persistant";
import DrawerSwipeableList from "./SwipeableList";

const SectionDrawer = () => {
  return (
    <ExpandableCard title="Drawer">
      <Stack divider={<Divider sx={{ my: 1 }} />}>
        <DrawerListExample />
        <DrawerSwipeableList />
        <PersistentDrawerLeft />
      </Stack>
    </ExpandableCard>
  );
};

export default SectionDrawer;
