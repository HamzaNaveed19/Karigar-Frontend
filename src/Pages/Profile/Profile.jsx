"use client"

import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
import { Camera, Upload } from "react-feather"
import { updateProfile, uploadDocument } from "../../redux/slices/profileSlice"

// Predefined options
const professionOptions = [
  "Electrician",
  "Plumber",
  "Carpenter",
  "Painter",
  "Mechanic",
  "Tutor",
  "Cleaner",
  "Gardener",
  "Cook",
  "Driver",
  "Tailor",
  "Beautician",
  "Photographer",
  "Other",
]

const experienceOptions = [
  { value: 1, label: "1 year" },
  { value: 2, label: "2 years" },
  { value: 3, label: "3 years" },
  { value: 4, label: "4 years" },
  { value: 5, label: "5 years" },
  { value: 6, label: "6 years" },
  { value: 7, label: "7 years" },
  { value: 8, label: "8 years" },
  { value: 9, label: "9 years" },
  { value: 10, label: "10+ years" },
]

const languageOptions = ["English", "Urdu", "Punjabi", "Sindhi", "Pashto", "Balochi", "Arabic"]

const skillOptions = {
  Electrician: [
    "Electrical Wiring",
    "Circuit Repair",
    "Lighting Installation",
    "Troubleshooting",
    "Panel Installation",
    "Appliance Repair",
  ],
  Plumber: [
    "Pipe Fitting",
    "Drain Cleaning",
    "Fixture Installation",
    "Leak Repair",
    "Water Heater Installation",
    "Bathroom Plumbing",
  ],
  Carpenter: ["Furniture Making", "Cabinet Installation", "Door Repair", "Woodworking", "Framing", "Trim Work"],
  Painter: [
    "Interior Painting",
    "Exterior Painting",
    "Wall Preparation",
    "Color Mixing",
    "Texture Application",
    "Finish Work",
  ],
  Mechanic: [
    "Engine Repair",
    "Brake Service",
    "Transmission Repair",
    "Electrical Systems",
    "Suspension Work",
    "Diagnostics",
  ],
  Tutor: ["Mathematics", "Science", "English", "History", "Computer Skills", "Test Preparation"],
  Cleaner: [
    "Deep Cleaning",
    "Carpet Cleaning",
    "Window Cleaning",
    "Office Cleaning",
    "Post-Construction Cleaning",
    "Sanitization",
  ],
  Gardener: ["Lawn Care", "Planting", "Pruning", "Irrigation", "Landscape Design", "Pest Control"],
  Cook: ["Pakistani Cuisine", "International Cuisine", "Baking", "Catering", "Menu Planning", "Dietary Cooking"],
  Driver: [
    "Passenger Transport",
    "Delivery",
    "Chauffeur Services",
    "Navigation",
    "Vehicle Maintenance",
    "Safety Protocols",
  ],
  Tailor: ["Garment Alteration", "Custom Clothing", "Pattern Making", "Embroidery", "Fabric Selection", "Measurements"],
  Beautician: ["Haircuts", "Styling", "Makeup", "Facials", "Manicure/Pedicure", "Skin Care"],
  Photographer: [
    "Portrait Photography",
    "Event Photography",
    "Product Photography",
    "Editing",
    "Lighting",
    "Composition",
  ],
  Other: [
    "Customer Service",
    "Time Management",
    "Problem Solving",
    "Communication",
    "Organization",
    "Attention to Detail",
  ],
}

