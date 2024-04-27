import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required.")
    .email("Invalid email address."),
  password: yup.string().required("Password is required"),
});

export const registerSchema = yup.object().shape({
  username: yup.string().required("Username is required."),
  email: yup
    .string()
    .required("Email is required.")
    .email("Invalid email address."),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    ),
});
