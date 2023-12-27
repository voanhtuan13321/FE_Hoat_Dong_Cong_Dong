import axios from 'axios'
import { localStorages } from './localStorage'

const requestHandler = axios.create({
  baseURL: 'https://2daa-2401-d800-1b0-7b73-d835-53cc-52a1-bdb7.ngrok-free.app//',
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
