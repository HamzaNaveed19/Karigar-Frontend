"use client"

import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
import { Plus, Edit, Trash, AlertCircle } from "react-feather"
import { addService, updateService, deleteService, predefinedServices } from "../../redux/slices/servicesSlice"
import ServiceModal from "../../components/services/ServiceModal"
import ConfirmModal from "../../components/common/ConfirmModal"

const Services = () => {
  const { data: services, loading, actionLoading } = useSelector((state) => state.services)
  const { data: profile } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const { t } = useTranslation()

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
    if (modalMode === "add") {
      dispatch(addService(serviceData))
    } else {
      dispatch(updateService({ id: currentService.id, ...serviceData }))
    }
    setIsModalOpen(false)
  }

  const handleDeleteConfirm = () => {
    dispatch(deleteService(currentService.id))
    setIsConfirmModalOpen(false)
  }

  // Get predefined service options based on profession
  const serviceOptions = profile?.profession ? predefinedServices[profile.profession] || [] : []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{t("common.services")}</h1>
        <button
          onClick={handleAddClick}
          className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          {t("services.addService")}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-medium text-gray-900">{t("services.yourServices")}</h2>
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
                    {t("services.serviceName")}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {t("services.price")}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {t("services.duration")}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {t("services.actions")}
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
                        <span className="sr-only">{t("services.editService")}</span>
                      </button>
                      <button onClick={() => handleDeleteClick(service)} className="text-red-600 hover:text-red-900">
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">{t("services.deleteService")}</span>
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
            <p>{t("services.noServices")}</p>
            <button
              onClick={handleAddClick}
              className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              {t("services.addService")}
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
        title={t("services.deleteService")}
        message={t("services.confirmDelete")}
        confirmText={t("common.delete")}
        confirmButtonClass="bg-red-600 hover:bg-red-700 focus:ring-red-500"
        loading={actionLoading}
      />
    </div>
  )
}

export default Services;
