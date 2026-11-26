import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest"; // Adds custom matchers like toBeInTheDocument
import "../../src/i18n";

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

globalThis.ResizeObserver = ResizeObserverMock;

// Clean up DOM space after every single test case
afterEach(() => {
  cleanup();
});
