import { PageObject } from "./Common";

export type SupplierGet = {
    supplierId: number;
    name: string;
    notes: string;
    phone: string;
    status: boolean;
    email: string;
    address: string;
}

export type SupplierResponse = {
    items: SupplierGet[];
    page: PageObject;
}

export type SupplierPost = {
    name: string;
    email: string;
    phone: string;
    address: string;
    status: boolean;
    notes: string;
}

export type SupplierPut = {
    name: string;
    email: string;
    phone: string;
    address: string;
    status: boolean;
    notes: string;
}