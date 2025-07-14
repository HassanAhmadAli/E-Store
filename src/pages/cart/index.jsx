import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useCartStore from "@/store/cartStore";
import useOrderStore from "@/store/orderStore";

export const CartPage = function () {
  const { cart, addToCart, removeFromCart, clearCart } = useCartStore();
  const { placeOrder } = useOrderStore();

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;
    placeOrder(cart);
    clearCart();
    alert("تم إرسال الطلب بنجاح!");
  };

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="mb-4 text-2xl font-bold">🛒 السلة</h1>

      {cart.length === 0 ? (
        <p className="mb-4 text-gray-600">السلة فارغة</p>
      ) : (
        <div>
          {cart.map((product) => (
            <div key={product.id} className="mb-2 rounded-md border p-2 shadow">
              <h2 className="font-semibold">{product.title}</h2>
              <p>{product.price} $</p>
              <button
                className="mt-1 text-sm text-red-500"
                onClick={() => removeFromCart(product.id)}
              >
                حذف من السلة
              </button>
            </div>
          ))}

          <button
            onClick={handlePlaceOrder}
            className="mt-4 rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          >
            إرسال الطلب
          </button>
        </div>
      )}

      <hr className="my-6" />

    </div>
  );
};
