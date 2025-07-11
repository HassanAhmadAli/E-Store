import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useOrderStore = create(persist(
  (set) => ({
    orders: [],
    placeOrder: (items) => {
      const total = items.reduce((sum, p) => sum + p.price, 0)
      const newOrder = {
        id: `ORD-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        status: 'Processing',
        items,
        total,
      }
      set(state => ({
        orders: [...state.orders, newOrder]
      }))
    },
    clearOrders: () => set({ orders: [] }),
  }),
  { name: 'order-storage' }
))

export default useOrderStore
