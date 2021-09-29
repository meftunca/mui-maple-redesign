import {
  Box,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { pink } from "@mui/material/colors";
import * as React from "react";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
function CheckboxLabels() {
  return (
    <FormGroup>
      <Typography mb={2}>Group</Typography>
      <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
      <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
    </FormGroup>
  );
}
function SizeCheckboxes() {
  return (
    <div>
      <Typography mb={2}>Sizes</Typography>
      <Checkbox {...label} defaultChecked size="small" />
      <Checkbox {...label} defaultChecked />
      <Checkbox
        {...label}
        defaultChecked
        sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
      />
    </div>
  );
}
function ColorCheckboxes() {
  return (
    <>
      <Typography mb={2}>Colors</Typography>
      <div>
        <Checkbox {...label} defaultChecked />
        <Checkbox {...label} defaultChecked color="secondary" />
        <Checkbox {...label} defaultChecked color="success" />
        <Checkbox {...label} defaultChecked color="default" />
        <Checkbox
          {...label}
          defaultChecked
          sx={{
            color: pink[800],
            "&.Mui-checked": {
              color: pink[600],
            },
          }}
        />
      </div>
    </>
  );
}

export default () => (
  <Box sx={{ my: 2 }}>
    <Typography variant="h6" mb={3}>
      Checkbox
    </Typography>

    <Grid container>
      <Grid item xs={12} md={6} lg={4}>
        <ColorCheckboxes />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <CheckboxLabels />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <SizeCheckboxes />
      </Grid>
    </Grid>
  </Box>
);
