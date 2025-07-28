'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ 
    items: [], 
    total: 0,
    totalItems: 0,
    totalPrice: 0 
  });
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  const fetchCart = async () => {
    if (!session) return;
    
    try {
      const res = await fetch('/api/cart');
      if (!res.ok) throw new Error('Failed to fetch cart');
      
      const data = await res.json();
      if (data) {
        const totalItems = data.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
        const totalPrice = data.items?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0;
        
        setCart({
          items: data.items || [],
          total: totalPrice,
          totalItems,
          totalPrice
        });
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    try {
      if (!product || !product._id) {
        throw new Error('Invalid product data');
      }

      // Ensure we have a valid image URL
      const imageUrl = product.image || 
                     (product.images && product.images[0]) || 
                     null;

      const productData = {
        productId: product._id,
        name: product.name || 'Unnamed Product',
        price: parseFloat(product.price) || 0,
        image: imageUrl,
        quantity: Math.max(1, parseInt(quantity, 10))
      };

      console.log('Prepared cart item:', productData);

      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error('Failed to add to cart:', errorData);
        return { 
          success: false, 
          error: errorData.error || 'Failed to add to cart',
          details: errorData
        };
      }

      const data = await res.json();
      console.log('Cart update successful:', data);
      
      // Calculate totals based on the returned items
      const items = data.items || [];
      const totalItems = items.reduce((sum, item) => sum + (item.quantity || 0), 0);
      const totalPrice = items.reduce((sum, item) => {
        return sum + ((item.price || 0) * (item.quantity || 0));
      }, 0);

      const updatedCart = {
        items,
        total: totalPrice,
        totalItems,
        totalPrice
      };

      console.log('Updating cart state:', updatedCart);
      setCart(updatedCart);
      return { success: true, data: updatedCart };
    } catch (error) {
      console.error('Error adding to cart:', error);
      return { success: false, error: error.message };
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const res = await fetch('/api/cart/items', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to remove item from cart');
      }
      
      const data = await res.json();
      
      // Update cart state with the server response
      const updatedCart = {
        items: data.items || [],
        total: data.totalPrice || 0,
        totalItems: data.totalItems || 0,
        totalPrice: data.totalPrice || 0
      };
      
      setCart(updatedCart);
      return { 
        success: true, 
        data: updatedCart 
      };
      
    } catch (error) {
      console.error('Error removing from cart:', error);
      
      // Re-fetch cart to ensure consistency
      if (session) {
        await fetchCart();
      }
      
      return { 
        success: false, 
        error: error.message || 'Failed to remove item from cart' 
      };
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    // Ensure quantity is a valid number
    const quantity = Math.max(0, Math.min(100, Number(newQuantity) || 1));
    
    // If quantity is 0 or less, remove the item from cart
    if (quantity <= 0) {
      return await removeFromCart(productId);
    }

    try {
      // Optimistic UI update
      setCart(prevCart => {
        const updatedItems = prevCart.items.map(item => 
          item.productId === productId 
            ? { ...item, quantity }
            : item
        );
        
        const totalItems = updatedItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
        const totalPrice = updatedItems.reduce((sum, item) => 
          sum + (parseFloat(item.price) * (item.quantity || 0)), 0);
        
        return {
          ...prevCart,
          items: updatedItems,
          total: totalPrice,
          totalItems,
          totalPrice
        };
      });

      const res = await fetch('/api/cart/items', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          productId, 
          quantity,
          _t: Date.now() // Cache buster
        }),
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to update quantity');
      }
      
      const data = await res.json();
      
      // Update with server response
      setCart({
        items: data.items || [],
        total: data.totalPrice || 0,
        totalItems: data.totalItems || 0,
        totalPrice: data.totalPrice || 0
      });
      
      return { 
        success: true,
        data: data
      };
      
    } catch (error) {
      console.error('Error updating quantity:', error);
      
      // Re-fetch cart to ensure consistency
      if (session) {
        await fetchCart();
      }
      
      return { 
        success: false, 
        error: error.message || 'Failed to update quantity' 
      };
    }
  };

  const clearCart = async () => {
    try {
      const res = await fetch('/api/cart', {
        method: 'DELETE',
      });
      
      if (res.ok) {
        setCart({ items: [], total: 0, totalItems: 0, totalPrice: 0 });
        return { success: true };
      }
      return { success: false };
    } catch (error) {
      console.error('Error clearing cart:', error);
      return { success: false };
    }
  };

  // Initialize cart when session changes
  useEffect(() => {
    if (session) {
      fetchCart();
    } else {
      setCart({ items: [], total: 0, totalItems: 0, totalPrice: 0 });
      setLoading(false);
    }
  }, [session]);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount: cart.totalItems,
        cartTotal: cart.totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
