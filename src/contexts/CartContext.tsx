import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

interface CartItem {
  productId: number;
  sellerId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  storeName: string;
  deliveryTime: string;
  stock: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (productId: number, sellerId: number) => void;
  updateQuantity: (productId: number, sellerId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isInCart: (productId: number, sellerId: number) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cartItems');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems(prev => {
      const existingItem = prev.find(
        i => i.productId === item.productId && i.sellerId === item.sellerId
      );
      
      if (existingItem) {
        return prev.map(i =>
          i.productId === item.productId && i.sellerId === item.sellerId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number, sellerId: number) => {
    setCartItems(prev =>
      prev.filter(i => !(i.productId === productId && i.sellerId === sellerId))
    );
  };

  const updateQuantity = (productId: number, sellerId: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId, sellerId);
      toast.info('محصول از سبد خرید حذف شد', { position: "top-center" });
      return;
    }

    setCartItems(prev =>
      prev.map(item =>
        item.productId === productId && item.sellerId === sellerId
          ? {
              ...item,
              quantity: Math.min(Math.max(1, quantity), item.stock)
            }
          : item
      )
    );

  const product = cartItems.find(
    item => item.productId === productId && item.sellerId === sellerId
  );

  if (product && quantity > product.stock) {
    toast.warn(`حداکثر تعداد قابل سفارش برای این محصول ${product.stock} عدد است`, {
      position: "top-center",
      autoClose: 3000,
     });
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const isInCart = (productId: number, sellerId: number) => {
    return cartItems.some(item => item.productId === productId && item.sellerId === sellerId);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isInCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};