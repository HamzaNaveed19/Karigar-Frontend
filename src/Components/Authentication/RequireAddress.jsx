import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { AddressForm } from "./AddressForm";

export const RequireAddress = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    city: "",
    state: "",
    country: "",
    addressDetails: "",
    latitude: null,
    longitude: null,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (
      user &&
      (!user.location ||
        !user.location.address ||
        user.location.address.trim() === "")
    ) {
      setShowForm(true);
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.city.trim()) newErrors.city = "City is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const fullAddress = [
        formData.addressDetails,
        formData.city,
        formData.state,
        formData.country,
      ]
        .filter(Boolean)
        .join(", ");

      await axios.post(`http://localhost:5050/customer/${user._id}`, {
        latitude: formData.latitude || 0,
        longitude: formData.longitude || 0,
        address: fullAddress,
        profileImage: user.profileImage || " ",
      });
      setShowForm(false);
      window.location.reload();
    } catch (error) {
      console.error("Failed to save address:", error);
      setErrors({
        submit:
          error.response?.data?.message ||
          "Failed to save address. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showForm) {
    return (
      <div className=" inset-0 bg-white z-50 p-4 flex items-center justify-center">
        <div className="max-w-md w-full border border-emerald-500 p-11 rounded-md">
          <h2 className="text-xl text-emerald-600 font-bold mb-2">
            Please Add Your Address
          </h2>
          <p className="mb-6 text-emerald-500">
            We need your address to provide our services.
          </p>

          {errors.submit && (
            <div className="text-red-500 mb-4 text-center">{errors.submit}</div>
          )}

          <AddressForm
            formData={formData}
            errors={errors}
            handleInputChange={handleInputChange}
            isSubmitting={isSubmitting}
            setFormData={setFormData}
          />

          <button
            onClick={handleSave}
            disabled={isSubmitting}
            className={`mt-4 w-full py-2 rounded ${
              isSubmitting
                ? "bg-emerald-400 cursor-not-allowed"
                : "bg-emerald-500 hover:bg-emerald-600"
            } text-white`}
          >
            {isSubmitting ? "Saving..." : "Save Address"}
          </button>
        </div>
      </div>
    );
  }

  return children;
};
