import axios from 'axios'
import { localStorages } from './localStorage'

const requestHandler = axios.create({
  baseURL:
    'https://e139-2401-d800-7130-1fdd-f19c-f42c-283a-d00b.ngrok-free.app',
  timeout: 0,
  headers: {
    // 'Content-Type': 'application/json',
    // Accept: 'application/json',
    'ngrok-skip-browser-warning': 'true',
  },
})

requestHandler.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `Bearer ${localStorages.getToken()}`
    return config
  },
  error => Promise.reject(error),
)

export { requestHandler }
