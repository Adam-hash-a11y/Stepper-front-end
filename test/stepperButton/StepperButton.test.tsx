import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import { StepperButton } from "../../src/components/shared/stepperButton/StepperButton";

const props = {
  label: "Next",
  handleButton: vi.fn(),
};

describe("StepperButton", () => {
  describe("user interactions", () => {
    it("should call the handler once when clicked", async () => {
      //ARRANGE
      const user = userEvent.setup();
      render(<StepperButton {...props} />);
      const button = screen.getByTestId("stepper-button");

      //ACT
      await user.click(button);

      //ASSERT
      expect(props.handleButton).toHaveBeenCalledTimes(1);
    });
  });

  describe("disabled", () => {
    it("should ignore clicks when disabled", async () => {
      //ARRANGE
      const user = userEvent.setup();
      render(<StepperButton {...props} disabled={true} />);
      const button = screen.getByTestId("stepper-button");

      //ACT
      await user.click(button);

      //ASSERT
      expect(button).toBeDisabled();
      expect(props.handleButton).not.toHaveBeenCalled();
    });
  });
});
