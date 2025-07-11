import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useCartStore = create(persist(
  (set, get) => ({
    cart: [],
    addToCart: (product) => {
      const exists = get().cart.find(p => p.id === product.id)
      if (!exists) {
        set(state => ({ cart: [...state.cart, product] }))
      }
    },
    removeFromCart: (id) =>
      set(state => ({ cart: state.cart.filter(p => p.id !== id) })),
    clearCart: () => set({ cart: [] }),
  }),
  { name: 'cart-storage' }
))

export default useCartStore
