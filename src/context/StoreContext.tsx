'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product, CartItem, SampleItem } from '@/types/flooring';

interface StoreContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, sqftCalculated?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;

  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  wishlistCount: number;

  sampleBag: SampleItem[];
  addToSampleBag: (product: Product) => { success: boolean; message: string };
  removeFromSampleBag: (productId: string) => void;
  clearSampleBag: () => void;
  isInSampleBag: (productId: string) => boolean;
  sampleBagCount: number;
  freeSamplesRemaining: number;

  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;

  isSampleBagOpen: boolean;
  setIsSampleBagOpen: (open: boolean) => void;

  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  isCheckoutModalOpen: boolean;
  setIsCheckoutModalOpen: (open: boolean) => void;

  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  visualizerProduct: Product | null;
  setVisualizerProduct: (product: Product | null) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const MAX_FREE_SAMPLES = 5;

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [sampleBag, setSampleBag] = useState<SampleItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSampleBagOpen, setIsSampleBagOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [visualizerProduct, setVisualizerProduct] = useState<Product | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('quick_floors_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem('quick_floors_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedSamples = localStorage.getItem('quick_floors_samples');
      if (savedSamples) setSampleBag(JSON.parse(savedSamples));
    } catch {
      // safe fallback
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('quick_floors_cart', JSON.stringify(cart));
      localStorage.setItem('quick_floors_wishlist', JSON.stringify(wishlist));
      localStorage.setItem('quick_floors_samples', JSON.stringify(sampleBag));
    } catch {
      // safe
    }
  }, [cart, wishlist, sampleBag, isLoaded]);

  // Cart operations
  const addToCart = (product: Product, quantity = 1, sqftCalculated?: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity, sqftCalculated: sqftCalculated ?? item.sqftCalculated }
            : item
        );
      }
      return [...prev, { product, quantity, sqftCalculated }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartSubtotal = cart.reduce((sum, item) => {
    // If coverage per box is available and price is per sq.ft, item price is box cost
    const itemPrice = item.product.coveragePerBox && item.product.unit === 'Sq.ft'
      ? item.product.price * item.product.coveragePerBox
      : item.product.price;
    return sum + itemPrice * item.quantity;
  }, 0);

  // Wishlist operations
  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (productId: string) => wishlist.some((p) => p.id === productId);
  const wishlistCount = wishlist.length;

  // Sample bag operations (Authentic Quick Floors 5 free samples policy)
  const addToSampleBag = (product: Product) => {
    if (!product.freeSampleEligible) {
      return { success: false, message: 'This item is not eligible for free samples.' };
    }
    const alreadyIn = sampleBag.some((s) => s.product.id === product.id);
    if (alreadyIn) {
      return { success: false, message: 'Sample already in your bag.' };
    }
    setSampleBag((prev) => [...prev, { product, addedAt: Date.now() }]);
    setIsSampleBagOpen(true);
    return {
      success: true,
      message: sampleBag.length < MAX_FREE_SAMPLES
        ? 'Free sample added to your bag!'
        : 'Additional sample added ($20 outside GTA / small surcharge)',
    };
  };

  const removeFromSampleBag = (productId: string) => {
    setSampleBag((prev) => prev.filter((s) => s.product.id !== productId));
  };

  const clearSampleBag = () => setSampleBag([]);

  const isInSampleBag = (productId: string) => sampleBag.some((s) => s.product.id === productId);
  const sampleBagCount = sampleBag.length;
  const freeSamplesRemaining = Math.max(0, MAX_FREE_SAMPLES - sampleBagCount);

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotal,

        wishlist,
        toggleWishlist,
        isInWishlist,
        wishlistCount,

        sampleBag,
        addToSampleBag,
        removeFromSampleBag,
        clearSampleBag,
        isInSampleBag,
        sampleBagCount,
        freeSamplesRemaining,

        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isSampleBagOpen,
        setIsSampleBagOpen,
        isSearchOpen,
        setIsSearchOpen,
        isCheckoutModalOpen,
        setIsCheckoutModalOpen,
        quickViewProduct,
        setQuickViewProduct,
        visualizerProduct,
        setVisualizerProduct,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
