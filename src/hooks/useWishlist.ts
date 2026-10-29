import { useStore } from '@/context/StoreContext';

export function useWishlist() {
  const {
    wishlist,
    toggleWishlist,
    isInWishlist,
    wishlistCount,
    isWishlistOpen,
    setIsWishlistOpen,
  } = useStore();

  return {
    wishlist,
    toggleWishlist,
    isInWishlist,
    wishlistCount,
    isWishlistOpen,
    openWishlist: () => setIsWishlistOpen(true),
    closeWishlist: () => setIsWishlistOpen(false),
  };
}
