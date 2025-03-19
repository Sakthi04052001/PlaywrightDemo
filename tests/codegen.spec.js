import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://randum.io/');
  await page.getByRole('button', { name: 'Contact Us / Join Us' }).click();
  await page.getByRole('textbox', { name: 'Name*' }).fill('Sakthivel.A ');
  await page.getByRole('textbox', { name: 'Email*' }).fill('sakthivel@print2block.com');
  await page.getByRole('spinbutton', { name: 'Phone number*' }).fill('9865152036');
  await page.getByRole('textbox', { name: 'Message*' }).fill('Testing');
});