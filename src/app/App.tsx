import { Routes, Route } from "react-router-dom";
import { RootLayout } from "../components/rootLayout/RootLayout";
import { Stepper } from "../components/stepper/Stepper";
import { ToastContainer } from "react-toastify";
import { HomePage } from "../components/homePage/HomePage";
import { GlobalStyle } from "./GlobalStyle";

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
