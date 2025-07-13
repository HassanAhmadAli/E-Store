import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useProductDetailsStore = create(persist((set) => ({
  quantity: 1,

  setQuantity: (quantity) => set({ quantity }),

  increaseQuantity: () => set((state) => ({ quantity: state.quantity + 1 })),
  decreaseQuantity: () => set((state) => ({ 
    quantity: Math.max(1, state.quantity - 1) 
  })),

  resetQuantity: () => set({ quantity: 1 })
}), {
  name: 'product-details-storage',
  partialize: (state) => ({
    quantity: state.quantity
  })
}));

export default useProductDetailsStore;