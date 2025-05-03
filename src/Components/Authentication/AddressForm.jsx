import { useState, useEffect } from "react";
import { MapPin, Home, Navigation, Globe, Landmark, Hash } from "lucide-react";
import { Input } from "../../UI/Input";
import Field from "./Field";
import MapSelector from "./MapSelector";

export const AddressForm = ({
  formData,
  errors,
  handleInputChange,
  isSubmitting,
  setFormData,
}) => {
  const [showMap, setShowMap] = useState(false);
  const [coordinates, setCoordinates] = useState(null);

  const handleMapSelect = (address, coords) => {
    setFormData((prev) => ({
      ...prev,
      address: address.display_name,
      street: address.address?.road || "",
      city: address.address?.city || address.address?.town || "",
      state: address.address?.state || "",
      postalCode: address.address?.postcode || "",
      country: address.address?.country || "",
    }));
    setCoordinates(coords);
    setShowMap(false);
  };

  return (
    <div className="space-y-3 w-full">
      {showMap ? (
        <div className="space-y-4">
          <div className="rounded-lg overflow-hidden border border-gray-300">
            <MapSelector onSelect={handleMapSelect} />
          </div>
          <button
            type="button"
            onClick={() => setShowMap(false)}
            className="text-sm text-emerald-600 hover:underline"
          >
            ← Or enter address manually
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setShowMap(true)}
              className="flex items-center text-sm text-emerald-600 hover:underline"
            >
              <Navigation className="mr-1 h-4 w-4" />
              Select from map
            </button>
          </div>

          <Field icon={Home} label="Area or Street" error={errors.street}>
            <Input
              name="street"
              placeholder="123 Main Street"
              value={formData.street}
              onChange={handleInputChange}
              disabled={isSubmitting}
            />
          </Field>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field icon={Landmark} label="City" error={errors.city}>
              <Input
                name="city"
                placeholder="Lahore"
                value={formData.city}
                onChange={handleInputChange}
                disabled={isSubmitting}
              />
            </Field>

            <Field icon={Landmark} label="State/Province" error={errors.state}>
              <Input
                name="state"
                placeholder="Punjab"
                value={formData.state}
                onChange={handleInputChange}
                disabled={isSubmitting}
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field icon={Hash} label="Postal Code" error={errors.postalCode}>
              <Input
                name="postalCode"
                placeholder="54000"
                value={formData.postalCode}
                onChange={handleInputChange}
                disabled={isSubmitting}
              />
            </Field>

            <Field icon={Globe} label="Country" error={errors.country}>
              <Input
                name="country"
                placeholder="Pakistan"
                value={formData.country}
                onChange={handleInputChange}
                disabled={isSubmitting}
              />
            </Field>
          </div>

          <Field
            icon={MapPin}
            label="Additional Details (Fill in carefully)"
            error={errors.addressDetails}
          >
            <textarea
              name="addressDetails"
              className="w-full rounded-lg border border-gray-300 p-3 text-sm 
            focus:outline-none focus:ring-emerald-500 focus:ring-1 
            resize-none"
              rows={2}
              placeholder="Street no, House no, Landmark, apartment number, etc."
              value={formData.addressDetails}
              onChange={handleInputChange}
              disabled={isSubmitting}
            />
          </Field>
        </>
      )}
    </div>
  );
};
