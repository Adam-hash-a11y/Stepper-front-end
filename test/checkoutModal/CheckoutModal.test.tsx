import { render, screen } from "@testing-library/react";
import { CheckoutModal } from "../../src/components/shared/checkoutModal/CheckoutModal";
import { describe, expect, it, vi } from "vitest";

describe("CheckoutModal", () => {
  describe("visibility", () => {
    it("should render nothing when closed", () => {
      //ARRANGE
      //ACT
      render(
        <CheckoutModal isOpen={false}>
          <p data-testid="modal-child">Child content</p>
        </CheckoutModal>,
      );

      //ASSERT
      expect(screen.queryByTestId("checkout-modal")).not.toBeInTheDocument();
      expect(screen.queryByTestId("modal-child")).not.toBeInTheDocument();
    });

    it("should show the confirm text and its children when open", () => {
      //ARRANGE
      //ACT
      render(
        <CheckoutModal isOpen={true}>
          <p data-testid="modal-child">Child content</p>
        </CheckoutModal>,
      );

      //ASSERT
      expect(screen.getByTestId("checkout-modal")).toBeInTheDocument();
      expect(
        screen.getByTestId("checkout-modal-confirm-text"),
      ).toHaveTextContent("Are you sure you want to proceed?");
      expect(screen.getByTestId("modal-child")).toHaveTextContent(
        "Child content",
      );
    });
  });
});
