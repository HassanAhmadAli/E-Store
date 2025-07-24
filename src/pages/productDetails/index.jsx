import { useParams, Link } from "react-router";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Star, ArrowLeft, Minus, Plus } from "lucide-react";
import useCartStore from "@/store/cartStore";
import useProductDetailsStore from "@/store/productDetailsStore";

export const ProductDetailsPage = function () {
  const { id } = useParams();
  const { addToCart } = useCartStore();
  const { quantity, increaseQuantity, decreaseQuantity, resetQuantity } =
    useProductDetailsStore();

  // Fetch product details using React Query
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      if (!response.ok) throw new Error("Failed to fetch product");
      return response.json();
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  // Fetch related products using React Query
  const { data: relatedProducts, isLoading: relatedLoading } = useQuery({
    queryKey: ["relatedProducts", product?.category, id],
    queryFn: async () => {
      const response = await fetch(
        `https://fakestoreapi.com/products/category/${product.category}`,
      );
      if (!response.ok) throw new Error("Failed to fetch related products");
      const products = await response.json();
      return products.filter((p) => p.id !== parseInt(id)).slice(0, 4);
    },
    enabled: !!product?.category && !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  useEffect(() => {
    if (id) {
      resetQuantity();
    }
  }, [id, resetQuantity]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
    }
  };

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-500">
        <p>Error loading product details. Please try again.</p>
        <Button asChild className="mt-4">
          <Link to="/products">Back to Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" asChild className="mb-6">
        <Link to="/products" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Link>
      </Button>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Skeleton className="aspect-square w-full" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      ) : product ? (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="mx-auto aspect-square max-w-lg overflow-hidden rounded-lg bg-gray-50 lg:mx-0">
            <img
              src={product.image}
              alt={product.title}
              className="h-full w-full object-contain p-8 transition-transform duration-300 hover:scale-105"
            />
          </div>

          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2 capitalize">
                {product.category}
              </Badge>
              <h1 className="mb-4 text-3xl font-bold">{product.title}</h1>

              <div className="mb-4 flex items-center gap-2">
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="ml-2 text-lg font-medium">
                    {product.rating.rate}
                  </span>
                </div>
                <span className="text-muted-foreground">
                  ({product.rating.count} reviews)
                </span>
              </div>

              <div className="mb-6 text-3xl font-bold text-green-600">
                ${product.price}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="mb-3 text-lg font-semibold">
                Product Description
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                {product.description}
              </p>
            </div>

            <Separator className="my-4" />

            <div>
              <div className="mb-6 flex items-center gap-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center rounded-md border">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="min-w-[3rem] px-4 py-2 text-center">
                    {quantity}
                  </span>
                  <Button variant="ghost" size="sm" onClick={increaseQuantity}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                size="lg"
                className="mt-4 w-full"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart ({quantity})
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      {relatedProducts && relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">Related Products</h2>
          {relatedLoading ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <Card key={index} className="h-64">
                  <CardContent className="p-4">
                    <Skeleton className="mb-4 h-40 w-full" />
                    <Skeleton className="mb-2 h-4 w-full" />
                    <Skeleton className="h-6 w-1/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((relatedProduct) => (
                <Card
                  key={relatedProduct.id}
                  className="transition-shadow hover:shadow-lg"
                >
                  <CardContent className="p-4">
                    <Link to={`/product/${relatedProduct.id}`}>
                      <div className="mb-4 aspect-square h-40 overflow-hidden rounded-md bg-gray-50">
                        <img
                          src={relatedProduct.image}
                          alt={relatedProduct.title}
                          className="h-full w-full object-contain p-2 transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                      <h3 className="mb-2 line-clamp-2 text-sm font-medium">
                        {relatedProduct.title}
                      </h3>
                      <p className="text-lg font-bold text-green-600">
                        ${relatedProduct.price}
                      </p>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
