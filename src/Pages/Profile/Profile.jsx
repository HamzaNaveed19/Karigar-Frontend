"use client"

import { useState, useEffect } from "react"
import { Camera, Upload } from "lucide-react"

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
    "Wiring",
    "Repair",
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
    "Wiring",
    "Repair",
  ],
}

const Profile = () => {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [uploadLoading, setUploadLoading] = useState(false)
  const [error, setError] = useState(null)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: {
      address: "",
    },
    profession: "",
    about: "",
    experience: 0,
    education: "",
    languages: [],
    skills: [],
  })

  const [activeTab, setActiveTab] = useState("personal")
  const providerId = "68136e4d342756dad21e994b" // Use the correct provider ID consistently

  // Fetch provider data
  const fetchProfile = async () => {
    setLoading(true)
    try {
      console.log("Fetching profile data...")
      const response = await fetch(`http://localhost:5050/provider/${providerId}`)

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      console.log("Profile data loaded:", data)
      setProfile(data)

      // Initialize form data with profile data
      setFormData({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        location: {
          address: data.location?.address || "",
        },
        profession: data.profession || "",
        about: data.about || "",
        experience: data.experience || 0,
        education: data.education || "",
        languages: data.languages || [],
        skills: data.skills || [],
      })
      setError(null)
    } catch (err) {
      console.error("Failed to fetch profile:", err)
      setError(`Failed to load profile data: ${err.message}. Please check your API connection.`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

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
      setUploadLoading(true)

      // TODO: Replace with API call to upload file
      // For now, using dummy implementation
      setTimeout(() => {
        const updatedProfile = { ...profile }

        if (type === "personalImage") {
          updatedProfile.personalImage = URL.createObjectURL(file)
        } else if (type === "frontPic") {
          if (!updatedProfile.verificationDocuments) {
            updatedProfile.verificationDocuments = {}
          }
          updatedProfile.verificationDocuments.frontPic = URL.createObjectURL(file)
        } else if (type === "backPic") {
          if (!updatedProfile.verificationDocuments) {
            updatedProfile.verificationDocuments = {}
          }
          updatedProfile.verificationDocuments.backPic = URL.createObjectURL(file)
        }

        setProfile(updatedProfile)
        setUploadLoading(false)
      }, 1000)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Prepare data in the format expected by the API
    const updateData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      location: {
        ...(profile?.location || {}),
        address: formData.location.address,
      },
      profession: formData.profession,
      about: formData.about,
      experience: formData.experience,
      education: formData.education,
      languages: formData.languages,
      skills: formData.skills,
    }

    try {
      console.log("Updating profile with data:", updateData)
      const response = await fetch(`http://localhost:5050/provider/${providerId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      })

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}: ${response.statusText}`)
      }

      const updatedProfile = await response.json()
      setProfile({ ...profile, ...updatedProfile })
      setError(null)
      console.log("Profile updated successfully")
    } catch (err) {
      console.error("Failed to update profile:", err)
      setError(`Failed to update profile: ${err.message}. Please check your API connection.`)
    } finally {
      setLoading(false)
    }
  }

  // Helper function to get a default image if the API image URL is not working
  const getImageUrl = (url, defaultImage) => {
    if (!url) return defaultImage
    return url
  }

  if (loading && !profile) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <div className="flex">
            <div className="py-1">
              <svg
                className="fill-current h-6 w-6 text-red-500 mr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            </div>
            <div>
              <p className="font-bold">API Connection Error</p>
              <p className="text-sm">{error}</p>
              <button
                onClick={() => fetchProfile()}
                className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs"
              >
                Retry Connection
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Profile Header */}
        <div className="relative h-48 bg-emerald-600">
          <div className="absolute -bottom-16 left-6 flex items-end">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-white bg-white overflow-hidden">
                {profile?.personalImage ? (
                  <img
                    src={profile.personalImage || "/placeholder.svg"}
                    alt={profile?.name || "Profile"}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.log("Profile image failed to load, using fallback")
                      e.target.onerror = null
                      e.target.src = "/placeholder.svg?height=200&width=200"
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <span className="text-3xl font-bold">{profile?.name?.charAt(0) || "A"}</span>
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
              <h2 className="text-xl font-bold text-white">{profile?.name}</h2>
              <p className="text-emerald-100">{profile?.profession}</p>
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
              Personal Information
            </button>
            <button
              className={`py-3 px-4 font-medium text-sm ${
                activeTab === "professional"
                  ? "border-b-2 border-emerald-500 text-emerald-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("professional")}
            >
              Professional Information
            </button>
            <button
              className={`py-3 px-4 font-medium text-sm ${
                activeTab === "verification"
                  ? "border-b-2 border-emerald-500 text-emerald-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("verification")}
            >
              Verification Documents
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
                    Name
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
                    Email
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
                    Phone
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
                    Address
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
                    Profession
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
                    Experience
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
                    Education
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
                    Languages
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
                    Skills
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
                    {/* Include all skills from the API response */}
                    {profile?.skills?.map((skill) => (
                      <option key={skill} value={skill}>
                        {skill}
                      </option>
                    ))}

                    {/* Also include predefined skills based on profession */}
                    {formData.profession && skillOptions[formData.profession]
                      ? skillOptions[formData.profession].map(
                          (option) =>
                            // Only add if not already in the list
                            !profile?.skills?.includes(option) && (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ),
                        )
                      : skillOptions["Other"].map(
                          (option) =>
                            // Only add if not already in the list
                            !profile?.skills?.includes(option) && (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ),
                        )}
                  </select>
                  <p className="mt-1 text-xs text-gray-500">Hold Ctrl (or Cmd) to select multiple options</p>
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="about" className="block text-sm font-medium text-gray-700 mb-1">
                    About
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload ID Front</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center">
                    {profile?.verificationDocuments?.frontPic ? (
                      <div className="relative w-full">
                        <img
                          src={profile.verificationDocuments.frontPic || "/placeholder.svg"}
                          alt="ID Front"
                          className="w-full h-48 object-cover rounded-md"
                          onError={(e) => {
                            console.log("Front ID image failed to load, using fallback")
                            e.target.onerror = null
                            e.target.src = "/placeholder.svg?height=300&width=500"
                          }}
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload ID Back</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center">
                    {profile?.verificationDocuments?.backPic ? (
                      <div className="relative w-full">
                        <img
                          src={profile.verificationDocuments.backPic || "/placeholder.svg"}
                          alt="ID Back"
                          className="w-full h-48 object-cover rounded-md"
                          onError={(e) => {
                            console.log("Back ID image failed to load, using fallback")
                            e.target.onerror = null
                            e.target.src = "/placeholder.svg?height=300&width=500"
                          }}
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
                  Loading...
                </span>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile;
