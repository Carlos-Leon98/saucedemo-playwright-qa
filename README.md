# SauceDemo Playwright QA Suite

[![CI](https://github.com/parlosjr/saucedemo-playwright-qa/actions/workflows/playwright.yml/badge.svg)](https://github.com/parlosjr/saucedemo-playwright-qa/actions/workflows/playwright.yml)

End-to-end and API test automation suite built with **Playwright + TypeScript**, targeting the public demo app [saucedemo.com](https://www.saucedemo.com). Built to demonstrate production-grade QA automation practices: Page Object Model, fixtures, data-driven tests, and CI on every push via GitHub Actions.

## Stack

- **Playwright** (TypeScript) — UI and API test runner
- **Page Object Model (POM)** — one class per page, zero selector logic in test files
- **Custom fixtures** — page objects injected via `test.extend`
- **GitHub Actions** — runs the full suite (Chromium, Firefox, API) on every push/PR

## Project structure

```
pages/            Page Object classes (LoginPage, InventoryPage, CartPage, CheckoutPage)
fixtures/         Custom Playwright fixtures + shared test data
tests/ui/         UI end-to-end tests (login, inventory, checkout)
tests/api/        API tests (fakestoreapi.com — see note below)
.github/workflows/playwright.yml   CI pipeline
```

## Why the API suite targets fakestoreapi.com

SauceDemo is a UI-only demo app and does not expose a public REST API. To demonstrate API testing within the same Playwright project and CI pipeline, `tests/api/` targets [fakestoreapi.com](https://fakestoreapi.com), a free public mock API, using Playwright's built-in `request` fixture. UI and API tests run as separate Playwright **projects** sharing one config.

## Running locally

```bash
npm ci
npx playwright install --with-deps

npm test              # full suite (chromium + firefox + api)
npm run test:ui       # UI tests only
npm run test:api      # API tests only
npm run test:headed   # UI tests, headed/visible browser
npm run report        # open the last HTML report
```

## CI

Every push and pull request to `main` triggers `.github/workflows/playwright.yml`, which installs dependencies and browsers, runs the full suite, and uploads the HTML report as a build artifact. The badge above reflects the latest run on `main`.

## Test coverage

**Login** — valid login, locked-out user, invalid credentials, required-field validation.

**Inventory** — sort by price (asc/desc), sort by name (A–Z), add single/multiple items to cart with badge count assertions.

**Checkout** — full purchase flow end-to-end, required-field validation on checkout info.

**API (Products)** — list products, fetch by id, invalid id handling, categories endpoint schema checks.
