import { Link } from "react-router-dom";
import useProductsStore from "../../store/productsStore";
import useCartStore from "../../store/cartStore";
import { useEffect } from "react";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { ShoppingCart, Star } from "lucide-react";

export function HomePage() {
  const { filteredProducts, isLoading, fetchProducts, filterProducts } =
    useProductsStore();
  const { addToCart } = useCartStore();

  useEffect(() => {
    if (filteredProducts.length === 0) {
      fetchProducts();
    } else {
      filterProducts();
    }
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-100 py-20 text-center dark:bg-gray-900">
        <h1 className="mb-4 font-serif text-4xl font-bold text-gray-800 md:text-5xl dark:text-white">
          Welcome to Our Store
        </h1>
        <p className="mb-6 text-lg text-gray-600 dark:text-gray-300">
          Shop the best products at unbeatable prices
        </p>
        <Link to="/products">
          <button className="cursor-pointer rounded-md bg-green-400 px-6 py-3 text-white transition hover:bg-green-700">
            Shop Now
          </button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 gap-8 bg-white px-6 py-16 text-center md:grid-cols-3 md:px-16 dark:bg-gray-800">
        <div>
          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">
            🚚 Free Shipping
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            On all orders over $50
          </p>
        </div>
        <div>
          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">
            ✅ Quality Guarantee
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Only the best products
          </p>
        </div>
        <div>
          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">
            💳 Secure Payment
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            100% safe & encrypted
          </p>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-gray-50 px-6 py-16 text-center dark:bg-gray-900">
        <h2 className="mb-6 font-serif text-3xl font-bold text-gray-800 dark:text-white">
          Featured Products
        </h2>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="h-[400px]">
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
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {filteredProducts?.slice(0, 3).map((product) => (
              <Card
                key={product.id}
                className="flex h-full flex-col justify-between overflow-hidden rounded-xl border transition-shadow hover:shadow-lg dark:bg-gray-800"
              >
                <CardHeader className="p-4 pb-0">
                  <div className="flex h-64 w-full items-center justify-center overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
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
                  <h3 className="mb-1 line-clamp-2 text-base font-semibold dark:text-white">
                    {product.title}
                  </h3>
                  <p className="mb-3 line-clamp-3 text-sm text-gray-600 dark:text-gray-300">
                    {product.description}
                  </p>
                  <div className="mb-2 flex items-center gap-1 text-sm text-yellow-600">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    {product.rating.rate}{" "}
                    <span className="text-gray-500 dark:text-gray-400">
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
                    onClick={() => addToCart(product)}
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

        <Link to="/products">
          <button className="mt-8 cursor-pointer rounded bg-green-400 px-6 py-3 text-white transition hover:bg-green-700">
            Browse All Products
          </button>
        </Link>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-100 px-6 py-16 text-center dark:bg-blue-950">
        <h2 className="mb-4 font-serif text-3xl font-bold text-gray-800 dark:text-white">
          Join Our Community
        </h2>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Create an account to track orders and enjoy exclusive offers!
        </p>
        <Link to="/login">
          <button className="cursor-pointer rounded bg-green-400 px-6 py-3 text-white transition hover:bg-green-700">
            Login / Sign Up
          </button>
        </Link>
      </section>
    </div>
  );
}
