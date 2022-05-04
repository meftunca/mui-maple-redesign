import { Divider, Stack } from "@mui/material";
import React from "react";
import AddUserDialog from "./Examples/AddUser";
import AlertDialog from "./Examples/Alert";
import ConfirmationDialog from "./Examples/Confirmation";
import FullScreenDialog from "./Examples/FullScreen";
import OptionaSizeDialog from "./Examples/OptionalSize";
import SignUpDialog from "./Examples/SignUp";
const SectionModal = () => {
  return (
    <>
      <Stack divider={<Divider sx={{ my: 1 }} />}>
        <AddUserDialog />
        <AlertDialog />
        <SignUpDialog />
        <FullScreenDialog />
        <OptionaSizeDialog />
        <ConfirmationDialog />
      </Stack>
    </>
  );
};

export default SectionModal;
