import axios from 'axios'
import { localStorages } from './localStorage'

const requestHandler = axios.create({
  baseURL: 'https://0ec9-2405-4802-6ea4-6950-1c8c-f1f6-e513-c990.ngrok-free.app/',
  timeout: 10000,
  headers: { 'ngrok-skip-browser-warning': 'true' },
})

requestHandler.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `Bearer ${localStorages.getToken()}`
    return config
  },
  error => Promise.reject(error),
)

export { requestHandler }
