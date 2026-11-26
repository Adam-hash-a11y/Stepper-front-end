# Voltage

Festival ticket booking flow for a techno festival platform. A 4-step stepper built with React 19 and TypeScript, running entirely on the client: one `useReducer` state machine, live per-field validation, three UI languages, and a full unit and integration test suite.

![Voltage Hero](./src/assets/Voltage-hero.png)

## Overview

A visitor lands on the home page, opens the booking route and goes through four steps: personal info, contact details, event and ticket tier, and order with optional add-ons. Each step is validated live. Navigation is blocked until the current step is valid, and a tooltip on the disabled button explains what is missing. The order is reviewed in a checkout modal, confirmed with a toast, and finished with a confirmation screen showing a generated booking ID.

There is no backend. All data (events, tiers, add-ons) lives in the reducer's initial state.

## Features

- 4-step booking flow: Personal Info, Contact, Event & Tier, Order
- Live validation per field with error and success states, shown only after a field is touched
- Disabled Next and Checkout buttons with step-specific explanation tooltips
- Progress bar that follows the current step
- Three festivals with their own ticket tiers, lineups and remaining spots
- Quantity checked against the spots left for the selected tier
- Optional add-ons priced separately and counted once each
- Checkout modal with the full order summary before confirming
- Confirmation screen with a unique booking ID (`VLT-XXXXXXXX`)
- Full internationalization in English, French and German with a language menu
- Containerized dev environment

## Tech Stack

| Area         | Tools                                                                                        |
| ------------ | -------------------------------------------------------------------------------------------- |
| UI           | React 19, TypeScript                                                                         |
| Build        | Vite 8                                                                                       |
| Styling      | styled-components (custom design system, no CSS framework)                                   |
| Routing      | react-router-dom 7                                                                           |
| i18n         | i18next, react-i18next                                                                       |
| Validation   | validator, custom validation helpers                                                         |
| Feedback     | react-toastify (booking confirmation), react-tooltip (field and button hints)                |
| Icons        | react-icons, country-flag-icons (language flags)                                             |
| Testing      | Vitest 5, jsdom, Testing Library (`@testing-library/react`, `dom`, `jest-dom`, `user-event`) |
| Code quality | ESLint 10 with typescript-eslint, react-hooks and react-refresh plugins, Prettier, Husky     |
| CI           | GitHub Actions                                                                               |
| Environment  | Docker, Docker Compose                                                                       |

## Getting Started

### Docker

No local Node installation needed.

```bash
git clone https://github.com/<your-username>/Stepper-front-end.git
cd Stepper-front-end
docker compose up --build
```

Open **http://localhost:5171**.

The container exposes Vite on port 5173 and maps it to 5171 on the host. The project folder is bind mounted into the container, so edits on the host trigger hot reload. An anonymous volume on `/app/node_modules` keeps the container's dependencies separate from the host, so a host `node_modules` never overrides the Linux install inside the image.

```bash
docker compose down
```

### Local

Requires Node 20 or newer.

```bash
git clone https://github.com/<your-username>/Stepper-front-end.git
cd Stepper-front-end
npm install
npm run dev
```

Open **http://localhost:5173**.

## Scripts

| Command            | Description                                         |
| ------------------ | --------------------------------------------------- |
| `npm run dev`      | Start the Vite dev server                           |
| `npm run build`    | Type check with `tsc -b`, then build for production |
| `npm run preview`  | Serve the production build locally                  |
| `npm run lint`     | Run ESLint on the whole project                     |
| `npm test`         | Run the full test suite once                        |
| `npm run prettier` | Format source files with Prettier                   |

## Booking Logic

All state transitions live in a single reducer (`src/components/stepper/reducer.ts`) with typed actions.

**Validation** (`src/helpers/stepperForm.validator.ts`)

- First and last name: at least 3 characters after trimming
- Email: validated with the `validator` library
- Phone: digits, spaces and an optional leading `+`, at least 8 digits
- Quantity: an integer, at least 1, and not above the spots left for the selected tier
- Validators return translation keys, not text, so error messages follow the active language

**Reducer rules**

