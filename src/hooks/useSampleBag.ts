import { useStore } from '@/context/StoreContext';

export function useSampleBag() {
  const {
    sampleBag,
    addToSampleBag,
    removeFromSampleBag,
    clearSampleBag,
    isInSampleBag,
    sampleBagCount,
    freeSamplesRemaining,
    isSampleBagOpen,
    setIsSampleBagOpen,
  } = useStore();

  return {
    sampleBag,
    addToSampleBag,
    removeFromSampleBag,
    clearSampleBag,
    isInSampleBag,
    sampleBagCount,
    freeSamplesRemaining,
    isSampleBagOpen,
    openSampleBag: () => setIsSampleBagOpen(true),
    closeSampleBag: () => setIsSampleBagOpen(false),
  };
}
