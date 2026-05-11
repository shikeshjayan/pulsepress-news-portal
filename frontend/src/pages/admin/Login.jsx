// Login form — used both as a modal (from Navbar) and a standalone page (/login)
// Supports "Remember Me" via localStorage for convenience
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { loginSchema } from "../../validation/authSchema";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Login = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  // Redirect to the page the user was trying to visit before login (if any), or /admin by default
  const from = location.state?.from || null;
  const { login, isAuthenticated } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onSubmit",
  });

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberEmail");

    if (savedEmail) {
      setValue("email", savedEmail);
      setRememberMe(true);
    }
  }, [setValue]);

  useEffect(() => {
    if (isAuthenticated && onClose) {
      onClose();
    }
  }, [isAuthenticated, onClose]);

  if (!isOpen && onClose) return null;

  const onSubmit = async (data) => {
    setErrorMessage("");

    try {
      const res = await login(data.email, data.password);

      if (res.success) {
        if (rememberMe) {
          localStorage.setItem("rememberEmail", data.email);
        } else {
          localStorage.removeItem("rememberEmail");
        }
        const userRole = res.user?.role;
        const redirectTo = from || (userRole === "admin" ? "/admin" : "/");
        navigate(redirectTo, { replace: true });
      }
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message || "Login failed. Please try again.",
      );
    }
  };

  const formContent = (
    <>
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
          {errorMessage}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="border border-gray-300 rounded w-full px-3 py-2"
            placeholder="example@gmail.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium mb-1">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className="border border-gray-300 rounded w-full px-3 py-2 pr-14"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-2 text-sm text-gray-500 cursor-pointer">
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="mb-4 flex items-center gap-2">
          <input
            type="checkbox"
            id="remember"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="remember" className="text-sm">
            Remember Me
          </label>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 text-white py-2 px-4 rounded w-full disabled:opacity-50 cursor-pointer">
          {isSubmitting ? "Logging in..." : "Submit"}
        </button>
      </form>
      {!onClose && (
        <p className="text-sm text-center mt-4 text-gray-600">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </p>
      )}
    </>
  );

  if (onClose) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white p-8 rounded shadow relative w-full max-w-md mx-4">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl leading-none cursor-pointer">
            &times;
          </button>
          {formContent}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-full max-w-md mx-4">
        {formContent}
      </div>
    </div>
  );
};

export default Login;
