import { useState } from "react";
import { useNavigate } from "react-router";
import useUserStore from "@/store/userStore";
import { toast } from "sonner";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useUserStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (foundUser) {
      login(foundUser);
      toast.success("✅ Logged in successfully");
      navigate("/");
    } else {
      toast.error("❌ Invalid credentials");
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/5872302/pexels-photo-5872302.jpeg')",
      }}
    >
      <div className="bg-opacity-40 absolute inset-0"></div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md rounded-lg bg-white/90 p-8 shadow-lg backdrop-blur-sm">
          <h2 className="mb-6 text-center font-serif text-2xl font-semibold text-green-600">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-2xl border border-green-200 px-4 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-2xl border border-green-200 px-4 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full rounded-2xl bg-green-500 py-2 font-serif text-white transition hover:bg-green-700"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-center font-serif text-sm text-gray-700">
            Do not have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-green-600 hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
