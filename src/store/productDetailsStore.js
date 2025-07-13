
import { create } from 'zustand';

const useProductDetailsStore = create((set, get) => ({
  product: null,
  relatedProducts: [],
  quantity: 1,
  isLoading: false,
  isError: false,
  relatedLoading: false,
  
  setProduct: (product) => set({ product }),
  setRelatedProducts: (relatedProducts) => set({ relatedProducts }),
  setQuantity: (quantity) => set({ quantity }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (isError) => set({ isError }),
  setRelatedLoading: (relatedLoading) => set({ relatedLoading }),
  
  increaseQuantity: () => set((state) => ({ quantity: state.quantity + 1 })),
  decreaseQuantity: () => set((state) => ({ 
    quantity: Math.max(1, state.quantity - 1) 
  })),
  
  resetQuantity: () => set({ quantity: 1 }),
  
  fetchProduct: async (id) => {
    if (!id) return;
    
    set({ isLoading: true, isError: false });
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const product = await response.json();
      set({ product, isLoading: false });
      
      // Fetch related products after getting the main product
      if (product.category) {
        get().fetchRelatedProducts(product.category, parseInt(id));
      }
    } catch (error) {
      set({ isError: true, isLoading: false });
    }
  },
  
  fetchRelatedProducts: async (category, currentProductId) => {
    set({ relatedLoading: true });
    try {
      const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
      const products = await response.json();
      const relatedProducts = products
        .filter((p) => p.id !== currentProductId)
        .slice(0, 4);
      set({ relatedProducts, relatedLoading: false });
    } catch (error) {
      set({ relatedLoading: false });
    }
  },
  
  clearProduct: () => set({ 
    product: null, 
    relatedProducts: [], 
    quantity: 1,
    isLoading: false,
    isError: false,
    relatedLoading: false
  })
}));

export default useProductDetailsStore;
