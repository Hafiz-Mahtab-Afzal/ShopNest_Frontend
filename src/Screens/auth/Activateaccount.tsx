import { errortoast, successtoast } from '../../toastify/toastify.js'
// import Loader from '../../layouts/Loader.jsx'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import apis from '../../config/apis.jsx'
import axios from 'axios'

interface AuthResponse {
  error: string;
  success: string;
}

const Activateaccount = () => {
  const { token } = useParams() as { token: string }
  const navigate = useNavigate()
  // const [loader, setloader] = useState(false)

  const createaccount = async () => {
    try {
      // setloader(true)
      const { data } = await axios.post<AuthResponse>(`${apis.auth}/signup`, { token })
      const { error, success } = data

      if (error) {
        setTimeout(() => {
          navigate('/Signup')
        }, 2000)
        errortoast(error)
      }
      if (success) {
        setTimeout(() => {
          navigate('/login')
        }, 2000)
        successtoast(success)
      }
    } catch (err: unknown) {
      console.log((err as Error).message)
    }
  }

  useEffect(() => {
    createaccount()
  }, [])

  return <div className='flex items-center justify-center h-screen'>Loading...</div>
}

export default Activateaccount