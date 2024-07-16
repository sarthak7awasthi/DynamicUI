import axios from 'axios';


const API_URL = 'http://10.0.0.233:5000/predict_order';

export const getDynamicComponentOrder = async (interactions) => {
  try {
    const response = await axios.post(API_URL, { interactions });
    const newOrder = response.data.cart_order;
   
    return newOrder;
  } catch (error) {
    console.error('Error fetching dynamic component order:', error);
    return null;
  }
};
