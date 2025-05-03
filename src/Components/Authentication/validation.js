export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
  return /^\d{6}$/.test(otp);
};
