import { Outlet, useNavigate } from "react-router-dom"
import Sidebar from "./Sidebar"
import { useEffect, useState } from "react"
import axios from "axios"
import apis from "../../config/apis"

const Dashboard = () => {
  const [ok, setOk] = useState(false)
  const navigate = useNavigate()
  
  useEffect(() => {
    const authCheck = async () => {
      try {
        const response = await axios.get(`${apis.prod}/admin`, {
          withCredentials: true
        })
        
        // Backend ka response check karo
        console.log("API Response:", response.data)
        
        // ✅ Yahan S bada 'Success' check karo (jo aapne bataya)
        if (response.data.Success === "Successfull") {
          setOk(true) 
        } else {
          setOk(false)
          navigate("/")
        }
      } catch {
        setOk(false)
        navigate("/")
      }
    }

    authCheck()
  }, [navigate])

  // Jab tak ok true nahi hota, ye spinner dikhega
  if (!ok) {
    return (
      <div className="h-screen flex items-center justify-center text-xl font-bold">
        Checking Authentication...
      </div>
    )
  }

  // ✅ Jab ok true hoga, ye return execute hoga
  return (
    <div className='flex'>
        <div className="w-0 lg:w-[23%] sticky top-0 z-50 lg:z-auto h-screen overflow-y-auto">
         <Sidebar />
        </div>
        <div className="w-full min-w-0 lg:w-[77%]">
         {/* Agar Outlet khali hai, toh yahan kuch text daal kar check karo ke ye part load ho raha hai ya nahi */}
         <Outlet />   
        </div>
    </div>
  )
}

export default Dashboard