- Phone input is sanitized: everything except digits, `+` and spaces is stripped as the user types
- Changing the selected event clears the selected tier, so a stale pass can never carry over
- Clicking the selected event again deselects it and hides its passes
- Quantity is rechecked when the step changes, so a tier change cannot leave an invalid quantity behind
- The Next and Checkout state is derived from the validity of the current step
- Total price is tier price times quantity, plus each selected add-on once
- The booking ID is `VLT-` followed by the first segment of `crypto.randomUUID()`, uppercased

## Internationalization

The interface is available in English (default), French and German through `i18next` and `react-i18next`, with one translation file per language in `src/locales`. The language menu in the header switches the whole page at runtime: navigation, hero, step content, validation errors, tooltips, add-ons, summary, confirmation and footer.

Error messages are stored as translation keys in state and translated at render time, so switching language updates errors that are already on screen. Festival names, tier names and dates are event content and are kept as data.

## Testing

The suite covers the helpers, the reducer, every component and the complete booking flow. It runs in jsdom with no browser tooling, so it is fast enough to run on every push.

```bash
npm test
```

Run a single file:

```bash
npx vitest run test/stepper/Stepper.test.tsx
```

**Unit tests**

- Validators: every rule, including boundaries and the spots left check
- Reducer: each action, phone sanitizing, tier reset on event change, quantity recheck on step change, booking ID format
- Shared components: input states, buttons, error messages, progress bar, disabled Next with its tooltip
- Step components rendered alone with props: tooltips, errors shown only when touched, change and blur handlers, event cards, passes for the selected event only, the 4 DJ limit with the "More TBA" label, add-on toggling
- Display components: header links and active route, language menu, booking summary, confirmation screen, checkout modal, home page navigation

**Integration tests**

`Stepper.test.tsx` renders the real components inside a `MemoryRouter` with real routes. Only `react-toastify` is mocked. It walks through the flow as a user would:

- Error on blur, error cleared when the value is fixed
- Next disabled until valid, with the right tooltip per step
- Progress bar following the current step
- Event selection, deselection, switching events, switching passes
- Previous keeping all values, edits validated without affecting other fields
- Checkout disabled until the quantity is valid, add-ons optional
- Checkout modal content with and without add-ons, Cancel, Confirm
- Success toast, confirmation screen with booking ID, return to the home page

`App.test.tsx` covers routing with header and footer, Book Now navigation, and a language switch that updates the whole page.

**Conventions**

- Elements are selected with `data-testid` (`<component>-<element>` in kebab-case)
- Every test is structured as Arrange, Act, Assert
- User actions go through `userEvent.setup()`
- Tests assert what the user sees and which handlers were called
- No snapshot tests, no fake timers, no purely stylistic assertions

**Setup** (`vite.config.ts`, `test/setup/setup.ts`): globals enabled, jsdom environment, mocks cleared between tests, automatic cleanup, `jest-dom` matchers, i18n initialized, `ResizeObserver` mocked for tooltips.

## Code Quality and CI

- ESLint with typescript-eslint, react-hooks and react-refresh rules, combined with Prettier through `eslint-config-prettier` and `eslint-plugin-prettier`
- Husky git hooks as a second local check before code is committed
- GitHub Actions on Node 22 runs `npm test` and `npm run lint` on every push and pull request to `main`
- Conventional Commits, one branch per feature, pull requests into `main`

## Project Structure

```
src/
├── app/                      App shell, routes, global styles
├── assets/                   Images
├── helpers/                  Validation helpers
├── locales/                  en, fr, de translation files
├── i18n.ts                   i18next setup
├── components/
│   ├── header/               Navigation and language menu
│   ├── footer/               Site footer
│   ├── homePage/             Landing hero
│   ├── progressBar/          Step progress indicator
│   ├── nextButton/           Next button with step tooltip
│   ├── stepper/              Container, reducer, actions, constants, types
│   ├── stepper-steps/        Personal Info, Contact, Event & Tier, Order
│   ├── bookingSummary/       Order review inside the checkout modal
│   ├── confirmationScreen/   Post-booking confirmation
│   └── shared/               Input field, button, error, info callout, checkout modal
test/                         Unit and integration tests, mirroring src/
```

## Design

Dark, club-inspired interface: near-black backgrounds, purple (`#7c3aed`) accents for selected, hover and active states, Orbitron for headings, and uppercase letter-spaced labels. Event cards, tier rows and add-on rows share one visual language: dark border at rest, purple when hovered or selected. Input borders switch between neutral, red and purple to show the validation state.
