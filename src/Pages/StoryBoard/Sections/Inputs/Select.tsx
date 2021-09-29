import { Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Box } from "@mui/system";
import * as React from "react";

export default function SelectExample() {
  const [variant, setActiveVariant] = React.useState<
    "outlined" | "standard" | "filled" | undefined
  >("outlined");
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" mb={2}>
        Select
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "row", my: 1.5, gap: 1 }}>
        <Chip
          label="Standart"
          onClick={() => setActiveVariant("standard")}
          color={variant === "standard" ? "success" : undefined}
        />
        <Chip
          label="Filled"
          onClick={() => setActiveVariant("filled")}
          color={variant === "filled" ? "success" : undefined}
        />
        <Chip
          label="Outlined"
          variant="outlined"
          onClick={() => setActiveVariant("outlined")}
          color={variant === "outlined" ? "success" : undefined}
        />
      </Box>
      <FormControl variant={variant} sx={{ m: 1, minWidth: 120 }} disabled>
        <InputLabel id="demo-simple-select-disabled-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-disabled-label"
          id="demo-simple-select-disabled"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItems />
        </Select>
        <FormHelperText>Disabled</FormHelperText>
      </FormControl>
      <FormControl variant={variant} sx={{ m: 1, minWidth: 120 }} error>
        <InputLabel id="demo-simple-select-error-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-error-label"
          id="demo-simple-select-error"
          value={age}
          label="Age"
          onChange={handleChange}
          renderValue={(value) => `⚠️  - ${value}`}
        >
          <MenuItems />
        </Select>
        <FormHelperText>Error</FormHelperText>
      </FormControl>
      <FormControl variant={variant} sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-error-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-error-label"
          id="demo-simple-select-error"
          value={age}
          label="Age"
          onChange={handleChange}
          renderValue={(value) => `⚠️  - ${value}`}
        >
          <MenuItems />
        </Select>
        <FormHelperText>With label + helper text</FormHelperText>
      </FormControl>
      <FormControl variant={variant} sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-readonly-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-readonly-label"
          id="demo-simple-select-readonly"
          value={age}
          label="Age"
          onChange={handleChange}
          inputProps={{ readOnly: true }}
        >
          <MenuItems />
        </Select>
        <FormHelperText>Read only</FormHelperText>
      </FormControl>
      <FormControl variant={variant} required sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-required-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={age}
          label="Age *"
          onChange={handleChange}
        >
          <MenuItems />
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>
    </Box>
  );
}

const MenuItems = () => (
  <>
    <MenuItem value="">
      <em>None</em>
    </MenuItem>
    <MenuItem value={10}>Ten</MenuItem>
    <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem>
  </>
);
