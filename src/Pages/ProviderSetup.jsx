"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const ProviderSetup = () => {
  const navigate = useNavigate()
  const userId = sessionStorage.getItem("userId")
  
  // Redirect if no userId is found
  useEffect(() => {
    if (!userId) {
      navigate("/login")
    }
  }, [userId, navigate])

  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Info
    personalImage: "",
    verificationDocuments: {
      frontPic: "",
      backPic: ""
    },
    
    // Professional Info
    profession: "",
    about: "",
    experience: "",
    education: "",
    skills: [""],
    languages: [""],
    
    // Location Info
    location: {
      latitude: "",
      longitude: "",
      address: ""
    },
    
    // Service Details
    workingHours: {
      MF: "09:00-18:00",
      Sat: "10:00-16:00",
      Sun: "Closed"
    },
    services: [
      {
        name: "",
        price: "",
        duration: ""
      }
    ]
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Function to handle input changes
  const handleChange = (e, section, index, subField) => {
    const { name, value } = e.target

    if (section && subField) {
      // Handle nested fields like services[0].name
      setFormData(prev => {
        const updatedSection = [...prev[section]]
        updatedSection[index] = {
          ...updatedSection[index],
          [subField]: value
        }
        return {
          ...prev,
          [section]: updatedSection
        }
      })
    } else if (section) {
      // Handle fields like location.address
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [name]: value
        }
      }))
    } else {
      // Handle simple fields
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }

    if (error) setError(null)
  }

  // Array field handlers (skills, languages)
  const handleArrayChange = (e, field, index) => {
    const { value } = e.target
    setFormData(prev => {
      const updated = [...prev[field]]
      updated[index] = value
      return {
        ...prev,
        [field]: updated
      }
    })
  }

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], ""]
    }))
  }

  const removeArrayItem = (field, index) => {
    if (formData[field].length <= 1) return
    
    setFormData(prev => {
      const updated = [...prev[field]]
      updated.splice(index, 1)
      return {
        ...prev,
        [field]: updated
      }
    })
  }

  // Service handlers
  const addService = () => {
    setFormData(prev => ({
      ...prev,
      services: [
        ...prev.services,
        { name: "", price: "", duration: "" }
      ]
    }))
  }

  const removeService = (index) => {
    if (formData.services.length <= 1) return
    
    setFormData(prev => {
      const updated = [...prev.services]
      updated.splice(index, 1)
      return {
        ...prev,
        services: updated
      }
    })
  }

  // Handle file uploads
  // const handleFileChange = (e, field, subField) => {
  //   const file = e.target.files[0]
  //   if (!file) return

  //   // In a real app, you would upload the file to your server or cloud storage
  //   // For this example, we'll simulate it with local URLs
  //   const fileUrl = URL.createObjectURL(file)
    
  //   if (subField) {
  //     setFormData(prev => ({
  //       ...prev,
  //       [field]: {
  //         ...prev[field],
  //         [subField]: fileUrl
  //       }
  //     }))
  //   } else {
  //     setFormData(prev => ({
  //       ...prev,
  //       [field]: fileUrl
  //     }))
  //   }
  // }
  

