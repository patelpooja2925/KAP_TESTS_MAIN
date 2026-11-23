const envResult = require('dotenv').config({
  path: 'C:/Users/PoojaPatel/OneDrive - Kapital Solutions Inc/Documents/Kap_tests_main/playwright-tests/CA.env'
});
if (envResult.error) throw envResult.error;

console.log({
  usernameLoaded: Boolean(process.env.CA_USERNAME),
  passwordLoaded: Boolean(process.env.CA_PASSWORD)
});

const { test, expect } = require('@playwright/test');

test('B2C login', async ({ page }) => {
  test.setTimeout(60000);

  await page.goto('https://test.kapcharge.com/authentication/login');

  await page.locator('#email').fill(
    process.env.CA_USERNAME,
    { timeout: 30000 }
  );

  await page.locator('#password').fill(process.env.CA_PASSWORD);
  await page.locator('#next').click();

  await expect(page.locator('#menu-item-transactions'))
    .toBeVisible({ timeout: 30000 });
});