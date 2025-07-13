
import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Star, ArrowLeft, Minus, Plus } from "lucide-react";
import useCartStore from "@/store/cartStore";
import { useState } from "react";

export const ProductDetailsPage = function () {
  const { id } = useParams();
  const { addToCart } = useCartStore();
  const [quantity, setQuantity] = useState(1);

  // Fetch single product
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () =>
      fetch(`https://fakestoreapi.com/products/${id}`).then((res) => res.json()),
    enabled: !!id,
  });

  // Fetch related products from same category
  const {
    data: relatedProducts,
    isLoading: relatedLoading,
  } = useQuery({
    queryKey: ["related-products", product?.category],
    queryFn: () =>
      fetch(`https://fakestoreapi.com/products/category/${product.category}`)
        .then((res) => res.json())
        .then((products) => products.filter((p) => p.id !== parseInt(id)).slice(0, 4)),
    enabled: !!product?.category,
  });

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">
          <p>خطأ في تحميل تفاصيل المنتج. يرجى المحاولة مرة أخرى.</p>
          <Button asChild className="mt-4">
            <Link to="/products">العودة للمنتجات</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Button variant="ghost" asChild className="mb-6">
        <Link to="/products" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          العودة للمنتجات
        </Link>
      </Button>

      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Skeleton className="aspect-square w-full" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain p-8"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {product.category}
              </Badge>
              <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg font-medium ml-2">{product.rating.rate}</span>
                </div>
                <span className="text-muted-foreground">
                  ({product.rating.count} تقييم)
                </span>
              </div>

              {/* Price */}
              <div className="text-3xl font-bold text-green-600 mb-6">
                ${product.price}
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-3">وصف المنتج</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            <Separator />

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium">الكمية:</span>
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={increaseQuantity}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button onClick={handleAddToCart} size="lg" className="w-full">
                <ShoppingCart className="h-5 w-5 mr-2" />
                أضف إلى السلة ({quantity})
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Related Products */}
      {relatedProducts && relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">منتجات مشابهة</h2>
          {relatedLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <Card key={index} className="h-80">
                  <CardContent className="p-4">
                    <Skeleton className="aspect-square w-full mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-6 w-1/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card key={relatedProduct.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <Link to={`/product/${relatedProduct.id}`}>
                      <div className="aspect-square bg-gray-50 rounded-md overflow-hidden mb-4">
                        <img
                          src={relatedProduct.image}
                          alt={relatedProduct.title}
                          className="w-full h-full object-contain p-2"
                        />
                      </div>
                      <h3 className="font-medium text-sm line-clamp-2 mb-2">
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
