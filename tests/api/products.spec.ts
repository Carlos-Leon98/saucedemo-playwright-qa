import { test, expect } from '@playwright/test';

/**
 * API-level tests using Playwright's built-in `request` fixture.
 *
 * SauceDemo itself is a UI-only demo app with no public REST API, so this
 * suite targets fakestoreapi.com (a free public mock API) to demonstrate
 * API testing capability within the same Playwright project/config.
 */
test.describe('Products API', () => {
  test('GET /products returns a non-empty list of products', async ({ request }) => {
    const response = await request.get('/products');

    expect(response.status()).toBe(200);
    const products = await response.json();

    expect(Array.isArray(products)).toBeTruthy();
    expect(products.length).toBeGreaterThan(0);

    const first = products[0];
    expect(first).toHaveProperty('id');
    expect(first).toHaveProperty('title');
    expect(first).toHaveProperty('price');
  });

  test('GET /products/:id returns a single product with expected schema', async ({ request }) => {
    const response = await request.get('/products/1');

    expect(response.status()).toBe(200);
    const product = await response.json();

    expect(product.id).toBe(1);
    expect(typeof product.title).toBe('string');
    expect(typeof product.price).toBe('number');
    expect(typeof product.category).toBe('string');
  });

  test('GET /products/:id with an invalid id returns an empty body', async ({ request }) => {
    const response = await request.get('/products/999999');

    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body.trim()).toBe('');
  });

  test('GET /products/categories returns known categories', async ({ request }) => {
    const response = await request.get('/products/categories');

    expect(response.status()).toBe(200);
    const categories: string[] = await response.json();

    expect(categories).toContain('electronics');
    expect(categories.length).toBeGreaterThan(0);
  });
});
