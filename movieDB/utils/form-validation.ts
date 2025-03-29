import { Rule } from "antd/es/form";

export const rules = [{ required: true }];

export const validatePhoneNumber = {
  pattern: /^0(7|8|9)[0-9]{9}$/,
  message: "Please enter a valid phone number",
};

export const validateEmail = {
  pattern: /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim,
  message: "Please enter a valid email",
};

export const validateNIN = {
  pattern: /^[0-9]{11}$/,
  message: "NIN must be 11-digit",
};

export const validatePassword = {
  pattern:
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@£$!%*?&'"_\-.])[A-Za-z\d@£$!%*?&'"_\-. ]+$/,
  message:
    "Password must contain at least 1 uppercase, 1 lowercase, and 1 special character",
};

export const validateConfirmPassword: Rule = ({ getFieldValue }) => ({
  validator(_, value) {
    if (!value || getFieldValue("password") === value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("The two passwords do not match!"));
  },
});
