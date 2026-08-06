import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Stepper } from "./Stepper";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Stepper />
  </StrictMode>,
);
