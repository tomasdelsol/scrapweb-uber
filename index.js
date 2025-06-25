import puppeteer from "puppeteer";
import fs from "fs/promises";

async function handleDynamicUberPage() {

    const browser = await puppeteer.launch({
        headless: true,
        executablePath: '/usr/bin/google-chrome',
        //slowMo: 300,
    })

    const page = await browser.newPage();

    await page.goto("https://www.uber.com/global/en/eligible-vehicles/?city=bahia-blanca");

    const headers = await page.$$('div[data-testid="accordion-header"]');
    for (const header of headers) {
    await header.click();
    await page.waitForSelector('div[data-testid="markdown-wrapper"] li b');
    await new Promise(resolve => setTimeout(resolve, 500));
    }



    const result = await page.evaluate(() => {

        function parsePlansGrouped(text) {
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
        } 

        const carsUber = document.querySelectorAll('ul[data-testid="wcb3-accordion-component.root"] > li');
        const dataCarsUber = [];

            [...carsUber].forEach((carInfo) => {
                const makerName = carInfo.querySelector('[data-testid="accordion-header"]')?.innerText.trim() || '';

                const divTagsModels = carInfo.querySelector('div[data-testid="markdown-wrapper"]');

                const modelTags = divTagsModels ? divTagsModels.querySelectorAll('li') : [];

                modelTags.forEach((li) => {
                    const modelName = li.querySelector('b')?.innerText.trim() || '';
                    const dataModelTags = li.innerText.trim();
                    const detailInfo = dataModelTags.replace(modelName, '').trim();

                    const plans = parsePlansGrouped(detailInfo);

                    dataCarsUber.push({ makerName, modelName, plans });
                })
            });

        return dataCarsUber;

    });

    console.log(result);

    await fs.writeFile("uber_cars.json", JSON.stringify(result, null, 2), "utf-8");
    console.log("Archivo 'uber_cars.json' guardado con éxito.");

    await browser.close();
}

handleDynamicUberPage();