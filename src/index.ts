import { Browser, Page } from "puppeteer";
import fs from "fs/promises";
import { CarInfo } from "./entities/CarInfo";
import { modificarPlanes } from "./Parser";
import { modificarPlanesDesagrupados } from "./ParseModified";
import { setupBrowser } from "./helpers/setupBrowser";
import { setupCookies } from "./helpers/setupCookies";
import { setupPageSettings } from "./helpers/setupPageSettings";
import { setupAntiDetection } from "./helpers/setupAntiDetection";
import { navigateToPage } from "./helpers/navigateToPage";
import { processHeaders } from "./helpers/processHeaders";
import { extractCarData } from "./helpers/extractCarData";
import { saveDebugInfo } from "./helpers/saveDebugInfo";

const HEADER_SELECTOR = 'div[data-testid="accordion-header"]';

async function handleDynamicUberPage(): Promise<void> {
    const browser = await setupBrowser();
    const page = await browser.newPage();

    try {
        await setupCookies(page);
        await setupPageSettings(browser, page);
        await setupAntiDetection(page);

        const navigationSuccess = await navigateToPage(page);
        if (!navigationSuccess) {
            await browser.close();
            return;
        }

        const headers = await page.$$(HEADER_SELECTOR);
        await processHeaders(page, headers);

        const result = await extractCarData(page);
        console.log(`✓ Resultado: ${result.length} autos encontrados`);

        await fs.writeFile("uber_cars.json", JSON.stringify(result, null, 2), "utf-8");
        console.log("Archivo 'uber_cars.json' guardado con éxito.");

        await browser.close();

        console.log("\n🔄 Iniciando modificación de planes...");
        await modificarPlanes();
        
        console.log("\n🔄 Iniciando desagrupación de planes...");
        await modificarPlanesDesagrupados();
        
        console.log("\n✅ Proceso completo finalizado.");
    } catch (error: any) {
        console.error("✗ Error durante el proceso:", error);
        await saveDebugInfo(page, 'debug-error.png');
        await browser.close();
        throw error;
    }
}

handleDynamicUberPage();
