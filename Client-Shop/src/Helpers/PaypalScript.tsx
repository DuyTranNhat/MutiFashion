import React, { useEffect } from 'react';

const PayPalScript = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = `https://sandbox.paypal.com/sdk/js?client-id=${import.meta.env.VITE_REACT_APP_PAYPAL_CLIENT_ID}`;
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return null;
};

export default PayPalScript;
