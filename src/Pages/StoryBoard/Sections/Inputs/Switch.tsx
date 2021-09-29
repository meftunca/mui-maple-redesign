import {
  Box,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
} from "@mui/material";
import { pink } from "@mui/material/colors";
import Switch from "@mui/material/Switch";
import * as React from "react";

const label = { inputProps: { "aria-label": "Switch demo" } };
function SwitchLabels() {
  return (
    <FormGroup>
      <Typography mb={2}>Group</Typography>
      <FormControlLabel control={<Switch defaultChecked />} label="Label" />
      <FormControlLabel disabled control={<Switch />} label="Disabled" />
    </FormGroup>
  );
}
function SizeSwitchButton() {
  const [checked, setChecked] = React.useState<string>("a");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.value);
  };
  return (
    <div>
      <Typography mb={2}>Sizes</Typography>
      <Switch
        {...label}
        checked={checked === "a"}
        onChange={handleChange}
        value="a"
        size="small"
      />
      <Switch
        {...label}
        checked={checked === "b"}
        onChange={handleChange}
        value="b"
      />
      <Switch
        {...label}
        checked={checked === "c"}
        onChange={handleChange}
        value="c"
        sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
      />
    </div>
  );
}
function ColorSwitchButton() {
  const [checked, setChecked] = React.useState<string>("a");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.value);
  };
  return (
    <>
      <Typography mb={2}>Colors</Typography>
      <div>
        <Switch
          {...label}
          checked={checked === "a"}
          onChange={handleChange}
          value="a"
        />
        <Switch
          {...label}
          checked={checked === "b"}
          onChange={handleChange}
          value="b"
          color="secondary"
        />
        <Switch
          {...label}
          checked={checked === "c"}
          onChange={handleChange}
          value="c"
          color="success"
        />
        <Switch
          {...label}
          checked={checked === "d"}
          onChange={handleChange}
          value="d"
          color="default"
        />
        <Switch
          {...label}
          checked={checked === "e"}
          onChange={handleChange}
          value="e"
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
      Switch Button
    </Typography>

    <Grid container>
      <Grid item xs={12} md={6} lg={4}>
        <SwitchLabels />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <ColorSwitchButton />
      </Grid>{" "}
      <Grid item xs={12} md={6} lg={4}>
        <SizeSwitchButton />
      </Grid>
    </Grid>
  </Box>
);
