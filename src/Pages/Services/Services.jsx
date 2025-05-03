"use client"

import { useState } from "react"
import { Plus, Edit, Trash, AlertCircle } from "lucide-react"
import ServiceModal from "../../Components/Services/ServiceModal"
import ConfirmModal from "../../Components/Common/ConfirmModal"

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
  // Hardcoded dummy data
  // TODO: Replace with API call to fetch services
  const dummyServices = [
    { id: "1", name: "Basic Electrical Repair", price: 1500, duration: 60 },
    { id: "2", name: "Wiring Installation", price: 3000, duration: 120 },
    { id: "3", name: "Circuit Breaker Replacement", price: 2000, duration: 90 },
  ]

  // Hardcoded profile data (just for profession)
  // TODO: Replace with API call to fetch profile or pass from parent component
  const dummyProfile = {
    profession: "Electrician",
  }

  const [services, setServices] = useState(dummyServices)
  const [loading, setLoading] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [currentService, setCurrentService] = useState(null)
  const [modalMode, setModalMode] = useState("add")

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

  const handleServiceSubmit = (serviceData) => {
    setActionLoading(true)

    // TODO: Replace with API call to add/update service
    setTimeout(() => {
      if (modalMode === "add") {
        // Generate a fake ID for new service
        const newService = {
          id: Date.now().toString(),
          ...serviceData,
        }
        setServices([...services, newService])
      } else {
        // Update existing service
        const updatedServices = services.map((service) =>
          service.id === currentService.id ? { ...service, ...serviceData } : service,
        )
        setServices(updatedServices)
      }
      setActionLoading(false)
      setIsModalOpen(false)
    }, 1000)
  }

  const handleDeleteConfirm = () => {
    setActionLoading(true)

    // TODO: Replace with API call to delete service
    setTimeout(() => {
      const filteredServices = services.filter((service) => service.id !== currentService.id)
      setServices(filteredServices)
      setActionLoading(false)
      setIsConfirmModalOpen(false)
    }, 1000)
  }

  // Get predefined service options based on profession
  const serviceOptions = dummyProfile?.profession ? predefinedServices[dummyProfile.profession] || [] : []

  return (
    <div className="space-y-6">
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
                  <tr key={service.id}>
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
