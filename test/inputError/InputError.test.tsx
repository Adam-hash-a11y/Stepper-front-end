import { FormInputError } from "../../src/components/shared/inputError/InputError";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import "@testing-library/jest-dom/vitest";

describe("FormInputError", () => {
  it("should render the error message", () => {
    //ARRANGE
    render(<FormInputError error="First name is required" />);

    //ACT
    const message = screen.getByText("First name is required");

    //ASSERT
    expect(message).toBeInTheDocument();
  });

  it("should render the error inside a paragraph", () => {
    //ARRANGE
    render(<FormInputError error="Invalid email" />);

    //ACT
    const message = screen.getByText("Invalid email");

    //ASSERT
    expect(message.tagName).toBe("P");
  });

  it("should apply the red error color", () => {
    //ARRANGE
    render(<FormInputError error="Invalid email" />);

    //ACT
    const message = screen.getByText("Invalid email");

    //ASSERT
    expect(message).toHaveStyle({ color: "#dc2626" });
  });

  it("should update when the error changes", () => {
    //ARRANGE
    const { rerender } = render(<FormInputError error="Invalid email" />);

    //ACT
    rerender(<FormInputError error="Email is required" />);

    //ASSERT
    expect(screen.getByText("Email is required")).toBeInTheDocument();
    expect(screen.queryByText("Invalid email")).not.toBeInTheDocument();
  });
});
