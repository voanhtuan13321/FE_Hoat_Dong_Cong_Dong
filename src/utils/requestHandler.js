import axios from 'axios'
import { localStorages } from './localStorage'

const requestHandler = axios.create({
  baseURL: 'https://1d3b-2405-4802-705c-2790-fc9a-7c91-1c4b-b457.ngrok-free.app/',
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
