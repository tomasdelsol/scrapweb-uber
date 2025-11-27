import { Page } from "puppeteer";

export async function setupAntiDetection(page: Page): Promise<void> {
    await page.evaluateOnNewDocument(() => {
        Object.defineProperty(navigator, 'webdriver', {
            get: () => undefined,
        });

        Object.defineProperty(navigator, 'plugins', {
            get: () => [1, 2, 3, 4, 5],
        });

        Object.defineProperty(navigator, 'languages', {
            get: () => ['es-AR', 'es', 'en'],
        });

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition = function(success: any, error: any, options: any) {
                if (success) {
                    success({
                        coords: {
                            latitude: -34.6037,
                            longitude: -58.3816,
                            accuracy: 100,
                            altitude: null,
                            altitudeAccuracy: null,
                            heading: null,
                            speed: null
                        },
                        timestamp: Date.now()
                    });
                }
            };
        }

        (window as any).chrome = {
            runtime: {},
        };
    });
}

