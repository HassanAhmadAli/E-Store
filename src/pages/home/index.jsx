import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-100 py-20 text-center">
        <h1 className="mb-4 font-serif text-4xl font-bold md:text-5xl">
          Welcome to Our Store
        </h1>
        <p className="mb-6 text-lg text-gray-600">
          Shop the best products at unbeatable prices
        </p>
        <Link to="/products">
          <button className="rounded-md bg-green-400 px-6 py-3 text-white transition hover:bg-green-700">
            Shop Now
          </button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 gap-8 bg-white px-6 py-16 text-center md:grid-cols-3 md:px-16">
        <div>
          <h3 className="mb-2 text-xl font-semibold">🚚 Free Shipping</h3>
          <p className="text-gray-600">On all orders over $50</p>
        </div>
        <div>
          <h3 className="mb-2 text-xl font-semibold">✅ Quality Guarantee</h3>
          <p className="text-gray-600">Only the best products</p>
        </div>
        <div>
          <h3 className="mb-2 text-xl font-semibold">💳 Secure Payment</h3>
          <p className="text-gray-600">100% safe & encrypted</p>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-gray-50 px-6 py-16 text-center">
        <h2 className="mb-6 font-serif text-3xl font-bold">
          Featured Products
        </h2>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          <div className="rounded bg-white p-4 shadow">Product 1</div>
          <div className="rounded bg-white p-4 shadow">Product 2</div>
          <div className="rounded bg-white p-4 shadow">Product 3</div>
        </div>
        <Link to="/products">
          <button className="mt-8 rounded bg-green-400 px-6 py-3 text-white transition hover:bg-green-700">
            Browse All Products
          </button>
        </Link>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-100 px-6 py-16 text-center">
        <h2 className="mb-4 font-serif text-3xl font-bold">
          Join Our Community
        </h2>
        <p className="mb-6 text-gray-700">
          Create an account to track orders and enjoy exclusive offers!
        </p>
        <Link to="/login">
          <button className="rounded bg-green-400 px-6 py-3 text-white transition hover:bg-green-700">
            Login / Sign Up
          </button>
        </Link>
      </section>
    </div>
  );
}
