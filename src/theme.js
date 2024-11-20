import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "green.50",
      },
    },
  },
  fonts: {
    heading: "Roboto, sans-serif", // For headings
    body: "Arial, sans-serif", // For body text
  },
});

export default theme;
