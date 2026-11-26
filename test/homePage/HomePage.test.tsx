import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "../../src/components/homePage/HomePage";

describe("HomePage", () => {
  describe("user interactions", () => {
    it("should navigate to the booking route when Book Now is clicked", async () => {
      //ARRANGE
      const user = userEvent.setup();
      render(
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/booking"
              element={<p data-testid="booking-page">Booking</p>}
            />
          </Routes>
        </MemoryRouter>,
      );
      const bookNow = screen.getByTestId("home-book-now");

      //ACT
      await user.click(bookNow);

      //ASSERT
      expect(screen.getByTestId("booking-page")).toBeInTheDocument();
      expect(screen.queryByTestId("home-book-now")).not.toBeInTheDocument();
    });
  });
});
