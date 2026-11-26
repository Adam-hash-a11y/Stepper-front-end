import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import i18n from "i18next";
import { Header } from "../../src/components/header/Header";

describe("Header", () => {
  afterEach(async () => {
    cleanup();
    await i18n.changeLanguage("en");
  });

  describe("navigation links", () => {
    it("should link Home to the root and Booking to the booking route", () => {
      //ARRANGE
      //ACT
      render(
        <MemoryRouter initialEntries={["/"]}>
          <Header />
        </MemoryRouter>,
      );

      //ASSERT
      const links = screen.getAllByTestId("header-nav-link");
      expect(links[0]).toHaveAttribute("href", "/");
      expect(links[1]).toHaveAttribute("href", "/booking");
    });

    it("should mark only Home as active on the home route", () => {
      //ARRANGE
      //ACT
      render(
        <MemoryRouter initialEntries={["/"]}>
          <Header />
        </MemoryRouter>,
      );

      //ASSERT
      const links = screen.getAllByTestId("header-nav-link");
      expect(links[0]).toHaveClass("active");
      expect(links[1]).not.toHaveClass("active");
    });

    it("should mark only Booking as active on the booking route", () => {
      //ARRANGE
      //ACT
      render(
        <MemoryRouter initialEntries={["/booking"]}>
          <Header />
        </MemoryRouter>,
      );

      //ASSERT
      const links = screen.getAllByTestId("header-nav-link");
      expect(links[0]).not.toHaveClass("active");
      expect(links[1]).toHaveClass("active");
    });
  });

  describe("language menu", () => {
    it("should not show the language options by default", () => {
      //ARRANGE
      //ACT
      render(
        <MemoryRouter>
          <Header />
        </MemoryRouter>,
      );

      //ASSERT
      expect(screen.queryAllByTestId("header-language-option")).toHaveLength(0);
    });

    it("should show the 3 language options when the language button is clicked", async () => {
      //ARRANGE
      const user = userEvent.setup();
      render(
        <MemoryRouter>
          <Header />
        </MemoryRouter>,
      );
      const button = screen.getByTestId("header-language-button");

      //ACT
      await user.click(button);

      //ASSERT
      const options = screen.getAllByTestId("header-language-option");
      expect(options).toHaveLength(3);
      expect(options[0]).toHaveTextContent("EN");
      expect(options[1]).toHaveTextContent("FR");
      expect(options[2]).toHaveTextContent("DE");
    });

    it("should switch the nav texts and the button to German when DE is selected", async () => {
      //ARRANGE
      const user = userEvent.setup();
      render(
        <MemoryRouter>
          <Header />
        </MemoryRouter>,
      );
      await user.click(screen.getByTestId("header-language-button"));
      const options = screen.getAllByTestId("header-language-option");

      //ACT
      await user.click(options[2]);

      //ASSERT
      const links = screen.getAllByTestId("header-nav-link");
      expect(links[0]).toHaveTextContent("Startseite");
      expect(links[1]).toHaveTextContent("Buchung");
      expect(screen.getByTestId("header-language-button")).toHaveTextContent(
        "DE",
      );
    });

    it("should close the menu when a language is selected", async () => {
      //ARRANGE
      const user = userEvent.setup();
      render(
        <MemoryRouter>
          <Header />
        </MemoryRouter>,
      );
      await user.click(screen.getByTestId("header-language-button"));
      const options = screen.getAllByTestId("header-language-option");

      //ACT
      await user.click(options[1]);

      //ASSERT
      expect(screen.queryAllByTestId("header-language-option")).toHaveLength(0);
    });
  });
});
