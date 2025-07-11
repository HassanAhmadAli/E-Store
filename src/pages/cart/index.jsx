import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useCartStore from "@/store/cartStore";
import useOrderStore from "@/store/orderStore";

export const CartPage = function () {
  const { cart, addToCart, removeFromCart, clearCart } = useCartStore();
  const { placeOrder } = useOrderStore();

  const [showProductList, setShowProductList] = useState(false);
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allProducts"],
    queryFn: () =>
      fetch("https://fakestoreapi.com/products").then((res) => res.json()),
  });
  console.log(isLoading);
  console.log(isError);
  console.log(products);
  const handleAddToCart = (product) => {
    addToCart(product);
  };

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

      <button
        onClick={() => setShowProductList(!showProductList)}
        className="mb-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        {showProductList ? "إغلاق قائمة المنتجات" : "➕ إضافة عناصر للسلة"}
      </button>

      {showProductList && (
        <div>
          {isLoading && <p>جاري تحميل المنتجات...</p>}
          {isError && <p className="text-red-500">فشل تحميل المنتجات.</p>}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {products?.map((product) => (
              <div key={product.id} className="rounded border p-3 shadow-sm">
                <h3 className="font-medium">{product.title}</h3>
                <p className="text-sm text-gray-600">{product.price} $</p>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="mt-2 rounded bg-gray-800 px-3 py-1 text-sm text-white hover:bg-gray-700"
                >
                  أضف إلى السلة
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
