import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import { StepperInput } from "../../src/components/shared/stepperField/StepperField";
import { InputType } from "../../src/components/stepper/types";

const props = {
  name: "firstName",
  type: InputType.TEXT,
  placeholder: "First name",
  handleFiledChange: vi.fn(),
  handleBlur: vi.fn(),
  label: "First Name",
  id: "FirstNameID",
  value: "",
};

describe("StepperField", () => {
  describe("rendering", () => {
    it("should show its value and placeholder", () => {
      //ARRANGE
      render(<StepperInput {...props} value="Adam" />);

      //ACT
      const input = screen.getByTestId("stepper-field-input");

      //ASSERT
      expect(input).toHaveValue("Adam");
      expect(input).toHaveAttribute("placeholder", "First name");
    });
  });

  describe("user interactions", () => {
    it("should call only the change handler while typing", async () => {
      //ARRANGE
      const user = userEvent.setup();
      render(<StepperInput {...props} />);
      const input = screen.getByTestId("stepper-field-input");

      //ACT
      await user.type(input, "Adam");

      //ASSERT
      expect(props.handleFiledChange).toHaveBeenCalledTimes(4);
      expect(props.handleBlur).not.toHaveBeenCalled();
    });

    it("should call the blur handler when the user leaves the field", async () => {
      //ARRANGE
      const user = userEvent.setup();
      render(<StepperInput {...props} />);
      const input = screen.getByTestId("stepper-field-input");

      //ACT
      await user.click(input);
      await user.tab();

      //ASSERT
      expect(props.handleBlur).toHaveBeenCalledTimes(1);
      expect(props.handleFiledChange).not.toHaveBeenCalled();
    });
  });

  describe("validation", () => {
    it("should show no icon while the field is untouched", () => {
      //ARRANGE
      render(<StepperInput {...props} error="validation.firstName" />);

      //ACT
      const errorIcon = screen.queryByTestId("stepper-field-error-icon");
      const successIcon = screen.queryByTestId("stepper-field-success-icon");

      //ASSERT
      expect(errorIcon).not.toBeInTheDocument();
      expect(successIcon).not.toBeInTheDocument();
    });

    it("should show a red border and an error icon when the field is invalid", () => {
      //ARRANGE
      render(
        <StepperInput {...props} touched={true} error="validation.firstName" />,
      );

      //ACT
      const input = screen.getByTestId("stepper-field-input");

      //ASSERT
      expect(input).toHaveStyle({ borderColor: "#dc2626" });
      expect(
        screen.getByTestId("stepper-field-error-icon"),
      ).toBeInTheDocument();
      expect(
        screen.queryByTestId("stepper-field-success-icon"),
      ).not.toBeInTheDocument();
    });

    it("should show a purple border and a success icon when the field is valid", () => {
      //ARRANGE
      render(<StepperInput {...props} touched={true} error="" />);

      //ACT
      const input = screen.getByTestId("stepper-field-input");

      //ASSERT
      expect(input).toHaveStyle({ borderColor: "#7c3aed" });
      expect(
        screen.getByTestId("stepper-field-success-icon"),
      ).toBeInTheDocument();
      expect(
        screen.queryByTestId("stepper-field-error-icon"),
      ).not.toBeInTheDocument();
    });
  });
});
