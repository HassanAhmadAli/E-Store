import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function SignupPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existing = users.find((u) => u.email === email);

    if (existing) {
      toast.error("⚠️ User already exists!");
      return;
    }

    const newUser = { name, email, password };
    const updatedUsers = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    toast.success("🎉 Account created successfully, please login");
    navigate("/login");
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
            Sign Up
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full rounded-2xl border border-green-200 px-4 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
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
              className="w-full rounded bg-green-400 py-2 text-white transition hover:bg-green-700"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
