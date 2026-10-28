import React, { createContext, useContext, useState } from 'react';
import { CartItem, CoffeeItem, CustomizationOption, RedeemedVoucher } from '../types';
import { useMember } from './MemberContext';

interface CartContextType {
  cart: CartItem[];
  addToCart: (coffee: CoffeeItem, customization?: CustomizationOption, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  appliedVoucher: RedeemedVoucher | null;
  applyVoucher: (voucher: RedeemedVoucher | null) => void;
  subtotal: number;
  discountAmount: number;
  tierDiscountAmount: number;
  finalTotal: number;
  pointsToEarn: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isReservationModalOpen: boolean;
  setIsReservationModalOpen: (open: boolean) => void;
  isMemberModalOpen: boolean;
  setIsMemberModalOpen: (open: boolean) => void;
  isRewardsModalOpen: boolean;
  setIsRewardsModalOpen: (open: boolean) => void;
  selectedCoffeeForDetail: CoffeeItem | null;
  setSelectedCoffeeForDetail: (coffee: CoffeeItem | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { member, tierInfo } = useMember();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [appliedVoucher, setAppliedVoucher] = useState<RedeemedVoucher | null>(null);

  // Modals & Panels
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [isRewardsModalOpen, setIsRewardsModalOpen] = useState(false);
  const [selectedCoffeeForDetail, setSelectedCoffeeForDetail] = useState<CoffeeItem | null>(null);

  const addToCart = (
    coffee: CoffeeItem,
    customization: CustomizationOption = { temperature: 'hot', milkType: 'regular' },
    quantity = 1
  ) => {
    // Generate distinct ID based on customization
    const customKey = `${coffee.id}-${customization.temperature || ''}-${customization.milkType || ''}-${customization.grindChoice || ''}`;
    let unitPrice = coffee.price;
    if (customization.milkType === 'oat') {
      // Oatly upgrade +20
      unitPrice += 20;
    }

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === customKey);
      if (existingIndex > -1) {
        const next = [...prev];
        const updatedQty = next[existingIndex].quantity + quantity;
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: updatedQty,
          subtotal: updatedQty * unitPrice,
        };
        return next;
      } else {
        return [
          ...prev,
          {
            id: customKey,
            coffee,
            quantity,
            customization,
            unitPrice,
            subtotal: unitPrice * quantity,
          },
        ];
      }
    });

    // Auto open cart drawer to give immediate positive feedback
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            return {
              ...item,
              quantity: newQty,
              subtotal: item.unitPrice * newQty,
            };
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedVoucher(null);
  };

  const applyVoucher = (voucher: RedeemedVoucher | null) => {
    setAppliedVoucher(voucher);
  };

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.subtotal, 0);

  // Member Tier discount (e.g. 5% silver, 10% gold, 15% VIP)
  const tierRate = member ? tierInfo.discountRate : 0;
  const tierDiscountAmount = Math.round(subtotal * tierRate);

  // Voucher discount
  let voucherDiscount = 0;
  if (appliedVoucher && appliedVoucher.discountValue) {
    voucherDiscount = Math.min(subtotal - tierDiscountAmount, appliedVoucher.discountValue);
  }

  const discountAmount = tierDiscountAmount + voucherDiscount;
  const finalTotal = Math.max(0, subtotal - discountAmount);

  // Points earned: Base 1 pt per $10, scaled by tier
  const tierMultiplier = member?.tier === 'AMBER_VIP' ? 2 : member?.tier === 'GOLD' ? 1.5 : member?.tier === 'SILVER' ? 1.2 : 1;
  const pointsToEarn = Math.floor((finalTotal / 10) * tierMultiplier);

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        appliedVoucher,
        applyVoucher,
        subtotal,
        discountAmount,
        tierDiscountAmount,
        finalTotal,
        pointsToEarn,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        isReservationModalOpen,
        setIsReservationModalOpen,
        isMemberModalOpen,
        setIsMemberModalOpen,
        isRewardsModalOpen,
        setIsRewardsModalOpen,
        selectedCoffeeForDetail,
        setSelectedCoffeeForDetail,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
