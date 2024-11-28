import { PageObject } from "./Common";

export interface TopVariant {
    variantId: number;
    name: string;
    totalQuantity: number;
}

export interface GetListVariantChart {
    id: number;
    name: string;
    supplierName: string;
    salePrice: number;
    totalQuantity: number;
}


export class RangeDate {
    top: number;
    startDate: string;
    endDate: string;

    /**
     *
     */
    constructor(   _top: number,
        _startDate: string,
        _endDate: string) {
        this.top = _top
        this.startDate = _startDate;
        this.endDate = _endDate;
        
    }
}

export class RangeDateNoTop {
    startDate: string;
    endDate: string;

    constructor(_startDate: string,
        _endDate: string
    )
    {
        this.startDate = _startDate;
        this.endDate = _endDate;
    }
}

export  interface ResponseListVariantNoTop{
    page: PageObject,
    items: GetListVariantChart[]
}

export  interface ResponseListVariantNoTop{
    page: PageObject,
    items: GetListVariantChart[]
}


export  interface ResponseListOrderMonthly{
    yearReport:YearReport[]
}

export interface YearReport {
    oderMonth: number;
    totalAmount: number;
}

export interface Order {
    orderId: number;
    customerId: number;
    orderDate: string;
    totalAmount: number;
    status: string | null;
    address: string;
    phone: string | null;
    paymentMethod: string | null;
    notes: string | null;
}


export interface ResponseListOrder {
    page:PageObject,
    items:Order[]
}
