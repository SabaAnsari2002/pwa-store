import React, { useState } from 'react';
import { CSSProperties } from 'react';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

interface CartProps {
}

interface CartStyles {
    container: CSSProperties;
    header: CSSProperties;
    cartContainer: CSSProperties;
    itemContainer: CSSProperties;
    itemImage: CSSProperties;
    itemDetails: CSSProperties;
    itemName: CSSProperties;
    itemPrice: CSSProperties;
    quantityControls: CSSProperties;
    quantityButton: CSSProperties;
    quantityInput: CSSProperties;
    removeButton: CSSProperties;
    summary: CSSProperties;
    checkoutButton: CSSProperties;
    emptyCart: CSSProperties;
}

const ShoppingCart: React.FC<CartProps> = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([
        {
            id: 1,
            name: 'محصول نمونه ۱',
            price: 120000,
            quantity: 1,
            image: 'https://via.placeholder.com/80',
        },
        {
            id: 2,
            name: 'محصول نمونه ۲',
            price: 85000,
            quantity: 2,
            image: 'https://via.placeholder.com/80',
        },
        {
            id: 3,
            name: 'محصول نمونه ۳',
            price: 45000,
            quantity: 1,
            image: 'https://via.placeholder.com/80',
        },
    ]);

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const increaseQuantity = (id: number) => {
        setCartItems(
            cartItems.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decreaseQuantity = (id: number) => {
        setCartItems(
            cartItems.map((item) =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    const removeItem = (id: number) => {
        setCartItems(cartItems.filter((item) => item.id !== id));
    };

    const styles: CartStyles = {
        container: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '20px',
            fontFamily: 'Arial, sans-serif',
        },
        header: {
            backgroundColor: '#00509D',
            color: '#FFFFFF',
            padding: '20px',
            borderRadius: '8px 8px 0 0',
            marginBottom: '0',
        },
        cartContainer: {
            border: '1px solid #E5E5E5',
            borderRadius: '8px',
            overflow: 'hidden',
        },
        itemContainer: {
            display: 'flex',
            alignItems: 'center',
            padding: '20px',
            borderBottom: '1px solid #E5E5E5',
            backgroundColor: '#FFFFFF',
        },
        itemImage: {
            width: '80px',
            height: '80px',
            objectFit: 'cover',
            marginLeft: '20px',
            borderRadius: '4px',
        },
        itemDetails: {
            flex: 1,
        },
        itemName: {
            fontSize: '18px',
            fontWeight: 'bold',
            marginBottom: '5px',
            color: '#00296B',
        },
        itemPrice: {
            color: '#00509D',
            fontWeight: 'bold',
        },
        quantityControls: {
            display: 'flex',
            alignItems: 'center',
            marginTop: '10px',
        },
        quantityButton: {
            backgroundColor: '#FDC500',
            border: 'none',
            color: '#000000',
            width: '30px',
            height: '30px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
        },
        quantityInput: {
            width: '40px',
            textAlign: 'center' as const,
            margin: '0 10px',
            border: '1px solid #E5E5E5',
            borderRadius: '4px',
            padding: '5px',
        },
        removeButton: {
            backgroundColor: 'transparent',
            border: 'none',
            color: '#FF0000',
            cursor: 'pointer',
            marginRight: '20px',
        },
        summary: {
            backgroundColor: '#00296B',
            color: '#FFFFFF',
            padding: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        checkoutButton: {
            backgroundColor: '#FDC500',
            color: '#000000',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '16px',
        },
        emptyCart: {
            padding: '40px',
            textAlign: 'center' as const,
            backgroundColor: '#FFFFFF',
            color: '#00296B',
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>سبد خرید شما</h1>

            <div style={styles.cartContainer}>
                {cartItems.length === 0 ? (
                    <div style={styles.emptyCart}>
                        <h2>سبد خرید شما خالی است</h2>
                        <p>می‌توانید از فروشگاه ما محصولات مورد نظر خود را انتخاب کنید</p>
                    </div>
                ) : (
                    <>
                        {cartItems.map((item) => (
                            <div key={item.id} style={styles.itemContainer}>
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    style={styles.itemImage}
                                />
                                <div style={styles.itemDetails}>
                                    <h3 style={styles.itemName}>{item.name}</h3>
                                    <p style={styles.itemPrice}>
                                        {item.price.toLocaleString()} تومان
                                    </p>
                                    <div style={styles.quantityControls}>
                                        <button
                                            style={styles.quantityButton}
                                            onClick={() => decreaseQuantity(item.id)}
                                        >
                                            -
                                        </button>
                                        <input
                                            type="text"
                                            value={item.quantity}
                                            readOnly
                                            style={styles.quantityInput}
                                        />
                                        <button
                                            style={styles.quantityButton}
                                            onClick={() => increaseQuantity(item.id)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <button
                                    style={styles.removeButton}
                                    onClick={() => removeItem(item.id)}
                                >
                                    حذف
                                </button>
                            </div>
                        ))}

                        <div style={styles.summary}>
                            <h2>جمع کل: {total.toLocaleString()} تومان</h2>
                            <button style={styles.checkoutButton}>تکمیل سفارش</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ShoppingCart;