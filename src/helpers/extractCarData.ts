import { Page } from "puppeteer";
import { CarInfo } from "../entities/CarInfo";

const MAIN_SELECTOR = 'ul[data-testid="wcb3-accordion-component.root"] > li';

export async function extractCarData(page: Page): Promise<CarInfo[]> {
    const elementsCount = await page.$$eval(MAIN_SELECTOR, elements => elements.length);
    console.log(`✓ Encontrados ${elementsCount} elementos de autos`);

    if (elementsCount === 0) {
        throw new Error("No se encontraron elementos");
    }

    return await page.evaluate(() => {
        function parsePlansGrouped(text: string): { modelYear: string; planNames: string[]} [] {
            const entries = text.split("/").map((e) => e.trim());
            const grouped: { modelYear: string; planNames: string[]} [] = [];

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
        const dataCarsUber: {
            makerName: string;
            modelName: string;
            plans: { modelYear: string; planNames: string[] }[];
        }[] = [];

        [...carsUber].forEach((carInfo) => {
            const makerName = carInfo.querySelector('[data-testid="accordion-header"]')?.firstChild?.textContent?.trim() || '';
            const divTagsModels = carInfo.querySelector('div[data-testid="markdown-wrapper"]');
            const modelTags = divTagsModels ? divTagsModels.querySelectorAll('li') : [];

            modelTags.forEach((li) => {
                const modelName = li.querySelector('b')?.textContent?.trim() || '';
                const dataModelTags = li.textContent?.trim() || '';
                const detailInfo = dataModelTags.replace(modelName, '').trim();
                const plans = parsePlansGrouped(detailInfo);

                dataCarsUber.push({ makerName, modelName, plans });
            });
        });

        return dataCarsUber;
    });
}

