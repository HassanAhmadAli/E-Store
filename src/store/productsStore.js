
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useProductsStore = create(persist((set, get) => ({
  products: [],
  categories: [],
  filteredProducts: [],
  searchTerm: '',
  selectedCategory: 'all',
  sortOption: 'default',
  isLoading: false,
  isError: false,

  setProducts: (products) => set({ products }),
  setCategories: (categories) => set({ categories }),
  setSearchTerm: (searchTerm) => {
    set({ searchTerm });
    get().filterProducts();
  },
  setSelectedCategory: (selectedCategory) => {
    set({ selectedCategory });
    get().filterProducts();
  },
  setSortOption: (sortOption) => {
    set({ sortOption });
    get().filterProducts();
  },
  setLoading: (isLoading) => set({ isLoading }),
  setError: (isError) => set({ isError }),

  filterProducts: () => {
    const { products, searchTerm, selectedCategory, sortOption } = get();

    let filtered = products?.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    }) || [];

    filtered = filtered.sort((a, b) => {
      switch (sortOption) {
        case 'priceLowHigh':
          return a.price - b.price;
        case 'priceHighLow':
          return b.price - a.price;
        case 'ratingHigh':
          return b.rating.rate - a.rating.rate;
        case 'nameAZ':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    set({ filteredProducts: filtered });
  },

  fetchProducts: async () => {
    set({ isLoading: true, isError: false });
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const products = await response.json();
      set({ products, isLoading: false });
      get().filterProducts();
    } catch (error) {
      set({ isError: true, isLoading: false });
    }
  },

  fetchCategories: async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products/categories');
      const categories = await response.json();
      set({ categories });
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  }
}), {
  name: 'products-storage',
  partialize: (state) => ({
    products: state.products,
    categories: state.categories,
    selectedCategory: state.selectedCategory,
    sortOption: state.sortOption
  })
}));

export default useProductsStore;
