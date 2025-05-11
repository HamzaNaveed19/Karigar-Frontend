export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validateSignupForm = (formData) => {
  const errors = {};
  let isValid = true;

  if (!formData.fullName?.trim()) {
    errors.fullName = "Full name is required";
    isValid = false;
  }

  if (!formData.email?.trim()) {
    errors.email = "Email is required";
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "Please enter a valid email";
    isValid = false;
  }

  if (!formData.phone?.trim()) {
    errors.phone = "Phone number is required";
    isValid = false;
  }

  if (!formData.password) {
    errors.password = "Password is required";
    isValid = false;
  } else if (formData.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
    isValid = false;
  }

  return { errors, isValid };
};

export const validateLoginForm = (formData) => {
  const errors = {};
  let isValid = true;

  if (!formData.email.trim()) {
    errors.email = "Email is required";
    isValid = false;
  } else if (!validateEmail(formData.email)) {
    errors.email = "Please enter a valid email";
    isValid = false;
  }

  if (!formData.password) {
    errors.password = "Password is required";
    isValid = false;
  }

  return { errors, isValid };
};

export const validateOTP = (otp) => {
  return /^\d{4}$/.test(otp);
};
