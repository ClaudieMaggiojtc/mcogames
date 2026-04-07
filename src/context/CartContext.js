import React, { createContext, useState, useCallback, useMemo } from 'react';

// Context do carrinho de compras
export const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Adiciona item ou incrementa quantidade se já existir
  const addToCart = useCallback((game) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === game.id);
      if (existing) {
        return prev.map((item) =>
          item.id === game.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...game, quantity: 1 }];
    });
  }, []);

  // Remove item completamente do carrinho
  const removeFromCart = useCallback((gameId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== gameId));
  }, []);

  // Atualiza a quantidade de um item (remove se quantidade <= 0)
  const updateQuantity = useCallback((gameId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(gameId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === gameId ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  // Limpa todo o carrinho
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // Calcula total do carrinho (memoizado para evitar recálculo desnecessário)
  const cartTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
