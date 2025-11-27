import { Browser, Page } from "puppeteer";

const BUENOS_AIRES_COORDS = {
    latitude: -34.6037,
    longitude: -58.3816,
    accuracy: 100
};

export async function setupPageSettings(browser: Browser, page: Page): Promise<void> {
    const context = browser.defaultBrowserContext();
    await context.overridePermissions('https://www.uber.com', ['geolocation']);
    
    await page.setGeolocation(BUENOS_AIRES_COORDS);
    await page.emulateTimezone('America/Argentina/Buenos_Aires');
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    await page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1,
    });
    
    await page.setExtraHTTPHeaders({
        'Accept-Language': 'es-AR,es;q=0.9,en;q=0.8',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Cache-Control': 'max-age=0',
        'X-Forwarded-For': '190.0.0.0',
    });
}

