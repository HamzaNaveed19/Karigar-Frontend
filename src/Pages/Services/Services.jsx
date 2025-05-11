"use client"

import { useState, useEffect } from "react"
import { Plus, Edit, Trash, AlertCircle } from "lucide-react"
import ServiceModal from "../../Components/Services/ServiceModal";
import ConfirmModal from "../../Components/Common/ConfirmModal";


// Predefined service options
const predefinedServices = {
  Electrician: [
    "Basic Electrical Repair",
    "Wiring Installation",
    "Circuit Breaker Replacement",
    "Lighting Installation",
    "Fan Installation",
    "Electrical Troubleshooting",
  ],
  Plumber: [
    "Pipe Repair",
    "Drain Cleaning",
    "Toilet Repair",
    "Faucet Installation",
    "Water Heater Repair",
    "Bathroom Fixture Installation",
  ],
  Carpenter: [
    "Furniture Repair",
    "Door Installation",
    "Cabinet Installation",
    "Shelving Installation",
    "Wooden Floor Repair",
    "Custom Furniture Building",
  ],
  Painter: [
    "Interior Painting",
    "Exterior Painting",
    "Wall Texture Application",
    "Wallpaper Installation",
    "Paint Removal",
    "Decorative Painting",
  ],
  Tutor: [
    "Mathematics Tutoring",
    "Science Tutoring",
    "English Language Tutoring",
    "Computer Skills Training",
    "Test Preparation",
    "Homework Help",
  ],
}

const Services = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [currentService, setCurrentService] = useState(null)
  const [modalMode, setModalMode] = useState("add")
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [providerProfession, setProviderProfession] = useState("Electrician")
  // const providerId = "68136e4d342756dad21e994b" // Use the correct provider ID consistently
  const providerId = sessionStorage.getItem("userId") // Use the correct provider ID consistently

  // Fetch services data
  const fetchServices = async () => {
    setLoading(true)
    try {
      console.log("Fetching provider data...")
      const response = await fetch(`http://localhost:5050/provider/${providerId}`)

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      console.log("Provider data loaded:", data)

      // Extract services from the provider data
      if (data.services && Array.isArray(data.services)) {
        setServices(data.services)
        localStorage.setItem("services", JSON.stringify(data.services)) // Store in localStorage
      } else {
        console.log("No services found in provider data, using empty array")
        setServices([])
        localStorage.setItem("services", JSON.stringify([])) // Store in localStorage
      }

      // Set profession for service options
      if (data.profession) {
        setProviderProfession(data.profession)
      }
      setError(null)
    } catch (err) {
      console.error("Failed to fetch services:", err)
      setError(`Failed to load services: ${err.message}. Please check your API connection.`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const savedServices = localStorage.getItem("services")
    if (savedServices) {
      setServices(JSON.parse(savedServices)) // Load from localStorage
      setLoading(false) // Stop loading since we have data
    } else {
      fetchServices() // Fetch from API if nothing is in localStorage
    }
  }, [])

  const handleAddClick = () => {
    setCurrentService(null)
    setModalMode("add")
    setIsModalOpen(true)
  }

  const handleEditClick = (service) => {
    setCurrentService(service)
    setModalMode("edit")
    setIsModalOpen(true)
  }

  const handleDeleteClick = (service) => {
    setCurrentService(service)
    setIsConfirmModalOpen(true)
  }

  // Handle service submission (add/edit)
  const handleServiceSubmit = async (serviceData) => {
    setActionLoading(true)
    setError(null)

    try {
      // Prepare the new service object to add
      const newService = {
        name: serviceData.name,
        price: Number(serviceData.price),
        duration: Number(serviceData.duration),
      }

      // Check if the service already exists in the current list of services
      const isDuplicate = services.some((service) => service.name === newService.name)

      if (isDuplicate) {
        setError("This service already exists.")
        setActionLoading(false)
        return // Prevent adding the duplicate service
      }

      console.log("Adding service with data:", newService)

      // Send only the new service to add, not the entire services array
      const response = await fetch(`http://localhost:5050/provider/addServices/${providerId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          services: [newService], // Send only the new service in an array
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Server error response:", errorText)
        throw new Error(`Server returned ${response.status}: ${response.statusText}`)
      }

      const result = await response.json()
      console.log("Service added successfully:", result)

      // Update the services state with the new service added to the existing services
      const updatedServices = [...services, newService]
      setServices(updatedServices)
      localStorage.setItem("services", JSON.stringify(updatedServices)) // Persist to localStorage
      setError(null)
    } catch (err) {
      console.error("Failed to add service:", err)
      setError(`Failed to add service: ${err.message}. Please check your API connection.`)
    } finally {
      setActionLoading(false)
      setIsModalOpen(false)
    }
  }

  // Handle service deletion by service name
  const handleDeleteConfirm = async () => {
    setActionLoading(true)
    setError(null)

    try {
      if (!currentService || !currentService.name) {
        throw new Error("No service selected or service name is missing")
      }

      // Prepare the request data using service name
      const requestData = {
        serviceName: currentService.name, // Send service name for deletion
      }

      console.log("Deleting service with name:", currentService.name)

      const response = await fetch(`http://localhost:5050/provider/deleteService/${providerId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Server error response:", errorText)
        throw new Error(`Server returned ${response.status}: ${response.statusText}`)
      }

      console.log("Service deleted successfully")

      // Directly update the state by removing the deleted service
      const updatedServices = services.filter((service) => service.name !== currentService.name)
      setServices(updatedServices)
      localStorage.setItem("services", JSON.stringify(updatedServices)) // Persist updated list to localStorage
      setError(null)
    } catch (err) {
      console.error("Failed to delete service:", err)
      setError(`Failed to delete service: ${err.message}. Please check your API connection.`)
    } finally {
      setActionLoading(false)
      setIsConfirmModalOpen(false)
    }
  }

  // Get predefined service options based on profession
  const serviceOptions = providerProfession ? predefinedServices[providerProfession] || [] : []

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
                onClick={() => fetchServices()}
                className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs"
              >
                Retry Connection
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Services</h1>
        <button
          onClick={handleAddClick}
          className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-medium text-gray-900">Your Services</h2>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
        ) : services && services.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Service Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Duration
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {services.map((service) => (
                  <tr key={service._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{service.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Rs. {service.price}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{service.duration} min</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEditClick(service)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit Service</span>
                      </button>
                      <button onClick={() => handleDeleteClick(service)} className="text-red-600 hover:text-red-900">
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Delete Service</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <AlertCircle className="h-12 w-12 text-gray-400 mb-3" />
            <p>No services added yet</p>
            <button
              onClick={handleAddClick}
              className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              Add Service
            </button>
          </div>
        )}
      </div>

      {/* Service Modal */}
      <ServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleServiceSubmit}
        service={currentService}
        mode={modalMode}
        serviceOptions={serviceOptions}
        loading={actionLoading}
      />

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Service"
        message="Are you sure you want to delete this service? This action cannot be undone."
        confirmText="Delete"
        confirmButtonClass="bg-red-600 hover:bg-red-700 focus:ring-red-500"
        loading={actionLoading}
      />
    </div>
  )
}

export default Services
