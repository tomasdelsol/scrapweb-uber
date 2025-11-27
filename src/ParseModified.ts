import fs from "fs/promises";
import { CarInfo } from "./entities/CarInfo";
import { PlanInfo } from "./entities/PlanInfo";
import { NormalizedCarInfo } from "./entities/NormalizedCarInfo";
import { NormalizedPlan } from "./entities/NormalizedPlan";

export function desagruparPlanes(car: CarInfo): NormalizedCarInfo {
    const desagrupadoPlans: NormalizedPlan[] = car.plans.flatMap(plan =>
    plan.planNames.map(planName => ({
        modelYear: plan.modelYear,
        planName: planName,
    }))
    );

    return {
    makerName: car.makerName,
    modelName: car.modelName,
    plans: desagrupadoPlans,
    };
}

export async function modificarPlanesDesagrupados() {
    const data = await fs.readFile("modifiedcars.json", "utf-8");
    const jsonData: CarInfo[] = JSON.parse(data);

    const modified: NormalizedCarInfo[] = jsonData.map(desagruparPlanes);

    // Envolver el resultado en un objeto con el atributo 'list'
    const result = {
        list: modified
    };

    await fs.writeFile("byfycarsdesagrupado.json", JSON.stringify(result, null, 2));
    console.log("Archivo desagrupado correctamente.");
}