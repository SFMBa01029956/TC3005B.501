import { test, expect } from '@playwright/test'
import { timeout } from '../../playwright.config'

test.describe

test('test', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('link', { name: 'Iniciar sesión' }).click();
    await page.locator('input[type="email"]').click();
    await page.locator('input[type="email"]').fill('karla@gmail.com');
    await page.locator('input[type="email"]').press('Tab');
    await page.locator('input[type="password"]').press('CapsLock');
    await page.locator('input[type="password"]').fill('K');
    await page.locator('input[type="password"]').press('CapsLock');
    await page.locator('input[type="password"]').fill('Karla123!');
    await page.getByRole('button', { name: 'Ingresar' }).click();
    await page.getByRole('menuitem', { name: 'Mi cuenta' }).getByText('Mi cuenta').click();
    await page.getByRole('link', { name: 'Ver mi perfil' }).click();
    await page.getByText('Editar datos').click();
    await page.locator('input[name="numero int"]').click();
    await page.locator('input[name="numero int"]').fill('234');
    await page.getByRole('button', { name: 'Guardar datos' }).click();
});