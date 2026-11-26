import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import "@testing-library/jest-dom/vitest";
import i18n from "i18next";
import { FormInputError } from "../../src/components/shared/inputError/InputError";

describe("FormInputError", () => {
  afterEach(async () => {
    cleanup();
    await i18n.changeLanguage("en");
  });

  describe("rendering", () => {
    it("should show the translated error message", () => {
      //ARRANGE
      render(<FormInputError error="validation.email" />);

      //ACT
      const message = screen.getByTestId("input-error");

      //ASSERT
      expect(message).toHaveTextContent("Email must be valid");
    });

    it("should translate the message again when the language changes", async () => {
      //ARRANGE
      render(<FormInputError error="validation.email" />);

      //ACT
      await act(() => i18n.changeLanguage("de"));

      //ASSERT
      expect(screen.getByTestId("input-error")).toHaveTextContent(
        "Die E-Mail-Adresse muss gültig sein",
      );
    });
  });
});
