import axios from 'axios'
import { localStorages } from './localStorage'

const requestHandler = axios.create({
  baseURL: 'https://c2f1-115-72-73-122.ngrok-free.app/',
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
