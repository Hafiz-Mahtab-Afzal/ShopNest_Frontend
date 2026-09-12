// route/PublicRoute.tsx

import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"

const API = import.meta.env.VITE_API_URL;

const PublicRoute = () => {
  const [status, setStatus] = useState<boolean | null>(null)

  useEffect(() => {
    fetch(`${API}/api/v1/users/verify`, { credentials: "include" })
      .then((res) => setStatus(res.ok))
      .catch(() => setStatus(false))
  }, [])

  if (status === null) return <div className="min-h-screen flex items-center justify-center text-gray-400">Loading...</div>

  return status ? <Navigate to="/" replace /> : <Outlet />
}

export default PublicRoute