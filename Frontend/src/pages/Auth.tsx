import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios/axios";
import { EyeIcon, EyeOffIcon } from "../component/Icons";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  // Form data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // UI states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  // LOGIN / REGISTER

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // REGISTER VALIDATION

    if (!isLogin) {
      if (!name.trim()) {
        setError("Please enter your name.");
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
    }

    try {
      setLoading(true);

      // REGISTER

      if (!isLogin) {
        const response = await api.post("/auth/register", {
          name,
          email,
          password,
        });

        setSuccess(response.data.message || "Account created successfully.");

        // Clear form

        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        // Switch to login

        setTimeout(() => {
          setIsLogin(true);
          setSuccess("");
        }, 1500);
      }

      // LOGIN
      else {
        const response = await api.post("/auth/login", {
          email,
          password,
        });

        setSuccess(response.data.message || "Login successful.");

        // Clear password

        setPassword("");

        // Go home after login

        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error: any) {
      console.log(error);

      if (error.response) {
        setError(error.response.data.message || "Something went wrong.");
      } else {
        setError("Cannot connect to the server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-10">
      {/* Auth Card */}

      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl sm:p-8">
        {/* Logo */}

        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight">
            Print<span className="text-blue-600">Shop</span>
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {isLogin
              ? "Welcome back! Login to your account."
              : "Create an account and start shopping."}
          </p>
        </div>

        {/* Login / Register Switch */}

        <div className="mt-7 flex rounded-xl bg-gray-100 p-1">
          <button
            type="button"
            onClick={() => {
              setIsLogin(true);
              setError("");
              setSuccess("");
            }}
            className={`w-1/2 rounded-lg py-2.5 text-sm font-semibold transition ${
              isLogin
                ? "bg-white text-black shadow-sm"
                : "text-gray-500 hover:text-black"
            }`}
          >
            Login
          </button>

          <button
            type="button"
            onClick={() => {
              setIsLogin(false);
              setError("");
              setSuccess("");
            }}
            className={`w-1/2 rounded-lg py-2.5 text-sm font-semibold transition ${
              !isLogin
                ? "bg-white text-black shadow-sm"
                : "text-gray-500 hover:text-black"
            }`}
          >
            Register
          </button>
        </div>

        {/* Error Message */}

        {error && (
          <div className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Success Message */}

        {success && (
          <div className="mt-5 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-600">
            {success}
          </div>
        )}

        {/* Form */}

        <form onSubmit={handleSubmit} className="mt-7 space-y-5">
          {/* Register Name */}

          {!isLogin && (
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Full Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
              />
            </div>
          )}

          {/* Email */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
            />
          </div>

          {/* Password */}

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pr-11 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOffIcon className="h-4.5 w-4.5" />
              ) : (
                <EyeIcon className="h-4.5 w-4.5" />
              )}
            </button>
          </div>

          {/* Confirm Password */}

          {!isLogin && (
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pr-11 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? (
                  <EyeOffIcon className="h-4.5 w-4.5" />
                ) : (
                  <EyeIcon className="h-4.5 w-4.5" />
                )}
              </button>
            </div>
          )}

          {/* Remember Me */}

          {isLogin && (
            <label className="flex items-center gap-2 text-sm text-gray-500">
              <input type="checkbox" className="h-4 w-4 rounded" />
              Remember me
            </label>
          )}

          {/* Submit Button */}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-black py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Please wait..."
              : isLogin
                ? "Login to Account"
                : "Create Account"}
          </button>
        </form>

        {/* Bottom Text */}

        <div className="mt-6 text-center text-sm text-gray-500">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(false);
                  setError("");
                  setSuccess("");
                }}
                className="font-semibold text-blue-600 hover:underline"
              >
                Create one
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(true);
                  setError("");
                  setSuccess("");
                }}
                className="font-semibold text-blue-600 hover:underline"
              >
                Login
              </button>
            </>
          )}
        </div>

        {/* Divider */}

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200"></div>

          <span className="text-xs text-gray-400">OR</span>

          <div className="h-px flex-1 bg-gray-200"></div>
        </div>

        {/* Google Button */}

        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-medium transition hover:bg-gray-50"
        >
          <span className="font-bold text-red-500">G</span>
          Continue with Google
        </button>
      </div>
    </main>
  );
}

export default Auth;
