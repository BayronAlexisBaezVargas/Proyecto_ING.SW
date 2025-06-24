// frontend/src/context/CartContext.js

import React, { createContext, useState, useContext } from 'react';
import { message } from 'antd';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartVisible, setIsCartVisible] = useState(false);

    const openCart = () => setIsCartVisible(true);
    const closeCart = () => setIsCartVisible(false);

    const addItem = (item, type) => {
        const yaExiste = cartItems.some(cartItem => cartItem.id === item.id);
        if (yaExiste) {
            message.warning('Este producto ya está en tu carrito.');
            return;
        }

        const price = parseFloat((item.precio || item.precioPorDia).replace(/[$.]/g, ''));
        const newItem = { ...item, type, price, days: 1 };

        setCartItems(prevItems => [...prevItems, newItem]);
        message.success(`${item.nombre} ha sido añadido al carrito.`);
        openCart();
    };

    const removeItem = (id) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
        message.info('Producto eliminado del carrito.');
    };

    const updateItemDays = (id, days) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, days: days } : item
            )
        );
    };

    // 1. Nueva función para vaciar el carrito
    const clearCart = () => {
        setCartItems([]);
    };

    const total = cartItems.reduce((sum, item) => {
        return sum + (item.price * (item.days || 1));
    }, 0);

    const value = {
        cartItems,
        addItem,
        removeItem,
        isCartVisible,
        openCart,
        closeCart,
        updateItemDays,
        total,
        clearCart, // 2. La exportamos para que otros componentes puedan usarla
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};