const Profile = () => {
  const { data: profile, loading, uploadLoading } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const [formData, setFormData] = useState({
    name: profile?.name || "",
    email: profile?.email || "",
    phone: profile?.phone || "",
    location: {
      address: profile?.location?.address || "",
    },
    profession: profile?.profession || "",
    about: profile?.about || "",
    experience: profile?.experience || 0,
    education: profile?.education || "",
    languages: profile?.languages || [],
    skills: profile?.skills || [],
  })

  const [activeTab, setActiveTab] = useState("personal")

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleSelectChange = (e) => {
    const { name, options } = e.target
    const selectedValues = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value)

    setFormData({
      ...formData,
      [name]: selectedValues,
    })
  }

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0]
    if (file) {
      dispatch(uploadDocument({ type, file }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updateProfile(formData))
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{t("common.profile")}</h1>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Profile Header */}
        <div className="relative h-48 bg-emerald-600">
          <div className="absolute -bottom-16 left-6 flex items-end">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-white bg-white overflow-hidden">
                {profile.personalImage ? (
                  <img
                    src={profile.personalImage || "/placeholder.svg"}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <span className="text-3xl font-bold">{profile.name.charAt(0)}</span>
                  </div>
                )}
              </div>
              <label
                htmlFor="profile-photo"
                className="absolute bottom-0 right-0 bg-emerald-500 text-white p-2 rounded-full cursor-pointer"
              >
                <Camera className="h-4 w-4" />
                <input
                  type="file"
                  id="profile-photo"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, "personalImage")}
                />
              </label>
            </div>
            <div className="ml-4 mb-4">
              <h2 className="text-xl font-bold text-white">{profile.name}</h2>
              <p className="text-emerald-100">{profile.profession}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="pt-20 px-6">
          <div className="flex border-b">
            <button
              className={`py-3 px-4 font-medium text-sm ${
                activeTab === "personal"
                  ? "border-b-2 border-emerald-500 text-emerald-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("personal")}
            >
              {t("profile.personalInfo")}
            </button>
            <button
              className={`py-3 px-4 font-medium text-sm ${
                activeTab === "professional"
                  ? "border-b-2 border-emerald-500 text-emerald-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("professional")}
            >
              {t("profile.professionalInfo")}
            </button>
            <button
              className={`py-3 px-4 font-medium text-sm ${
                activeTab === "verification"
                  ? "border-b-2 border-emerald-500 text-emerald-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("verification")}
            >
              {t("profile.verificationDocs")}
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Personal Information */}
          {activeTab === "personal" && (
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("profile.name")}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("profile.email")}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("profile.phone")}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="location.address" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("profile.address")}
                  </label>
                  <input
                    type="text"
                    id="location.address"
                    name="location.address"
                    value={formData.location.address}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Professional Information */}
          {activeTab === "professional" && (
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="profession" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("profile.profession")}
                  </label>
                  <select
                    id="profession"
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  >
                    <option value="">Select Profession</option>
                    {professionOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("profile.experience")}
                  </label>
                  <select
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  >
                    <option value="">Select Experience</option>
                    {experienceOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("profile.education")}
                  </label>
                  <input
                    type="text"
                    id="education"
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label htmlFor="languages" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("profile.languages")}
                  </label>
                  <select
                    id="languages"
                    name="languages"
                    multiple
                    value={formData.languages}
                    onChange={handleSelectChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  >
                    {languageOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1 text-xs text-gray-500">Hold Ctrl (or Cmd) to select multiple options</p>
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("profile.skills")}
                  </label>
                  <select
                    id="skills"
                    name="skills"
                    multiple
                    value={formData.skills}
                    onChange={handleSelectChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  >
                    {formData.profession && skillOptions[formData.profession]
                      ? skillOptions[formData.profession].map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))
                      : skillOptions["Other"].map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                  </select>
                  <p className="mt-1 text-xs text-gray-500">Hold Ctrl (or Cmd) to select multiple options</p>
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="about" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("profile.about")}
                  </label>
                  <textarea
                    id="about"
                    name="about"
                    rows="4"
                    value={formData.about}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  ></textarea>
                </div>
              </div>
            </div>
          )}

          {/* Verification Documents */}
          {activeTab === "verification" && (
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("profile.uploadIdFront")}</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center">
                    {profile.verificationDocuments?.frontPic ? (
                      <div className="relative w-full">
                        <img
                          src={profile.verificationDocuments.frontPic || "/placeholder.svg"}
                          alt="ID Front"
                          className="w-full h-48 object-cover rounded-md"
                        />
                        <label
                          htmlFor="id-front"
                          className="absolute bottom-2 right-2 bg-emerald-500 text-white p-2 rounded-full cursor-pointer"
                        >
                          <Upload className="h-4 w-4" />
                          <input
                            type="file"
                            id="id-front"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, "frontPic")}
                          />
                        </label>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-12 w-12 text-gray-400 mb-3" />
                        <p className="text-sm text-gray-500 mb-2">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</p>
                        <label
                          htmlFor="id-front"
                          className="mt-4 px-4 py-2 bg-emerald-500 text-white rounded-md cursor-pointer"
                        >
                          Upload
                          <input
                            type="file"
                            id="id-front"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, "frontPic")}
                          />
                        </label>
                      </>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("profile.uploadIdBack")}</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center">
                    {profile.verificationDocuments?.backPic ? (
                      <div className="relative w-full">
                        <img
                          src={profile.verificationDocuments.backPic || "/placeholder.svg"}
                          alt="ID Back"
                          className="w-full h-48 object-cover rounded-md"
                        />
                        <label
                          htmlFor="id-back"
                          className="absolute bottom-2 right-2 bg-emerald-500 text-white p-2 rounded-full cursor-pointer"
                        >
                          <Upload className="h-4 w-4" />
                          <input
                            type="file"
                            id="id-back"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, "backPic")}
                          />
                        </label>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-12 w-12 text-gray-400 mb-3" />
                        <p className="text-sm text-gray-500 mb-2">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</p>
                        <label
                          htmlFor="id-back"
                          className="mt-4 px-4 py-2 bg-emerald-500 text-white rounded-md cursor-pointer"
                        >
                          Upload
                          <input
                            type="file"
                            id="id-back"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, "backPic")}
                          />
                        </label>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="px-6 py-4 border-t bg-gray-50 flex justify-end">
            <button
              type="submit"
              disabled={loading || uploadLoading}
              className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-70"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {t("common.loading")}
                </span>
              ) : (
                t("profile.saveChanges")
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile;
