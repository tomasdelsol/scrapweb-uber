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

        /*function parsePlansGrouped(text) {
        const entries = text.split("/").map((e) => e.trim());
        const grouped = [];

        entries.forEach((entry) => {
            const match = entry.match(/(\d{4})\s*\((.*?)\)/);
            if (!match) return;

            const modelYear = match[1];
            const planNames = match[2].split(",").map((s) => s.trim());

            grouped.push({ modelYear, planNames });
        });

        return grouped; 

        } */

        const carsUber = document.querySelectorAll('ul[data-testid="wcb3-accordion-component.root"] > li');
        const dataCarsUber = [];

            [...carsUber].forEach((carInfo) => {
                const markerName = carInfo.querySelector('[data-testid="accordion-header"]')?.innerText.trim() || '';;
                
                const modelTags = carInfo.querySelector('b');
                modelTags.forEach((b) => {
                    const modelName = b.innerText.trim();
                    const dataModelTags = b.parentElement?.innerText.trim() || '';
                    const detailInfo = dataModelTags.replace(modelName, '').trim();

                    const pĺans = parsePlansGrouped(detailInfo);

                    dataCarsUber.push({ markerName, modelName, plans });
                })
            });

        return dataCarsUber;

    });

    console.log(result);

    await browser.close();
}

handleDynamicUberPage();