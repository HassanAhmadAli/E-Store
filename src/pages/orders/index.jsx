// src/pages/Orders.jsx
import useOrderStore from '../../store/orderStore'

export const OrdersPage = function () {
  const { orders } = useOrderStore()

  if (orders.length === 0) return <p className="p-4">لا توجد طلبات حتى الآن.</p>

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">طلباتي</h1>

      {orders.map(order => (
        <div
          key={order.id}
          className="border border-gray-300 rounded-xl mb-6 p-4 shadow-sm"
        >
          <div className="flex justify-between items-center mb-2">
            <div>
              <h2 className="font-semibold">رقم الطلب: {order.id}</h2>
              <p className="text-sm text-gray-600">تاريخ: {order.date}</p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                order.status === 'Delivered'
                  ? 'bg-green-100 text-green-700'
                  : order.status === 'Processing'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-blue-100 text-blue-700'
              }`}
            >
              {order.status === 'Delivered'
                ? 'تم التوصيل'
                : order.status === 'Processing'
                ? 'قيد التنفيذ'
                : 'قيد الشحن'}
            </span>
          </div>

          <div className="mt-2 space-y-2">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between text-sm">
                <span>{item.title.slice(0, 40)}...</span>
                <span>{item.price.toFixed(2)} $</span>
              </div>
            ))}
          </div>

          <hr className="my-3" />

          <div className="flex justify-between font-bold">
            <span>المجموع الكلي:</span>
            <span>{order.total.toFixed(2)} $</span>
          </div>
        </div>
      ))}
    </div>
  )
}
