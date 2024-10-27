import React, { useEffect } from 'react';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { CreateOrderRequest } from '../../Model/Order';
import { ORDER_API } from '../../Utils/constant';

export type Props = {
    orderPost: CreateOrderRequest,
    idUser: number,
}

const MyPayPalButton = ({ orderPost, idUser } : Props) => {
    return (
        <div>
            <PayPalButton
                createOrder={async (data: any, actions: any) => {
                    try {
                        const response = await axios.post(`${ORDER_API}/checkout/create-paypal-order/${idUser}`);
                        if (response.status !== 200) {
                            throw new Error('Failed to create order');
                        }
                        console.log(response.data.id);
                        return response.data.id;
                    } catch (error: any) {
                        alert(error.message);
                    }
                }}
                onApprove={async (data: any, actions: any) => {
                    try {
                        const response = await axios.post(`${ORDER_API}/checkout/`+ 
                            `capture-paypal-order/${data.orderID}/user/${idUser}`, orderPost);
                        if (response.status !== 200) {
                            throw new Error('Failed to capture order');
                        }
                        //Handle success
                    } catch (error: any) {
                        alert(error.message);
                    }
                }}
            />
        </div>
    );
};

export default MyPayPalButton;
