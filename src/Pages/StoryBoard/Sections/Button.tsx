import { Button, Divider, Stack } from "@mui/material";
import ExpandableCard from "PageDesign/ExpandableCard";
import React from "react";
const WrapperStack = Stack;

type ButtonVariant = "text" | "contained" | "outlined" | "dashed" | undefined;
type ButtonColors =
  | "primary"
  | "secondary"
  | "warning"
  | "tertiary"
  | "success"
  | "error"
  | "info"
  | undefined;
const colors = [
  "primary",
  "secondary",
  "info",
  "tertiary",
  "success",
  "warning",
  "error",
];

const variants = ["contained", "text", "outlined", "dashed"];

const SectionButton = () => {
  return (
    <ExpandableCard title="Buttons">
      <WrapperStack divider={<Divider sx={{ my: 1 }} />}>
        {colors.map((colorName: ButtonColors, colorIndex) => (
          <Stack
            key={colorIndex}
            divider={<Divider orientation="vertical" sx={{ height: 20 }} />}
            direction="row"
            justifyContent="space-around"
            alignItems="center"
          >
            {variants.map((variantName: ButtonVariant, variantIndex) => (
              <Button
                key={variantIndex}
                variant={variantName}
                color={colorName}
              >
                {variantName} - {colorName}
              </Button>
            ))}
          </Stack>
        ))}
      </WrapperStack>
    </ExpandableCard>
  );
};

export default SectionButton;
