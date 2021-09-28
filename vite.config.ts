import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
/* 
      "Pages/*": ["./Pages/*"],
      "Components/*": ["./Components/*"],
      "Utils/*": ["./Utils/*"],
      "Store/*": ["./Store/*"],
      "PageDesign/*": ["./PageDesign/*"]

*/
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      { find: /^~/, replacement: "" },
      { find: /^Pages/, replacement: path.resolve("./src/Pages") },
      { find: /^Components/, replacement: path.resolve("./src/Components") },
      { find: /^Utils/, replacement: path.resolve("./src/Utils") },
      { find: /^Store/, replacement: path.resolve("./src/Store") },
      { find: /^PageDesign/, replacement: path.resolve("./src/PageDesign") },
    ],
  },
  plugins: [react()],
});
