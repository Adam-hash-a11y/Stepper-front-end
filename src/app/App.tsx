import { Routes, Route } from "react-router-dom";
import { RootLayout } from "../components/rootLayout/RootLayout";
import { Stepper } from "../components/stepper/Stepper";
import { createGlobalStyle } from "styled-components";
import { ToastContainer } from "react-toastify";
import { HomePage } from "../components/homePage/HomePage";

const GlobalStyle = createGlobalStyle`
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

export const App = () => {
  return (
    <>
      <GlobalStyle />
      <ToastContainer theme="dark" position="top-right" />
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="booking" element={<Stepper />} />
        </Route>
      </Routes>
    </>
  );
};
