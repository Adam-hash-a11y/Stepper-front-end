import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import "@testing-library/jest-dom/vitest";
import { ProgressBar } from "../../src/components/progressBar/ProgressBar";

describe("ProgressBar", () => {
  describe("rendering", () => {
    it("should show the 4 step names in order", () => {
      //ARRANGE
      render(<ProgressBar step={1} />);

      //ACT
      const labels = screen.getAllByTestId("progress-bar-label");

      //ASSERT
      expect(labels).toHaveLength(4);
      expect(labels[0]).toHaveTextContent("Personal Info");
      expect(labels[1]).toHaveTextContent("Contact");
      expect(labels[2]).toHaveTextContent("Event & Tier");
      expect(labels[3]).toHaveTextContent("Order");
    });
  });

  describe("current step", () => {
    it("should color only the first circle on step 1", () => {
      //ARRANGE
      render(<ProgressBar step={1} />);

      //ACT
      const circles = screen.getAllByTestId("progress-bar-circle");

      //ASSERT
      expect(circles[0]).toHaveStyle({ color: "#7c3aed" });
      expect(circles[1]).toHaveStyle({ color: "#333333" });
      expect(circles[2]).toHaveStyle({ color: "#333333" });
      expect(circles[3]).toHaveStyle({ color: "#333333" });
    });

    it("should show done, current and upcoming steps on step 3", () => {
      //ARRANGE
      render(<ProgressBar step={3} />);

      //ACT
      const circles = screen.getAllByTestId("progress-bar-circle");
      const lines = screen.getAllByTestId("progress-bar-line");

      //ASSERT
      expect(circles[0]).toHaveStyle({ color: "#ffffff" });
      expect(circles[1]).toHaveStyle({ color: "#ffffff" });
      expect(circles[2]).toHaveStyle({ color: "#7c3aed" });
      expect(circles[3]).toHaveStyle({ color: "#333333" });
      expect(lines[0]).toHaveStyle({ backgroundColor: "#ffffff" });
      expect(lines[1]).toHaveStyle({ backgroundColor: "#7c3aed" });
      expect(lines[2]).toHaveStyle({ backgroundColor: "#333333" });
    });
  });
});
