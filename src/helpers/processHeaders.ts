import { Page, ElementHandle } from "puppeteer";

const MAX_RETRIES = 2;
const HEADER_SELECTOR = 'div[data-testid="accordion-header"]';

export async function processHeaders(page: Page, headers: ElementHandle<HTMLDivElement>[]): Promise<void> {
    console.log(`✓ Encontrados ${headers.length} headers`);

    for (let i = 0; i < headers.length; i++) {
        let retryCount = 0;
        let success = false;

        while (retryCount < MAX_RETRIES && !success) {
            try {
                let currentHeader = headers[i];
                if (retryCount > 0) {
                    const currentHeaders = await page.$$(HEADER_SELECTOR);
                    if (i >= currentHeaders.length) {
                        console.log(`⚠ Header ${i + 1} ya no existe en el DOM, saltando...`);
                        break;
                    }
                    currentHeader = currentHeaders[i];
                }

                await scrollToElement(page, currentHeader);
                await clickHeader(currentHeader);
                
                if ((i + 1) % 10 === 0 || retryCount > 0) {
                    console.log(`✓ Click en header ${i + 1}/${headers.length}${retryCount > 0 ? ` (reintento ${retryCount})` : ''}`);
                }
                
                success = true;
                await waitForContent(page);
                await new Promise(resolve => setTimeout(resolve, 50));
            } catch (error: any) {
                retryCount++;
                if (retryCount >= MAX_RETRIES) {
                    console.error(`✗ Error en header ${i + 1}/${headers.length} después de ${MAX_RETRIES} intentos:`, error.message || error);
                } else {
                    await new Promise(resolve => setTimeout(resolve, 300));
                }
            }
        }
    }
}

async function scrollToElement(page: Page, element: ElementHandle<HTMLDivElement>): Promise<void> {
    const box = await element.boundingBox();
    if (box) {
        await page.evaluate((x, y) => {
            window.scrollTo({
                top: y - window.innerHeight / 2,
                left: x,
                behavior: 'auto'
            });
        }, box.x + box.width / 2, box.y + box.height / 2);
        await new Promise(resolve => setTimeout(resolve, 50));
    }
}

async function clickHeader(header: ElementHandle<HTMLDivElement>): Promise<void> {
    await Promise.race([
        header.click(),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Click timeout')), 5000))
    ]);
}

async function waitForContent(page: Page): Promise<void> {
    await page.waitForSelector('div[data-testid="markdown-wrapper"] li b', { timeout: 2000 }).catch(() => {
        // Silently continue if content not found
    });
}

