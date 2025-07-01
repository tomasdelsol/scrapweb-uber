import fs from "fs/promises";
import { PlanInfo } from "./entities/PlanInfo";
import { CarInfo } from "./entities/CarInfo";

async function modificarPlanes() {
    const data = await fs.readFile("uber_cars.json", "utf-8");
    const jsonData : CarInfo[] = JSON.parse(data);

    const modifiedDataPlans : CarInfo[] = jsonData.map(car => ({
        ...car,
        plans: car.plans.map(plan => ({
            ...plan,
            planNames: plan.planNames.flatMap(name => {
                const trimmedName = name.trim();

                if (trimmedName === "UberX") return ["ByFy X", "ByFy Pet", "ByFy Paquetería"];
                if (trimmedName === "Comfort") return ["ByFy Comfort"];
                if (trimmedName === "Flash Moto") return ["ByFy Moto", "ByFy Paquetería Moto"];
                return name;
            }),
        })),
    }));

    await fs.writeFile("modifiedcars.json", JSON.stringify(modifiedDataPlans, null, 2));

    console.log("Modificacion de planes realizada.");

}
modificarPlanes()