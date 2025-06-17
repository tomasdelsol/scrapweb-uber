import puppeteer from "puppeteer";
import fs from "fs/promises";

async function handleDynamicUberPage() {

    const browser = await puppeteer.launch({
        headless: false,
        executablePath: '/usr/bin/google-chrome',
        slowMo: 300,
    })

    const page = await browser.newPage();

    await page.goto("https://www.uber.com/global/en/eligible-vehicles/?city=bahia-blanca");

    const result = await page.evaluate(() => {
        const carsUber = document.querySelectorAll('div [data-testid = "accordion-header"]');
        const dataCarsUber = [...carsUber].map((accordion-header) => {
            const carMark = accordion-header.querySelector() 
        });
        return dataCarsUber;
    });
    console.log(result);

    await browser.close();
}

handleDynamicUberPage();