
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingCart, Star } from "lucide-react";
import useCartStore from "@/store/cartStore";

export const ProductsPage = function () {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { addToCart } = useCartStore();

  // Fetch all products
  const {
    data: products,
    isLoading: productsLoading,
    isError: productsError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch("https://fakestoreapi.com/products").then((res) => res.json()),
  });

  // Fetch categories
  const {
    data: categories,
    isLoading: categoriesLoading,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      fetch("https://fakestoreapi.com/products/categories").then((res) => res.json()),
  });

  // Filter products based on search and category
  const filteredProducts = products?.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  if (productsError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">
          <p>خطأ في تحميل المنتجات. يرجى المحاولة مرة أخرى.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">المنتجات</h1>
        
        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="البحث عن منتج..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="md:w-48">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="اختر الفئة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الفئات</SelectItem>
                {!categoriesLoading && categories?.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {productsLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <Card key={index} className="h-96">
              <CardHeader>
                <Skeleton className="h-48 w-full" />
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts?.map((product) => (
            <Card key={product.id} className="h-full flex flex-col hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="aspect-square relative overflow-hidden rounded-md bg-gray-50 h-48">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="object-contain w-full h-full p-2"
                  />
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <Badge variant="secondary" className="w-fit mb-2 text-xs">
                  {product.category}
                </Badge>
                <CardTitle className="text-sm line-clamp-2 mb-2">
                  {product.title}
                </CardTitle>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-3 flex-1">
                  {product.description}
                </p>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-muted-foreground ml-1">
                      {product.rating.rate} ({product.rating.count})
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-green-600">
                    ${product.price}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button asChild variant="outline" size="sm" className="flex-1">
                  <Link to={`/product/${product.id}`}>
                    عرض التفاصيل
                  </Link>
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => handleAddToCart(product)}
                  className="flex-1"
                >
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  أضف للسلة
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {filteredProducts?.length === 0 && !productsLoading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">لا توجد منتجات تطابق البحث.</p>
        </div>
      )}
    </div>
  );
};
