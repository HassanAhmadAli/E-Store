
import { useParams, Link } from "react-router";
import { useEffect } from "react";
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
  const {
    product,
    relatedProducts,
    quantity,
    isLoading,
    isError,
    relatedLoading,
    increaseQuantity,
    decreaseQuantity,
    fetchProduct,
    clearProduct,
    resetQuantity
  } = useProductDetailsStore();

  useEffect(() => {
    if (id) {
      fetchProduct(id);
      resetQuantity();
    }
    
    return () => {
      clearProduct();
    };
  }, [id]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden max-w-lg mx-auto lg:mx-0">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain p-8 hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2 capitalize">
                {product.category}
              </Badge>
              <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg font-medium ml-2">
                    {product.rating.rate}
                  </span>
                </div>
                <span className="text-muted-foreground">
                  ({product.rating.count} reviews)
                </span>
              </div>

              <div className="text-3xl font-bold text-green-600 mb-6">
                ${product.price}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-3">Product Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            <Separator className="my-4" />

            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <Button variant="ghost" size="sm" onClick={increaseQuantity}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button onClick={handleAddToCart} size="lg" className="w-full mt-4">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart ({quantity})
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      {relatedProducts && relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          {relatedLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <Card key={index} className="h-64">
                  <CardContent className="p-4">
                    <Skeleton className="h-40 w-full mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-6 w-1/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card
                  key={relatedProduct.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-4">
                    <Link to={`/product/${relatedProduct.id}`}>
                      <div className="aspect-square bg-gray-50 rounded-md overflow-hidden mb-4 h-40">
                        <img
                          src={relatedProduct.image}
                          alt={relatedProduct.title}
                          className="w-full h-full object-contain p-2 hover:scale-105 transition-transform duration-300"
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
