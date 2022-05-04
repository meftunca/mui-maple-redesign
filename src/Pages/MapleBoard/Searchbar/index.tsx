import { Button, Menu, MenuItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import MapleSearchbar from "Components/Searchbar";
import React, { useState } from "react";

const SearchbarSection: React.FC = () => {
  const [filter, setFilter] = useState(0);
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  return (
    <>
      <Typography mb={1.5}>Full Size</Typography>

      <MapleSearchbar />
      <Typography mb={1.5} sx={{ mt: 3 }}>
        With Filter Button
      </Typography>
      <MapleSearchbar
        wrapperProps={{ sx: { width: 300 } }}
        extra={
          <>
            <Button onClick={(e) => setAnchor(e.currentTarget)}>Filter</Button>
            {/* <InputLabel id="demo-simple-select-label">Filter</InputLabel> */}
            <Menu
              anchorEl={anchor}
              id="demo-simple-select"
              open={!!anchor}
              onClose={() => setAnchor(null)}
            >
              <MenuItem onClick={() => setAnchor(null)}>Ten</MenuItem>
              <MenuItem onClick={() => setAnchor(null)}>Twenty</MenuItem>
              <MenuItem onClick={() => setAnchor(null)}>Thirty</MenuItem>
            </Menu>
          </>
        }
      />
      <Typography mb={1.5} sx={{ mt: 3 }}>
        Dense Size
      </Typography>
      <Box display="flex">
        <MapleSearchbar dense wrapperProps={{ sx: { width: 300 } }} />
        <MapleSearchbar
          dense
          wrapperProps={{ sx: { width: 300, ml: 2 } }}
          extra={
            <>
              <Button onClick={(e) => setAnchor(e.currentTarget)}>
                Filter
              </Button>
              {/* <InputLabel id="demo-simple-select-label">Filter</InputLabel> */}
              <Menu
                anchorEl={anchor}
                id="demo-simple-select"
                open={!!anchor}
                onClose={() => setAnchor(null)}
              >
                <MenuItem onClick={() => setAnchor(null)}>Ten</MenuItem>
                <MenuItem onClick={() => setAnchor(null)}>Twenty</MenuItem>
                <MenuItem onClick={() => setAnchor(null)}>Thirty</MenuItem>
              </Menu>
            </>
          }
        />
      </Box>
    </>
  );
};

export default SearchbarSection;
