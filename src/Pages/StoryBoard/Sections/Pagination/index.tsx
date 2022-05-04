import { Divider, Stack } from "@mui/material";
import React from "react";
import BasicPagination from "./Contained";
import PaginationOutlined from "./Outlined";
import PaginationRanges from "./Ranges";
import PaginationRounded from "./Rounded";
import PaginationSize from "./Sizes";
import TablePaginationDemo from "./Table";

const SectionPagination = () => {
  return (
    <>
      <Stack divider={<Divider sx={{ my: 1 }} />}>
        <BasicPagination />
        <PaginationOutlined />
        <PaginationRounded />
        <PaginationSize />
        <PaginationRanges />
        <TablePaginationDemo />
      </Stack>
    </>
  );
};

export default SectionPagination;
