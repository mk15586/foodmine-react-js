import axios from 'axios';

export const createOrder = async order => {
  try {
    const { data } = axios.post('/api/orders/create', order);
    return data;
  } catch (error) {}
};

export const getNewOrderForCurrentUser = async () => {
  const {data} = await axios.get('/api/orders/newOrderForCurrentUser');
  return data;
};

export const pay = async paymentID => {
  try {
    const {data} = await axios.put('/api/orders/pay',{paymentID});
    return data;
  } catch (error){}
};

export const trackOrderById = async orderId => {
  const { data } = await axios.get('/api/orders/track/' + orderId);
  return data;
};