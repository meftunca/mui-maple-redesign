import { Divider, Stack } from "@mui/material";
import ExpandableCard from "PageDesign/ExpandableCard";
import React from "react";
import CheckboxesScreen from "./Checkbox";
import RadioScreen from "./Radio";
import BasicRatingScreen from "./Rating";
import SelectExampleScreen from "./Select";
import SliderExampleScreen from "./Slider";
import SwitchScreen from "./Switch";
import TextFieldScreen from "./TextField";

const SectionInput = () => {
  return (
    <ExpandableCard title="Inputs">
      <Stack divider={<Divider sx={{ my: 2 }} />}>
        <TextFieldScreen />
        <CheckboxesScreen />
        <RadioScreen />
        <SwitchScreen />
        <BasicRatingScreen />
        <SelectExampleScreen />
        <SliderExampleScreen />
      </Stack>
    </ExpandableCard>
  );
};

export default SectionInput;
