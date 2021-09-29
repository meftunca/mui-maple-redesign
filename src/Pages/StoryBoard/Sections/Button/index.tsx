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
const colors: ButtonColors[] = [
  "primary",
  "secondary",
  "info",
  "tertiary",
  "success",
  "warning",
  "error",
];

const variants: ButtonVariant[] = ["contained", "text", "outlined", "dashed"];

const SectionButton = () => {
  return (
    <ExpandableCard title="Buttons">
      <Button color="tertiary">Tertiary</Button>
      <WrapperStack divider={<Divider sx={{ my: 1 }} />}>
        {colors.map((colorName, colorIndex) => (
          <Stack
            key={colorIndex}
            divider={<Divider orientation="vertical" sx={{ height: 20 }} />}
            flexDirection="row"
            justifyContent="space-around"
            alignItems="center"
          >
            {variants.map((variantName: ButtonVariant, variantIndex) => (
              <Button
                key={variantIndex}
                variant={variantName}
                //@ts-ignore
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
