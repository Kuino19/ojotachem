'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Chemical, CartItem, DeliveryType, Order } from '../types';

interface CartContextType {
  items: CartItem[];
  addToCart: (chemical: Chemical, quantity?: number) => void;
  removeFromCart: (chemicalId: string) => void;
  updateQuantity: (chemicalId: string, quantity: number) => void;
  clearCart: () => void;
  deliveryType: DeliveryType;
  setDeliveryType: (type: DeliveryType) => void;
  deliveryFee: number;
  subtotal: number;
  totalAmount: number;
  totalItemsCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  selectedChemical: Chemical | null;
  setSelectedChemical: (chemical: Chemical | null) => void;
  lastOrder: Order | null;
  setLastOrder: (order: Order | null) => void;
  isOrderSuccessOpen: boolean;
  setIsOrderSuccessOpen: (open: boolean) => void;
  isTrackModalOpen: boolean;
  setIsTrackModalOpen: (open: boolean) => void;
  isRfqModalOpen: boolean;
  isAccountOpen: boolean;
  setIsAccountOpen: (open: boolean) => void;
  setIsRfqModalOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [deliveryType, setDeliveryType] = useState<DeliveryType>('ojota_pickup');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedChemical, setSelectedChemical] = useState<Chemical | null>(null);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState(false);
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [isRfqModalOpen, setIsRfqModalOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ojotachem_cart');
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {
      // Ignore local storage error in SSR
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ojotachem_cart', JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const addToCart = (chemical: Chemical, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.chemical.id === chemical.id);
      if (existing) {
        return prev.map((item) =>
          item.chemical.id === chemical.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { chemical, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (chemicalId: string) => {
    setItems((prev) => prev.filter((item) => item.chemical.id !== chemicalId));
  };

  const updateQuantity = (chemicalId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(chemicalId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.chemical.id === chemicalId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getDeliveryFee = (type: DeliveryType): number => {
    switch (type) {
      case 'ojota_pickup':
        return 0; // FREE Onsite Depot Pickup at Ojota Market
      case 'lagos_mainland':
        return 4500; // Ikeja, Oshodi, Maryland, Ikorodu, Surulere, Yaba
      case 'lagos_island':
        return 7500; // Lekki, Victoria Island, Ikoyi, Ajah
      case 'interstate_freight':
        return 18000; // Nationwide Waybill from Ojota Motor Park / Cargo
      default:
        return 0;
    }
  };

  const deliveryFee = getDeliveryFee(deliveryType);

  const subtotal = items.reduce(
    (sum, item) => sum + item.chemical.priceNgn * item.quantity,
    0
  );

  const totalAmount = subtotal + (items.length > 0 ? deliveryFee : 0);

  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        deliveryType,
        setDeliveryType,
        deliveryFee,
        subtotal,
        totalAmount,
        totalItemsCount,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        selectedChemical,
        setSelectedChemical,
        lastOrder,
        setLastOrder,
        isOrderSuccessOpen,
        setIsOrderSuccessOpen,
        isTrackModalOpen,
        setIsTrackModalOpen,
        isRfqModalOpen,
        setIsRfqModalOpen,
        isAccountOpen,
        setIsAccountOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
