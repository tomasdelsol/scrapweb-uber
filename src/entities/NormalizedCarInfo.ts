import { NormalizedPlan } from "./NormalizedPlan";

export type NormalizedCarInfo = {
    makerName: string;
    modelName: string;
    plans: NormalizedPlan[];
};