import { useEffect } from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ShoppingCart, Star } from "lucide-react";
import useCartStore from "@/store/cartStore";
import useProductsStore from "@/store/productsStore";

export const ProductsPage = function () {
  const { addToCart } = useCartStore();
  const {
    filteredProducts,
    searchTerm,
    selectedCategory,
    sortOption,
    setProducts,
    setCategories,
    setSearchTerm,
    setSelectedCategory,
    setSortOption,
    filterProducts,
  } = useProductsStore();

  // Fetch products using React Query
  const {
    data: products,
    isLoading: productsLoading,
    isError: productsError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) throw new Error("Failed to fetch products");
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  // Fetch categories using React Query
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetch(
        "https://fakestoreapi.com/products/categories",
      );
      if (!response.ok) throw new Error("Failed to fetch categories");
      return response.json();
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
  });

  // Update Zustand store when data changes
  useEffect(() => {
    if (products) {
      setProducts(products);
    }
  }, [products, setProducts]);

  useEffect(() => {
    if (categories) {
      setCategories(categories);
    }
  }, [categories, setCategories]);

  // Filter products when dependencies change
  useEffect(() => {
    if (products) {
      filterProducts();
    }
  }, [products, searchTerm, selectedCategory, sortOption, filterProducts]);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  if (productsError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">
          <p>Error loading products. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Products</h1>

      {/* Search, Filter, Sort */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row">
        <Input
          placeholder="Search for a product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:w-1/2"
        />

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="md:w-48">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories?.map((category) => (
              <SelectItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortOption} onValueChange={setSortOption}>
          <SelectTrigger className="md:w-48">
            <SelectValue placeholder="Default" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="priceLowHigh">Price: Low to High</SelectItem>
            <SelectItem value="priceHighLow">Price: High to Low</SelectItem>
            <SelectItem value="ratingHigh">Highest Rating</SelectItem>
            <SelectItem value="nameAZ">Name A-Z</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Product Cards */}
      {productsLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Card key={index} className="h-[400px]">
              <CardHeader>
                <Skeleton className="h-56 w-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="mb-2 h-4 w-full" />
                <Skeleton className="mb-2 h-4 w-2/3" />
                <Skeleton className="h-6 w-1/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts?.map((product) => (
            <Card
              key={product.id}
              className="flex h-full flex-col justify-between overflow-hidden rounded-xl border transition-shadow hover:shadow-lg"
            >
              <CardHeader className="p-4 pb-0">
                <div className="flex h-64 w-full items-center justify-center overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full max-h-56 object-contain transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </CardHeader>

              <CardContent className="flex flex-1 flex-col px-4 pt-4 pb-0">
                <Badge
                  variant="secondary"
                  className="mb-2 w-fit text-xs capitalize"
                >
                  {product.category}
                </Badge>
                <CardTitle className="mb-1 line-clamp-2 text-base font-semibold">
                  {product.title}
                </CardTitle>
                <p className="mb-3 line-clamp-3 text-sm text-gray-600">
                  {product.description}
                </p>
                <div className="mb-2 flex items-center gap-1 text-sm text-yellow-600">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  {product.rating.rate}{" "}
                  <span className="text-gray-500">
                    ({product.rating.count})
                  </span>
                </div>
                <div className="mb-3 text-lg font-bold text-green-600">
                  ${product.price}
                </div>
              </CardContent>

              <CardFooter className="flex gap-2 px-4 pb-4">
                <Button asChild variant="outline" size="sm" className="w-1/2">
                  <Link to={`/product/${product.id}`}>View Details</Link>
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleAddToCart(product)}
                  className="w-1/2"
                >
                  <ShoppingCart className="mr-1 h-4 w-4" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredProducts?.length === 0 && !productsLoading && (
        <div className="py-12 text-center">
          <p className="text-gray-500 text-muted-foreground">
            No products found matching your search.
          </p>
        </div>
      )}
    </div>
  );
};
