import { Search } from "@mui/icons-material";
import {
  Divider,
  IconButton,
  InputBase,
  InputBaseProps,
  Paper,
  PaperProps,
  Stack,
} from "@mui/material";
import { styled } from "@mui/system";
import React from "react";

export type SearchbarProps = {
  dense?: boolean;
  wrapperProps?: PaperProps;
  inputProps?: InputBaseProps;
  extra?: React.ReactNode;
};

const SearchbarPaper = styled(Paper)<{ dense: boolean }>(
  ({ theme, dense }) => ({
    padding: `${theme.spacing(dense ? 0.5 : 1.25)} ${theme.spacing(
      dense ? 1 : 2
    )}`,
  })
);

const MapleSearchbar: React.FC<SearchbarProps> = ({
  dense,
  wrapperProps = {},
  inputProps = {},
  extra,
}) => {
  return (
    <SearchbarPaper elevation={4} dense={dense} {...wrapperProps}>
      <Stack
        flexDirection="row"
        alignItems="center"
        divider={
          <Divider
            orientation="vertical"
            sx={{ height: dense ? 20 : 30, mx: dense ? 1 : 2 }}
          />
        }
      >
        <IconButton>
          <Search />
        </IconButton>
        <InputBase
          placeholder="Search"
          sx={{ px: dense ? 0.5 : 1.5, py: dense ? 0.5 : 1, flex: 1 }}
          {...inputProps}
        />
        {extra}
      </Stack>
    </SearchbarPaper>
  );
};

export default MapleSearchbar;
