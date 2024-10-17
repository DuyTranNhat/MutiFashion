export interface AttributeGet {
    optionID: number;
    name: string;
    activeFilter: boolean;
    values: ValueGet[];
}

export interface ValueGet {
    valueId: number;
    value: string;
}

    
export type AttributeUpdate = {
    name: string,
    values: VallueUpdate[]
}


export type VallueUpdate = {
    valueId: number | null,
    value: string,
    status: boolean
    
}

export type AttributePost = {
    name: string,
    values: ValuePost[]
}

export type ValuePost = {
    value: string,
}


