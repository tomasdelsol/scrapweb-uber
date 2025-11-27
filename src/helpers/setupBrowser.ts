import puppeteer, { Browser } from "puppeteer";
import os from "os";

export async function setupBrowser(): Promise<Browser> {
    const platform = os.platform();
    const executablePath = platform === 'darwin' 
        ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
        : '/usr/bin/google-chrome';

    return await puppeteer.launch({
        headless: false,
        executablePath,
        protocolTimeout: 120000,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-blink-features=AutomationControlled',
            '--disable-dev-shm-usage',
            '--window-size=1920,1080',
        ],
    });
}

