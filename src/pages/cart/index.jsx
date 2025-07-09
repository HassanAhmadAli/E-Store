import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import useCartStore from '../../store/cartStore'
import useOrderStore from '../../store/orderStore'

export const CartPage = function () {
  const { cart, addToCart, removeFromCart, clearCart } = useCartStore()
  const { placeOrder } = useOrderStore()

  const [showProductList, setShowProductList] = useState(false)
  const { data: products, isLoading, isError } = useQuery({
    queryKey: ['allProducts'],
    queryFn: () =>
      fetch('https://fakestoreapi.com/products').then(res => res.json()),
  })
    console.log(isLoading)
    console.log(isError)
    console.log(products)
  const handleAddToCart = (product) => {
    addToCart(product)
  }

  const handlePlaceOrder = () => {
    if (cart.length === 0) return
    placeOrder(cart)
    clearCart()
    alert('تم إرسال الطلب بنجاح!')
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🛒 السلة</h1>

      {cart.length === 0 ? (
        <p className="mb-4 text-gray-600">السلة فارغة</p>
      ) : (
        <div>
          {cart.map(product => (
            <div key={product.id} className="border p-2 mb-2 rounded-md shadow">
              <h2 className="font-semibold">{product.title}</h2>
              <p>{product.price} $</p>
              <button
                className="text-sm text-red-500 mt-1"
                onClick={() => removeFromCart(product.id)}
              >
                حذف من السلة
              </button>
            </div>
          ))}

          <button
            onClick={handlePlaceOrder}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            إرسال الطلب
          </button>
        </div>
      )}

      <hr className="my-6" />

      <button
        onClick={() => setShowProductList(!showProductList)}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {showProductList ? 'إغلاق قائمة المنتجات' : '➕ إضافة عناصر للسلة'}
      </button>

      {showProductList && (
        <div>
          {isLoading && <p>جاري تحميل المنتجات...</p>}
          {isError && <p className="text-red-500">فشل تحميل المنتجات.</p>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products?.map(product => (
              <div key={product.id} className="border p-3 rounded shadow-sm">
                <h3 className="font-medium">{product.title}</h3>
                <p className="text-sm text-gray-600">{product.price} $</p>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="mt-2 px-3 py-1 bg-gray-800 text-white rounded text-sm hover:bg-gray-700"
                >
                  أضف إلى السلة
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
