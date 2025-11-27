import { Page } from "puppeteer";
import { saveDebugInfo } from "./saveDebugInfo";

const UBER_URL = "https://www.uber.com/ar/es/eligible-vehicles/?city=buenos-aires";
const HEADER_SELECTOR = 'div[data-testid="accordion-header"]';

export async function navigateToPage(page: Page): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    await page.goto(UBER_URL, {
        waitUntil: 'networkidle2',
        timeout: 60000
    });
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
        await page.waitForSelector(HEADER_SELECTOR, { timeout: 10000 });
        console.log("✓ Headers encontrados");
        return true;
    } catch (error) {
        console.error("✗ No se encontraron los headers:", error);
        await saveDebugInfo(page, 'debug-screenshot.png');
        return false;
    }
}

