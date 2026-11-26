import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import i18n from "i18next";
import { App } from "../../src/app/App";

vi.mock("react-toastify", () => ({
  toast: { success: vi.fn() },
  Bounce: {},
  ToastContainer: () => null,
}));

describe("App", () => {
  afterEach(async () => {
    cleanup();
    await i18n.changeLanguage("en");
  });

  describe("routes", () => {
    it("should render the home page with the header and the footer on the home route", () => {
      //ARRANGE
      //ACT
      render(
        <MemoryRouter initialEntries={["/"]}>
          <App />
        </MemoryRouter>,
      );

      //ASSERT
      expect(screen.getByTestId("home-book-now")).toBeInTheDocument();
      expect(screen.getAllByTestId("header-nav-link")).toHaveLength(2);
      expect(screen.getByTestId("footer")).toBeInTheDocument();
      expect(
        screen.queryByTestId("progress-bar-circle"),
      ).not.toBeInTheDocument();
    });

    it("should render the stepper with the header and the footer on the booking route", () => {
      //ARRANGE
      //ACT
      render(
        <MemoryRouter initialEntries={["/booking"]}>
          <App />
        </MemoryRouter>,
      );

      //ASSERT
      expect(screen.getAllByTestId("progress-bar-circle")).toHaveLength(4);
      expect(screen.getAllByTestId("header-nav-link")).toHaveLength(2);
      expect(screen.getByTestId("footer")).toBeInTheDocument();
      expect(screen.queryByTestId("home-book-now")).not.toBeInTheDocument();
    });
  });

  describe("user interactions", () => {
    it("should go to the booking page when Book Now is clicked on the home page", async () => {
      //ARRANGE
      const user = userEvent.setup();
      render(
        <MemoryRouter initialEntries={["/"]}>
          <App />
        </MemoryRouter>,
      );
      const bookNow = screen.getByTestId("home-book-now");

      //ACT
      await user.click(bookNow);

      //ASSERT
      expect(screen.getAllByTestId("progress-bar-circle")).toHaveLength(4);
      expect(screen.queryByTestId("home-book-now")).not.toBeInTheDocument();
      expect(screen.getByTestId("footer")).toBeInTheDocument();
    });

    it("should update the header, the hero and the footer when German is selected", async () => {
      //ARRANGE
      const user = userEvent.setup();
      render(
        <MemoryRouter initialEntries={["/"]}>
          <App />
        </MemoryRouter>,
      );
      await user.click(screen.getByTestId("header-language-button"));
      const options = screen.getAllByTestId("header-language-option");

      //ACT
      await user.click(options[2]);

      //ASSERT
      const navLinks = screen.getAllByTestId("header-nav-link");
      expect(navLinks[0]).toHaveTextContent("Startseite");
      expect(navLinks[1]).toHaveTextContent("Buchung");
      expect(
        screen.getByText("Die Zukunft Klingt Genau So"),
      ).toBeInTheDocument();
      expect(screen.getByTestId("home-book-now")).toHaveTextContent(
        "Jetzt Buchen",
      );
      const footerLinks = screen.getAllByTestId("footer-link");
      expect(footerLinks[0]).toHaveTextContent("Bedingungen");
      expect(footerLinks[1]).toHaveTextContent("Datenschutz");
      expect(footerLinks[2]).toHaveTextContent("Support");
    });
  });
});
