import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import React, { useEffect } from 'react';
import { useLoading } from '../../hooks/useLoading';
import { pay } from '../../services/orderService';
import { useCart } from '../../hooks/useCart';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function PaypalButtons({ order }) {
  const exchangeRate = 0.012; 
  const convertedPrice = (order.totalPrice * exchangeRate).toFixed(2);

  return (
    <PayPalScriptProvider
      options={{
        clientId:
          'Af4J2R9SlmNGx7OhunSHQQyUtDyR3p4K247IH035K0njx4JPcsM7VG3pZ2BcKGQ9tknH6Se_bO-HdEH7',
      }}
    >
      <Buttons order={order} convertedPrice={convertedPrice} />
    </PayPalScriptProvider>
  );
}

function Buttons({ order, convertedPrice }) {
  const { clearCart } = useCart();
  const navigate = useNavigate();
  const [{ isPending }] = usePayPalScriptReducer();
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    isPending ? showLoading() : hideLoading();
  });

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: convertedPrice,
          },
        },
      ],
    });
  };

  const onApprove = async (data, actions) => {
    try {
      const payment = await actions.order.capture();
      const orderId = await pay(payment.id);
      clearCart();
      toast.success('Payment Saved Successfully', 'Success');
      navigate('/track/' + orderId);
    } catch (error) {
      toast.error('Payment Save Failed', 'Error');
    }
  };

  const onError = (err) => {
    toast.error('Payment Failed', 'Error');
  };

  return (
    <PayPalButtons
      createOrder={createOrder}
      onApprove={onApprove}
      onError={onError}
    />
  );
}
