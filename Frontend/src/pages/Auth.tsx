import { useState } from "react";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

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
            onClick={() => setIsLogin(true)}
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
            onClick={() => setIsLogin(false)}
            className={`w-1/2 rounded-lg py-2.5 text-sm font-semibold transition ${
              !isLogin
                ? "bg-white text-black shadow-sm"
                : "text-gray-500 hover:text-black"
            }`}
          >
            Register
          </button>

        </div>

        {/* Form */}
        <form className="mt-7 space-y-5">

          {/* Register Name */}
          {!isLogin && (
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Full Name
              </label>

              <input
                type="text"
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
              placeholder="you@example.com"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
            />
          </div>

          {/* Password */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>

              {isLogin && (
                <button
                  type="button"
                  className="text-xs font-medium text-blue-600 hover:underline"
                >
                  Forgot password?
                </button>
              )}
            </div>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
            />
          </div>

          {/* Confirm Password */}
          {!isLogin && (
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Confirm Password
              </label>

              <input
                type="password"
                placeholder="Confirm your password"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
              />
            </div>
          )}

          {/* Remember Me */}
          {isLogin && (
            <label className="flex items-center gap-2 text-sm text-gray-500">
              <input
                type="checkbox"
                className="h-4 w-4 rounded"
              />

              Remember me
            </label>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-black py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 active:scale-[0.98]"
          >
            {isLogin ? "Login to Account" : "Create Account"}
          </button>

        </form>

        {/* Bottom Text */}
        <div className="mt-6 text-center text-sm text-gray-500">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => setIsLogin(false)}
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
                onClick={() => setIsLogin(true)}
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

          <span className="text-xs text-gray-400">
            OR
          </span>

          <div className="h-px flex-1 bg-gray-200"></div>
        </div>

        {/* Google Button */}
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-medium transition hover:bg-gray-50"
        >
          <span className="font-bold text-red-500">
            G
          </span>

          Continue with Google
        </button>

      </div>

    </main>
  );
}

export default Auth;