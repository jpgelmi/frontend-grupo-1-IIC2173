import React from 'react'
import { XCircle } from 'lucide-react'
import { useNavigate, useLocation } from "react-router-dom";

export default function AdminError() {
    const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 text-center">
        <XCircle className="mx-auto h-16 w-16 text-red-500 mb-6" />
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Acceso No Autorizado</h1>
        <p className="text-gray-600 mb-6">
          Lo sentimos, no tienes permiso para acceder a esta página. Si crees que esto es un error, por favor contacta al administrador del sitio.
        </p>
        <button
          onClick={handleGoHome}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Volver a la Página Principal
        </button>
      </div>
    </div>
  )
}