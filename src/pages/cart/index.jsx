import useCartStore from "@/store/cartStore";
import useOrderStore from "@/store/orderStore";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const CartPage = function () {
  const { cart, removeFromCart, clearCart } = useCartStore();
  const { placeOrder } = useOrderStore();

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;
    placeOrder(cart);
    clearCart();
    toast.success("✅ تم إرسال الطلب");
  };

  return (
    <div className="mx-auto max-w-7xl p-6">
      <h1 className="mb-6 text-3xl font-bold">🛒 السلة</h1>

      {cart.length === 0 ? (
        <p className="mb-4 text-gray-600">السلة فارغة</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cart.map((product) => (
              <Card
                key={product.id}
                className="flex flex-col h-full hover:shadow-lg transition-shadow border rounded-xl overflow-hidden"
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
                  <p className="text-sm text-gray-600 line-clamp-3 mb-1">
                    {product.description}
                  </p>
                  <div className="flex items-center text-sm text-yellow-600 gap-1 mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    {product.rating.rate}
                    <span className="text-gray-500">
                      ({product.rating.count})
                    </span>
                  </div>
                  <div className="text-lg font-bold text-green-600 ">
                    ${product.price}
                  </div>
                </CardContent>

                <CardFooter className="flex justify-between px-4 pb-4">
                  <Button
                    variant="destructive"
                    onClick={() => removeFromCart(product.id)}
                    className="text-sm"
                  >
                    حذف من السلة
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <Button
            onClick={handlePlaceOrder}
            className="mt-8 w-full sm:w-fit px-8 py-3 text-white bg-green-600 hover:bg-green-700 rounded-md"
          >
            إرسال الطلب
          </Button>
        </>
      )}
    </div>
  );
};