const handleFileChange = async (e, field, subField) => {
  const file = e.target.files[0]
  if (!file) return

  try {
    const formDataToSend = new FormData()
    formDataToSend.append("profileImage", file)

    // Adjust URL to your actual upload endpoint for files
    const uploadRes = await fetch("http://localhost:5050/upload", {
      method: "POST",
      body: formDataToSend,
    })

    if (!uploadRes.ok) throw new Error("File upload failed")

    const uploadData = await uploadRes.json()

    const fileUrl = uploadData.imageUrl

    if (subField) {
      setFormData(prev => ({
        ...prev,
        [field]: {
          ...prev[field],
          [subField]: fileUrl
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: fileUrl
      }))
    }
    if (error) setError(null)
  } catch (err) {
    console.error("Upload error:", err)
    setError("Failed to upload file. Please try again.")
  }
}

  // Get current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords
          setFormData(prev => ({
            ...prev,
            location: {
              ...prev.location,
              latitude,
              longitude
            }
          }))
        },
        error => {
          console.error("Error getting location:", error)
          setError("Could not get your current location. Please enter it manually.")
        }
      )
    } else {
      setError("Geolocation is not supported by your browser. Please enter your location manually.")
    }
  }

  // Submit the form
  const handleSubmit = async () => {
    setLoading(true)
    setError(null)

    try {
        const body = JSON.stringify(formData);
        console.log("Sending body:", body);

        const res = await fetch(`http://localhost:5050/provider/${userId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: body,
        });


      const data = await res.json()

      if (res.ok) {
        console.log("Provider setup successful:", data)
        navigate("/service-provider-dashboard")
      } else {
        console.log("Provider setup failed:", data)
        setError(data.message || "Failed to setup provider profile")
      }
    } catch (err) {
      console.error("Network error:", err)
      setError("Network error. Please check your connection and try again.")
    }

    setLoading(false)
  }

  // Next step
  const nextStep = () => {
    // Simple validation
    if (currentStep === 1) {
      // Validate personal info
      if (!formData.personalImage) {
        setError("Please upload your profile picture")
        return
      }
      if (!formData.verificationDocuments.frontPic || !formData.verificationDocuments.backPic) {
        setError("Please upload both front and back verification documents")
        return
      }
    } else if (currentStep === 2) {
      // Validate professional info
      if (!formData.profession) {
        setError("Please enter your profession")
        return
      }
      if (!formData.about) {
        setError("Please provide information about yourself")
        return
      }
      if (!formData.experience) {
        setError("Please enter your years of experience")
        return
      }
    } else if (currentStep === 3) {
      // Validate location
      if (!formData.location.address) {
        setError("Please enter your address")
        return
      }
    }

    setError(null)
    setCurrentStep(currentStep + 1)
  }

  // Previous step
  const prevStep = () => {
    setCurrentStep(currentStep - 1)
  }

  // Render different form sections based on current step
  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="personalImage" className="block text-sm font-medium text-gray-700">
                  Profile Picture
                </label>
                <div className="mt-1 flex items-center space-x-5">
                  <div className="flex-shrink-0 h-16 w-16 rounded-full overflow-hidden bg-gray-100">
                    {formData.personalImage ? (
                      <img src={formData.personalImage} alt="Profile" className="h-full w-full object-cover" />
                    ) : (
                      <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    )}
                  </div>
                  <label
                    htmlFor="personalImage-upload"
                    className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="personalImage-upload"
                      name="personalImage-upload"
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'personalImage')}
                    />
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">ID Verification</label>
                <p className="text-xs text-gray-500 mb-2">Please upload front and back of your ID document</p>
                
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="frontPic-upload" className="block text-sm font-medium text-gray-700 mb-1">
                      Front Side
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        {formData.verificationDocuments.frontPic ? (
                          <img 
                            src={formData.verificationDocuments.frontPic} 
                            alt="ID Front" 
                            className="mx-auto h-24 w-auto object-contain" 
                          />
                        ) : (
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="frontPic-upload"
                            className="cursor-pointer relative bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-emerald-500"
                          >
                            <span>Upload a file</span>
                            <input 
                              id="frontPic-upload" 
                              name="frontPic" 
                              type="file" 
                              className="sr-only" 
                              accept="image/*"
                              onChange={(e) => handleFileChange(e, 'verificationDocuments', 'frontPic')}
                            />
                          </label>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="backPic-upload" className="block text-sm font-medium text-gray-700 mb-1">
                      Back Side
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        {formData.verificationDocuments.backPic ? (
                          <img 
                            src={formData.verificationDocuments.backPic} 
                            alt="ID Back" 
                            className="mx-auto h-24 w-auto object-contain" 
                          />
                        ) : (
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="backPic-upload"
                            className="cursor-pointer relative bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-emerald-500"
                          >
                            <span>Upload a file</span>
                            <input 
                              id="backPic-upload" 
                              name="backPic" 
                              type="file" 
                              className="sr-only" 
                              accept="image/*"
                              onChange={(e) => handleFileChange(e, 'verificationDocuments', 'backPic')}
                            />
                          </label>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Professional Information</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="profession" className="block text-sm font-medium text-gray-700">
                  Profession
                </label>
                <select
                  id="profession"
                  name="profession"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-md"
                  value={formData.profession}
                  onChange={(e) => handleChange(e)}
                  required
                >
                  <option value="">Select your profession</option>
                  <option value="Plumber">Plumber</option>
                  <option value="Electrician">Electrician</option>
                  <option value="Carpenter">Carpenter</option>
                  <option value="Painter">Painter</option>
                  <option value="Cleaner">Cleaner</option>
                  <option value="Gardener">Gardener</option>
                  <option value="Mechanic">Mechanic</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                  About
                </label>
                <div className="mt-1">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Describe your expertise, services, and experience..."
                    value={formData.about}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Brief description for your profile. This will be visible to clients.
                </p>
              </div>
              
              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                  Years of Experience
                </label>
                <input
                  type="number"
                  name="experience"
                  id="experience"
                  min="0"
                  max="50"
                  className="mt-1 focus:ring-emerald-500 focus:border-emerald-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={formData.experience}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="education" className="block text-sm font-medium text-gray-700">
                  Education / Certification
                </label>
                <input
                  type="text"
                  name="education"
                  id="education"
                  className="mt-1 focus:ring-emerald-500 focus:border-emerald-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="Degree or certification in your field"
                  value={formData.education}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Skills</label>
                <p className="text-xs text-gray-500 mb-2">Add skills relevant to your profession</p>
                
                {formData.skills.map((skill, index) => (
                  <div key={`skill-${index}`} className="flex mt-2">
                    <input
                      type="text"
                      className="focus:ring-emerald-500 focus:border-emerald-500 flex-grow shadow-sm sm:text-sm border-gray-300 rounded-md"
                      value={skill}
                      onChange={(e) => handleArrayChange(e, 'skills', index)}
                      placeholder="e.g. Wiring, Repair, Installation"
                    />
                    <button
                      type="button"
                      className="ml-2 inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      onClick={() => removeArrayItem('skills', index)}
                      disabled={formData.skills.length <= 1}
                    >
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
                
                <button
                  type="button"
                  className="mt-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-emerald-700 bg-emerald-100 hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                  onClick={() => addArrayItem('skills')}
                >
                  <svg className="-ml-0.5 mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add Skill
                </button>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Languages</label>
                <p className="text-xs text-gray-500 mb-2">Add languages you speak</p>
                
                {formData.languages.map((language, index) => (
                  <div key={`language-${index}`} className="flex mt-2">
                    <input
                      type="text"
                      className="focus:ring-emerald-500 focus:border-emerald-500 flex-grow shadow-sm sm:text-sm border-gray-300 rounded-md"
                      value={language}
                      onChange={(e) => handleArrayChange(e, 'languages', index)}
                      placeholder="e.g. English, Urdu, Punjabi"
                    />
                    <button
                      type="button"
                      className="ml-2 inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      onClick={() => removeArrayItem('languages', index)}
                      disabled={formData.languages.length <= 1}
                    >
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
                
                <button
                  type="button"
                  className="mt-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-emerald-700 bg-emerald-100 hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                  onClick={() => addArrayItem('languages')}
                >
                  <svg className="-ml-0.5 mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add Language
                </button>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Location & Availability</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="text"
                    name="address"
                    id="address"
                    className="focus:ring-emerald-500 focus:border-emerald-500 block w-full pr-20 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Full address"
                    value={formData.location.address}
                    onChange={(e) => handleChange(e, 'location')}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <button
                      type="button"
                      onClick={getCurrentLocation}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 mr-2"
                    >
                      Current
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">
                    Latitude
                  </label>
                  <input
                    type="text"
                    name="latitude"
                    id="latitude"
                    className="mt-1 focus:ring-emerald-500 focus:border-emerald-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="e.g. 31.5204"
                    value={formData.location.latitude}
                    onChange={(e) => handleChange(e, 'location')}
                  />
                </div>
                <div>
                  <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">
                    Longitude
                  </label>
                  <input
                    type="text"
                    name="longitude"
                    id="longitude"
                    className="mt-1 focus:ring-emerald-500 focus:border-emerald-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="e.g. 74.3587"
                    value={formData.location.longitude}
                    onChange={(e) => handleChange(e, 'location')}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Working Hours
                </label>
                <div className="grid grid-cols-1 gap-y-3">
                  <div className="flex items-center">
                    <span className="w-28 block text-sm font-medium text-gray-700">Mon - Fri:</span>
                    <input
                      type="text"
                      name="MF"
                      className="ml-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="09:00-18:00"
                      value={formData.workingHours.MF}
                      onChange={(e) => handleChange(e, 'workingHours')}
                    />
                  </div>
                  <div className="flex items-center">
                    <span className="w-28 block text-sm font-medium text-gray-700">Saturday:</span>
                    <input
                      type="text"
                      name="Sat"
                      className="ml-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="10:00-16:00"
                      value={formData.workingHours.Sat}
                      onChange={(e) => handleChange(e, 'workingHours')}
                    />
                  </div>
                  <div className="flex items-center">
                    <span className="w-28 block text-sm font-medium text-gray-700">Sunday:</span>
                    <input
                      type="text"
                      name="Sun"
                      className="ml-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="Closed"
                      value={formData.workingHours.Sun}
                      onChange={(e) => handleChange(e, 'workingHours')}
                    />
                  </div>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Format: HH:MM-HH:MM (e.g. 09:00-18:00) or "Closed"
                </p>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Services & Pricing</h3>
            
            <div className="space-y-6">
              {formData.services.map((service, index) => (
                <div key={`service-${index}`} className="border border-gray-200 rounded-md p-4 bg-gray-50">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-sm font-medium text-gray-900">Service #{index + 1}</h4>
                    {formData.services.length > 1 && (
                      <button
                        type="button"
                        className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        onClick={() => removeService(index)}
                      >
                        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor={`service-name-${index}`} className="block text-sm font-medium text-gray-700">
                        Service Name
                      </label>
                      <input
                        type="text"
                        id={`service-name-${index}`}
                        className="mt-1 focus:ring-emerald-500 focus:border-emerald-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={service.name}
                        onChange={(e) => handleChange(e, 'services', index, 'name')}
                        placeholder="e.g. Pipe Repair"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor={`service-price-${index}`} className="block text-sm font-medium text-gray-700">
                          Price (PKR)
                        </label>
                        <input
                          type="number"
                          id={`service-price-${index}`}
                          min="0"
                          className="mt-1 focus:ring-emerald-500 focus:border-emerald-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          value={service.price}
                          onChange={(e) => handleChange(e, 'services', index, 'price')}
                          placeholder="e.g. 2000"
                        />
                      </div>
                      <div>
                        <label htmlFor={`service-duration-${index}`} className="block text-sm font-medium text-gray-700">
                          Duration (hours)
                        </label>
                        <input
                          type="number"
                          id={`service-duration-${index}`}
                          min="0.5"
                          step="0.5"
                          className="mt-1 focus:ring-emerald-500 focus:border-emerald-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          value={service.duration}
                          onChange={(e) => handleChange(e, 'services', index, 'duration')}
                          placeholder="e.g. 2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <button
                type="button"
                className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-emerald-700 bg-emerald-100 hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                onClick={addService}
              >
                <svg className="-ml-0.5 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Another Service
              </button>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Review & Submit</h3>
            
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Provider Information</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Please verify your information before submitting.</p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Profession</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {formData.profession || "Not specified"}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Experience</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {formData.experience || "0"} years
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Location</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {formData.location.address || "Not specified"}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Services</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                        {formData.services.map((service, index) => (
                          <li key={index} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                            <div className="w-0 flex-1 flex items-center">
                              <span className="ml-2 flex-1 w-0 truncate">
                                {service.name || "Unnamed Service"} - PKR {service.price || "0"} ({service.duration || "0"} hours)
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Service Provider Setup</h2>
          <p className="mt-2 text-sm text-gray-600">
            Complete your profile to start providing services
          </p>
        </div>
        
        <div className="mt-8">
          {/* Progress steps */}
          <nav aria-label="Progress">
            <ol className="space-y-4 md:flex md:space-y-0 md:space-x-8">
              {[
                'Personal Info',
                'Professional Info',
                'Location',
                'Services',
                'Review'
              ].map((step, stepIdx) => (
                <li key={step} className="md:flex-1">
                  <div
                    className={`group pl-4 py-2 flex flex-col border-l-4 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4 ${
                      stepIdx + 1 < currentStep
                        ? 'border-emerald-500 hover:border-emerald-700'
                        : stepIdx + 1 === currentStep
                        ? 'border-emerald-500'
                        : 'border-gray-200'
                    }`}
                  >
                    <span
                      className={`text-xs font-semibold tracking-wide uppercase ${
                        stepIdx + 1 <= currentStep ? 'text-emerald-600' : 'text-gray-500'
                      }`}
                    >
                      Step {stepIdx + 1}
                    </span>
                    <span className="text-sm font-medium">{step}</span>
                  </div>
                </li>
              ))}
            </ol>
          </nav>

          {/* Form */}
          <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {error && (
              <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}
            
            <form className="space-y-6">
              {renderStep()}
              
              <div className="flex justify-between">
                <button
                  type="button"
                  className={`inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${
                    currentStep === 1 ? 'invisible' : ''
                  }`}
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  Previous
                </button>
                
                {currentStep < 5 ? (
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                    onClick={nextStep}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      'Submit'
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderSetup;