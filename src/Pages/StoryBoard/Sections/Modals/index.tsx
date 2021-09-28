import { Divider, Stack } from "@mui/material";
import ExpandableCard from "PageDesign/ExpandableCard";
import React from "react";
import AddUserDialog from "./Examples/AddUser";
import AlertDialog from "./Examples/Alert";
import ConfirmationDialog from "./Examples/Confirmation";
import FullScreenDialog from "./Examples/FullScreen";
import OptionaSizeDialog from "./Examples/OptionalSize";
import SignUpDialog from "./Examples/SignUp";
const SectionModal = () => {
  return (
    <ExpandableCard title="Dialogs">
      <Stack divider={<Divider sx={{ my: 1 }} />}>
        <AddUserDialog />
        <AlertDialog />
        <SignUpDialog />
        <FullScreenDialog />
        <OptionaSizeDialog />
        <ConfirmationDialog />
      </Stack>
    </ExpandableCard>
  );
};

export default SectionModal;
