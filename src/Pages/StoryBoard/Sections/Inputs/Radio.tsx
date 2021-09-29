import {
  Box,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
} from "@mui/material";
import { pink } from "@mui/material/colors";
import Radio from "@mui/material/Radio";
import * as React from "react";

const label = { inputProps: { "aria-label": "Radio demo" } };
function RadioLabels() {
  return (
    <FormGroup>
      <Typography mb={2}>Group</Typography>
      <FormControlLabel control={<Radio defaultChecked />} label="Label" />
      <FormControlLabel disabled control={<Radio />} label="Disabled" />
    </FormGroup>
  );
}
function SizeRadioButton() {
  const [checked, setChecked] = React.useState<string>("a");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.value);
  };
  return (
    <div>
      <Typography mb={2}>Sizes</Typography>
      <Radio
        {...label}
        checked={checked === "a"}
        onChange={handleChange}
        value="a"
        size="small"
      />
      <Radio
        {...label}
        checked={checked === "b"}
        onChange={handleChange}
        value="b"
      />
      <Radio
        {...label}
        checked={checked === "c"}
        onChange={handleChange}
        value="c"
        sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
      />
    </div>
  );
}
function ColorRadioButton() {
  const [checked, setChecked] = React.useState<string>("a");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.value);
  };
  return (
    <>
      <Typography mb={2}>Colors</Typography>
      <div>
        <Radio
          {...label}
          checked={checked === "a"}
          onChange={handleChange}
          value="a"
        />
        <Radio
          {...label}
          checked={checked === "b"}
          onChange={handleChange}
          value="b"
          color="secondary"
        />
        <Radio
          {...label}
          checked={checked === "c"}
          onChange={handleChange}
          value="c"
          color="success"
        />
        <Radio
          {...label}
          checked={checked === "d"}
          onChange={handleChange}
          value="d"
          color="default"
        />
        <Radio
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
      Radio Button
    </Typography>

    <Grid container>
      <Grid item xs={12} md={6} lg={4}>
        <RadioLabels />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <ColorRadioButton />
      </Grid>{" "}
      <Grid item xs={12} md={6} lg={4}>
        <SizeRadioButton />
      </Grid>
    </Grid>
  </Box>
);
