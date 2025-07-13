import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
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

export const ProductsPage = function () {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const { addToCart } = useCartStore();

  const {
    data: products,
    isLoading: productsLoading,
    isError: productsError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch("https://fakestoreapi.com/products").then((res) => res.json()),
  });

  const {
    data: categories,
    isLoading: categoriesLoading,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      fetch("https://fakestoreapi.com/products/categories").then((res) =>
        res.json()
      ),
  });

  const filteredProducts = products
    ?.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    ?.sort((a, b) => {
      switch (sortOption) {
        case "priceLowHigh":
          return a.price - b.price;
        case "priceHighLow":
          return b.price - a.price;
        case "ratingHigh":
          return b.rating.rate - a.rating.rate;
        case "nameAZ":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

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
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      {/* Search, Filter, Sort */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Input
          placeholder="Search for a product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:w-1/2"
        />

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="md:w-48">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {!categoriesLoading &&
              categories?.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        <Select value={sortOption} onValueChange={setSortOption}>
          <SelectTrigger className="md:w-48">
            <SelectValue placeholder="Sort by" />
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <Card key={index} className="h-[400px]">
              <CardHeader>
                <Skeleton className="h-56 w-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3 mb-2" />
                <Skeleton className="h-6 w-1/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts?.map((product) => (
            <Card
              key={product.id}
              className="h-full flex flex-col justify-between hover:shadow-lg transition-shadow border rounded-xl overflow-hidden"
            >
              <CardHeader className="p-4 pb-0">
                <div className="w-full h-64 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full max-h-56 object-contain transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col px-4 pt-4 pb-0">
                <Badge
                  variant="secondary"
                  className="w-fit mb-2 text-xs capitalize"
                >
                  {product.category}
                </Badge>
                <CardTitle className="text-base font-semibold mb-1 line-clamp-2">
                  {product.title}
                </CardTitle>
                <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                  {product.description}
                </p>
                <div className="flex items-center text-sm text-yellow-600 gap-1 mb-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  {product.rating.rate}{" "}
                  <span className="text-gray-500">({product.rating.count})</span>
                </div>
                <div className="text-lg font-bold text-green-600 mb-3">
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
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredProducts?.length === 0 && !productsLoading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-gray-500">
            No products found matching your search.
          </p>
        </div>
      )}
    </div>
  );
};
