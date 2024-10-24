import { PageObject } from "./Common";

export interface AttributeGet {
    optionID: number;
    name: string;
    activeFilter: boolean;
    values: ValueGet[];
}

export type AttributeResponse = {
    items: AttributeGet[],
    page: PageObject,
}

export interface ValueGet {
    valueId: number;
    value: string;
}