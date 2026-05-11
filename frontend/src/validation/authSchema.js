// Yup validation schemas for authentication forms (register, login, change password)
import * as yup from "yup";
const nameRule = yup
  .string()
  .trim()
  .required("Name is required")
  .min(3, "Name must be at least 3 characters")
  .max(30, "Name must be less than 30 characters")
  .matches(/^[A-Za-z ]+$/, "Name can only contain letters and spaces");

const emailRule = yup
  .string()
  .trim()
  .required("Email is required")
  .email("Please enter a valid email");

const passwordRule = yup
  .string()
  .trim()
  .required("Password is required")
  .min(6, "Password must be at least 6 characters")
  .max(50, "Password must be less than 50 characters")
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
    "Password must contain uppercase, lowercase, number, and special character",
  );

const adminKeyRule = yup.string().trim().ensure();

// Register schema (formerly signup)
export const registerSchema = yup.object({
  name: nameRule,
  email: emailRule,
  password: passwordRule,
  confirmPassword: yup
    .string()
    .trim()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords do not match"),
  adminKey: adminKeyRule,
});

// Login schema (formerly signin)
export const loginSchema = yup.object({
  email: emailRule,
  password: yup
    .string()
    .trim()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password must be less than 50 characters"),
});

export const changePasswordSchema = yup.object({
  currentPassword: yup
    .string()
    .trim()
    .required("Current password is required")
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password must be less than 50 characters"),
  newPassword: passwordRule,
  confirmNewPassword: yup
    .string()
    .trim()
    .required("Confirm new password is required")
    .oneOf([yup.ref("newPassword")], "Passwords do not match"),
});
