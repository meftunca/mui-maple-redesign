import { Stack, Typography } from "@mui/material";
import Slider from "@mui/material/Slider";
import { Box } from "@mui/system";
import React from "react";

const marks = [
  {
    value: 0,
    label: "0°C",
  },
  {
    value: 20,
    label: "20°C",
  },
  {
    value: 37,
    label: "37°C",
  },
  {
    value: 100,
    label: "100°C",
  },
];
function valueLabelFormat(value: number) {
  return marks.findIndex((mark) => mark.value === value) + 1;
}

function valuetext(value: number) {
  return `${value}°C`;
}
const minDistance = 10;

// Components

function SliderSizes() {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography mb={2} variant={"subtitle1"}>
        Vertical Slider
      </Typography>
      <Slider
        size="small"
        defaultValue={70}
        aria-label="Small"
        valueLabelDisplay="auto"
      />
      <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
    </Box>
  );
}

function DiscreteSliderLabel() {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography mb={2} variant={"subtitle1"}>
        Discrete Slider
      </Typography>
      <Slider
        aria-label="Always visible"
        defaultValue={80}
        getAriaValueText={valuetext}
        step={10}
        marks={marks}
        valueLabelDisplay="on"
      />
    </Box>
  );
}
function RestrictedSliderLabel() {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography mb={2} variant={"subtitle1"}>
        Restricted Slider
      </Typography>
      <Slider
        aria-label="Restricted values"
        defaultValue={20}
        valueLabelFormat={valueLabelFormat}
        getAriaValueText={valuetext}
        step={null}
        valueLabelDisplay="auto"
        marks={marks}
      />
    </Box>
  );
}

function RangeSlider() {
  const [value, setValue] = React.useState<number[]>([20, 37]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography mb={2} variant={"subtitle1"}>
        Range Slider
      </Typography>
      <Slider
        getAriaLabel={() => "Temperature range"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </Box>
  );
}
function MinimumDistanceSlider() {
  const [value1, setValue1] = React.useState<number[]>([20, 37]);

  const handleChange1 = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };

  const [value2, setValue2] = React.useState<number[]>([20, 37]);

  const handleChange2 = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setValue2([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue2([clamped - minDistance, clamped]);
      }
    } else {
      setValue2(newValue as number[]);
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography mb={2} variant={"subtitle1"}>
        Minimum Distances
      </Typography>
      <Slider
        getAriaLabel={() => "Minimum distance"}
        value={value1}
        onChange={handleChange1}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        disableSwap
      />
      <Slider
        getAriaLabel={() => "Minimum distance shift"}
        value={value2}
        onChange={handleChange2}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        disableSwap
      />
    </Box>
  );
}
function VerticalSlider() {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography mb={2} variant={"subtitle1"}>
        Vertical Slider
      </Typography>
      <Stack sx={{ height: 300 }} spacing={1} direction="row">
        <Slider
          aria-label="Temperature"
          orientation="vertical"
          getAriaValueText={valuetext}
          defaultValue={30}
        />
        <Slider
          aria-label="Temperature"
          orientation="vertical"
          defaultValue={30}
          disabled
        />
        <Slider
          getAriaLabel={() => "Temperature"}
          orientation="vertical"
          getAriaValueText={valuetext}
          defaultValue={[20, 37]}
          marks={marks}
        />
      </Stack>
    </Box>
  );
}
function ColorSlider() {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography mb={2} variant={"subtitle1"}>
        Colors Slider
      </Typography>
      <Slider
        aria-label="Temperature"
        defaultValue={30}
        getAriaValueText={valuetext}
        color="secondary"
      />

      <Slider
        aria-label="Temperature"
        defaultValue={30}
        getAriaValueText={valuetext}
        color="success"
      />
      <Slider
        aria-label="Temperature"
        defaultValue={30}
        getAriaValueText={valuetext}
        color="info"
      />
      <Slider
        aria-label="Temperature"
        defaultValue={30}
        getAriaValueText={valuetext}
        color="error"
      />
      <Slider
        aria-label="Temperature"
        defaultValue={30}
        getAriaValueText={valuetext}
        color="warning"
      />
      <Slider
        aria-label="Temperature"
        defaultValue={30}
        getAriaValueText={valuetext}
        color="tertiary"
      />
    </Box>
  );
}
const SliderExample = () => {
  return (
    <Box sx={{ my: 2 }}>
      <Typography mb={2} variant={"h6"}>
        Slider
      </Typography>
      <ColorSlider />
      <SliderSizes />
      <RestrictedSliderLabel />
      <DiscreteSliderLabel />
      <RangeSlider />
      <MinimumDistanceSlider />
      <VerticalSlider />
    </Box>
  );
};

export default SliderExample;
