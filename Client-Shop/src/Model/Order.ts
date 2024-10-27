import { VariantGet } from "./Variant";

export type CreateOrderRequest = {
    //Cart restored in Database
    name: string;
    address: string;
    phone: string | null;
    paymentMethod: string | null;
    notes: string | null;
}

export type OrderGet = {
    orderId: number;
    customerName: string;
    orderDate: string;
    totalAmount: number;
    status: string | null;
    address: string;    
    phone: string | null;
    paymentMethod: string | null;
    shippingService: string | null;
    notes: string | null;
    orderDetails: OrderDetailGet[];
}

export type OrderDetailGet = {
    orderDetailId: number;
    orderId: number;
    variant: VariantGet;
    quantity: number;
    price: number;
}