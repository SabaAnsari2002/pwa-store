import axios from 'axios';

interface OrderItem {
  id: number;
  product: {
    id: number;
    name: string;
    image?: string;
  };
  product_id: number;
  quantity: number;
  price: number;
  seller: {
    id: number;
    shop_name: string;
  };
}

interface Order {
  id: number;
  user: {
    id: number;
    username: string;
  };
  items: OrderItem[];
  total_price: number;
  status: string;
  created_at: string;
}

interface CheckoutItem {
  product_id: number;
  quantity: number;
  seller_id?: number;
}


const API_URL = 'http://localhost:8000/api/orders';

export const getOrders = async (): Promise<Order[]> => {
  try {
    const response = await axios.get(`${API_URL}/by-seller/`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching seller orders:', error);
    throw error;
  }
};


export const getOrderDetails = async (orderId: number): Promise<Order> => {
  try {
    const response = await axios.get(`${API_URL}/${orderId}/details/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching order details:', error);
    throw error;
  }
};

export const checkoutOrder = async (items: CheckoutItem[]) => {
  const response = await axios.post(
    `${API_URL}/checkout/`,
    { items },
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    }
  );
  return response.data;
};

export const updateOrderStatus = async (orderId: number, newStatus: string): Promise<void> => {
  try {
    await axios.patch(`${API_URL}/${orderId}/update-status/`, { status: newStatus });
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};

export const deleteOrder = async (orderId: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${orderId}/`);
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
};