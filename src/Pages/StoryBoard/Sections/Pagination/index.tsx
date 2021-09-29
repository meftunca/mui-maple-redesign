import { Divider, Stack } from "@mui/material";
import ExpandableCard from "PageDesign/ExpandableCard";
import React from "react";
import BasicPagination from "./Contained";
import PaginationOutlined from "./Outlined";
import PaginationRanges from "./Ranges";
import PaginationRounded from "./Rounded";
import PaginationSize from "./Sizes";
import TablePaginationDemo from "./Table";

const SectionPagination = () => {
  return (
    <ExpandableCard title="Pagination">
      <Stack divider={<Divider sx={{ my: 1 }} />}>
        <BasicPagination />
        <PaginationOutlined />
        <PaginationRounded />
        <PaginationSize />
        <PaginationRanges />
        <TablePaginationDemo />
      </Stack>
    </ExpandableCard>
  );
};

export default SectionPagination;
