import { Page } from "puppeteer";
import fs from "fs/promises";

export async function saveDebugInfo(page: Page, screenshotPath: string): Promise<void> {
    await page.screenshot({ path: screenshotPath as `${string}.png`, fullPage: true });
    const content = await page.content();
    await fs.writeFile('debug-page-content.html', content);
    console.log("Screenshot y contenido guardados para debug");
}

