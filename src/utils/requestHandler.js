import axios from 'axios'
import { localStorages } from './localStorage'

const requestHandler = axios.create({
  baseURL:
    'https://8574-2405-4802-705c-2790-5459-a769-ca2a-8fe9.ngrok-free.app',
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
