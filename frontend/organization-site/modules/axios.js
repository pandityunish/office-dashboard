import axios from 'axios'
import { redirect } from 'next/router'
//https://api.epass.com.np
const axiosInstance = axios.create({
  baseURL: 'https://admin.epass.com.np',
  headers: {
    'Content-Type': 'application/json'
  }
})

let isRefreshing = false

const refreshAccessToken = async () => {
  try {
    const response = await axiosInstance.post('/user/token-refresh/', {
      refresh: localStorage.getItem('refresh')
    })

    localStorage.setItem('access', response.data.access)

    const originalRequest = response.config
    originalRequest.headers.Authorization = `Bearer ${response.data.access}`
    return axiosInstance(originalRequest)
  } catch (error) {
    throw error
  }
}

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.code === 'token_not_valid'
    ) {
      if (!isRefreshing) {
        isRefreshing = true

        try {
          const response = await refreshAccessToken()
          isRefreshing = false
          return response
        } catch (refreshError) {
          redirect('/login')
          isRefreshing = false
          return Promise.reject(refreshError)
        }
      } else {
        return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
