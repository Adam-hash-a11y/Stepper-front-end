import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import { NextButton } from "../../src/components/nextButton/NextButton";

const props = {
  disabled: false,
  handleNextStep: vi.fn(),
  currentStep: 1,
};

describe("NextButton", () => {
  describe("user interactions", () => {
    it("should go to the next step when clicked", async () => {
      //ARRANGE
      const user = userEvent.setup();
      render(<NextButton {...props} />);
      const button = screen.getByTestId("stepper-button");

      //ACT
      await user.click(button);

      //ASSERT
      expect(props.handleNextStep).toHaveBeenCalledTimes(1);
    });
  });

  describe("disabled", () => {
    it("should not go to the next step when disabled", async () => {
      //ARRANGE
      const user = userEvent.setup();
      render(<NextButton {...props} disabled={true} />);
      const button = screen.getByTestId("stepper-button");

      //ACT
      await user.click(button);

      //ASSERT
      expect(button).toBeDisabled();
      expect(props.handleNextStep).not.toHaveBeenCalled();
    });

    it("should ask for both names when hovered on step 1", async () => {
      //ARRANGE
      const user = userEvent.setup();
      render(<NextButton {...props} disabled={true} currentStep={1} />);
      const button = screen.getByTestId("stepper-button");

      //ACT
      await user.hover(button);

      //ASSERT
      expect(
        await screen.findByTestId("next-button-tooltip"),
      ).toHaveTextContent("Please fill in your first name and last name");
    });

    it("should ask for an email and a phone when hovered on step 2", async () => {
      //ARRANGE
      const user = userEvent.setup();
      render(<NextButton {...props} disabled={true} currentStep={2} />);
      const button = screen.getByTestId("stepper-button");

      //ACT
      await user.hover(button);

      //ASSERT
      expect(
        await screen.findByTestId("next-button-tooltip"),
      ).toHaveTextContent("Please fill in a valid email and phone number");
    });

    it("should ask for an event and a pass when hovered on step 3", async () => {
      //ARRANGE
      const user = userEvent.setup();
      render(<NextButton {...props} disabled={true} currentStep={3} />);
      const button = screen.getByTestId("stepper-button");

      //ACT
      await user.hover(button);

      //ASSERT
      expect(
        await screen.findByTestId("next-button-tooltip"),
      ).toHaveTextContent("Please select an event and a ticket tier");
    });

    it("should show no tooltip when the button is enabled", async () => {
      //ARRANGE
      const user = userEvent.setup();
      render(<NextButton {...props} />);
      const button = screen.getByTestId("stepper-button");

      //ACT
      await user.hover(button);

      //ASSERT
      expect(
        screen.queryByTestId("next-button-tooltip"),
      ).not.toBeInTheDocument();
    });
  });
});
