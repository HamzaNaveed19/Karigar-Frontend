import { useState } from "react";
import { MapPin, Navigation, Landmark, Globe } from "lucide-react";
import { Input } from "../../UI/Input";
import Field from "./Field";
import MapSelector from "./MapSelector";

const pakistaniStates = {
  Punjab: [
    "Lahore",
    "Faisalabad",
    "Rawalpindi",
    "Gujranwala",
    "Multan",
    "Bahawalpur",
    "Sargodha",
    "Sialkot",
    "Sheikhupura",
    "Jhang",
    "Rahim Yar Khan",
    "Gujrat",
    "Kasur",
    "Sahiwal",
    "Okara",
    "Mandi Bahauddin",
    "Hafizabad",
    "Pakpattan",
    "Chiniot",
  ],
  Sindh: [
    "Karachi",
    "Hyderabad",
    "Sukkur",
    "Larkana",
    "Nawabshah",
    "Mirpur Khas",
    "Jacobabad",
    "Shikarpur",
    "Khairpur",
    "Dadu",
  ],
  "Khyber Pakhtunkhwa": [
    "Peshawar",
    "Mardan",
    "Mingora",
    "Kohat",
    "Abbottabad",
    "Bannu",
    "Swabi",
    "Dera Ismail Khan",
    "Charsadda",
    "Nowshera",
  ],
  Balochistan: [
    "Quetta",
    "Turbat",
    "Khuzdar",
    "Chaman",
    "Gwadar",
    "Zhob",
    "Dera Allah Yar",
    "Usta Muhammad",
    "Sibi",
    "Loralai",
  ],
  "Islamabad Capital Territory": ["Islamabad"],
  "Azad Jammu & Kashmir": [
    "Muzaffarabad",
    "Mirpur",
    "Bhimber",
    "Kotli",
    "Rawalakot",
  ],
  "Gilgit-Baltistan": ["Gilgit", "Skardu", "Chilas", "Ghizer", "Astore"],
};

export const AddressForm = ({
  formData = {
    city: "",
    state: "",
    country: "Pakistan",
    addressDetails: "",
    latitude: null,
    longitude: null,
  },
  errors = {},
  handleInputChange = () => {},
  isSubmitting = false,
  setFormData = () => {},
}) => {
  const [showMap, setShowMap] = useState(false);
  const [availableCities, setAvailableCities] = useState([]);

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setFormData((prev) => ({
      ...prev,
      state: selectedState,
      city: "", // Reset city when state changes
    }));
    setAvailableCities(pakistaniStates[selectedState] || []);
  };

  const handleCityChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      city: e.target.value,
    }));
  };

  const handleMapSelect = (selectedData) => {
    const { address, coords } = selectedData;
    setFormData((prev) => ({
      ...prev,
      city: address?.address?.city || address?.address?.town || "",
      state: address?.address?.state || "",
      country: "Pakistan",
      latitude: coords?.lat || null,
      longitude: coords?.lng || null,
      addressDetails: selectedData.display_name?.split(",")[0] || "",
    }));
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
          {/* <div className="flex justify-end mb-6">
            <button
              type="button"
              onClick={() => setShowMap(true)}
              className="flex items-center text-sm text-emerald-600 hover:underline"
            >
              <Navigation className="mr-1 h-4 w-4" />
              Select from map
            </button>
          </div> */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field icon={Landmark} label="State/Province" error={errors.state}>
              <select
                name="state"
                className="w-full rounded-lg border border-gray-300 p-3 text-sm 
                focus:outline-none focus:ring-emerald-500 focus:ring-1"
                value={formData.state || ""}
                onChange={handleStateChange}
                disabled={isSubmitting}
              >
                <option value="">Select a province</option>
                {Object.keys(pakistaniStates).map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </Field>

            <Field icon={Landmark} label="City" error={errors.city}>
              <select
                name="city"
                className="w-full rounded-lg border border-gray-300 p-3 text-sm 
                focus:outline-none focus:ring-emerald-500 focus:ring-1"
                value={formData.city || ""}
                onChange={handleCityChange}
                disabled={isSubmitting || !formData.state}
              >
                <option value="">
                  {formData.state ? "Select a city" : "First select province"}
                </option>
                {availableCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field icon={Globe} label="Country" error={errors.country}>
            <Input
              name="country"
              value="Pakistan"
              readOnly
              disabled
              className="bg-gray-100 cursor-not-allowed"
            />
          </Field>

          <Field
            icon={MapPin}
            label="Additional Details"
            error={errors.addressDetails}
          >
            <textarea
              name="addressDetails"
              className="w-full rounded-lg border border-gray-300 p-3 text-sm 
              focus:outline-none focus:ring-emerald-500 focus:ring-1 
              resize-none"
              rows={2}
              placeholder="Street no, House no, Landmark, apartment number, etc."
              value={formData.addressDetails || ""}
              onChange={handleInputChange}
              disabled={isSubmitting}
            />
          </Field>

          {errors.coordinates && (
            <div className="text-red-500 text-sm mt-2">
              {errors.coordinates}
            </div>
          )}

          <input
            type="hidden"
            name="latitude"
            value={formData.latitude || ""}
            onChange={handleInputChange}
          />
          <input
            type="hidden"
            name="longitude"
            value={formData.longitude || ""}
            onChange={handleInputChange}
          />
        </>
      )}
    </div>
  );
};
