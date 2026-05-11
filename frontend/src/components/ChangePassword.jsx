// Form for changing the authenticated user's password with Yup validation
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { changePasswordSchema } from "../validation/authSchema";
import { useState } from "react";
import api from "../services/api";

const ChangePassword = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(changePasswordSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (data) => {
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const res = await api.put("/auth/change-password", {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      if (res.data.success) {
        setSuccessMessage("Password changed successfully!");
        reset();
      }
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message || "Failed to change password.",
      );
    }
  };

  return (
    <div className="mt-4">
      <h1 className="text-2xl font-bold mb-6">Change Password</h1>
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
          {errorMessage}
        </div>
      )}
      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded text-sm">
          {successMessage}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="currentPassword"
            className="block text-sm font-medium mb-1">
            Current Password
          </label>
          <div className="relative">
            <input
              id="currentPassword"
              type={showCurrent ? "text" : "password"}
              {...register("currentPassword")}
              className="border border-gray-300 rounded w-full px-3 py-2 pr-14"
            />
            <button
              type="button"
              onClick={() => setShowCurrent((prev) => !prev)}
              aria-label={showCurrent ? "Hide current password" : "Show current password"}
              className="absolute right-3 top-2 text-sm text-gray-500 cursor-pointer">
              {showCurrent ? "Hide" : "Show"}
            </button>
          </div>
          {errors.currentPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.currentPassword.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium mb-1">
            New Password
          </label>
          <div className="relative">
            <input
              id="newPassword"
              type={showNew ? "text" : "password"}
              {...register("newPassword")}
              className="border border-gray-300 rounded w-full px-3 py-2 pr-14"
            />
            <button
              type="button"
              onClick={() => setShowNew((prev) => !prev)}
              aria-label={showNew ? "Hide new password" : "Show new password"}
              className="absolute right-3 top-2 text-sm text-gray-500 cursor-pointer">
              {showNew ? "Hide" : "Show"}
            </button>
          </div>
          {errors.newPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.newPassword.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="confirmNewPassword"
            className="block text-sm font-medium mb-1">
            Confirm New Password
          </label>
          <div className="relative">
            <input
              id="confirmNewPassword"
              type={showConfirm ? "text" : "password"}
              {...register("confirmNewPassword")}
              className="border border-gray-300 rounded w-full px-3 py-2 pr-14"
            />
            <button
              type="button"
              onClick={() => setShowConfirm((prev) => !prev)}
              aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
              className="absolute right-3 top-2 text-sm text-gray-500 cursor-pointer">
              {showConfirm ? "Hide" : "Show"}
            </button>
          </div>
          {errors.confirmNewPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmNewPassword.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 cursor-pointer">
          {isSubmitting ? "Changing..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
