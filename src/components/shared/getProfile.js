import axios from 'axios'
import { toast } from 'react-toastify'

export const getProfile = async (userName) => {
  try {
    const response = await axios.get(
      `https://api.iudi.xyz/api/profile/${userName}`
    )

    return response.data.Users[0]
  } catch (error) {
    toast.error('ERROR:', error)
    console.log(error)
  }
}
