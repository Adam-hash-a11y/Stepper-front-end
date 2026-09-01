import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body {
    font-family: "Inter", system-ui, sans-serif;
    background-color: #0a0a0a;
    color: #ffffff;
  }
`;
