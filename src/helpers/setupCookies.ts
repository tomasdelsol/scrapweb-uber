import { Page } from "puppeteer";
import { getUberCookies } from "./getUberCookies";

export async function setupCookies(page: Page): Promise<void> {
    const cookies = getUberCookies();
    await page.setCookie(...cookies);
    console.log(`✓ ${cookies.length} cookies de Uber importadas`);
}

