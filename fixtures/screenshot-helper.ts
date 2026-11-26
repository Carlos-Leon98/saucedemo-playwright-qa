import type { Page, TestInfo } from '@playwright/test';

/**
 * Captures a full-page screenshot and attaches it to the Playwright HTML
 * report under a descriptive name, so test runs leave a labeled visual
 * trail instead of just the generic end-of-test screenshot.
 */
export async function attachScreenshot(page: Page, testInfo: TestInfo, name: string) {
  const buffer = await page.screenshot({ fullPage: true });
  await testInfo.attach(name, { body: buffer, contentType: 'image/png' });
}
