import axios from 'axios'
import { localStorages } from './localStorage'
import { setLoading } from '../redux/storeSlice'
import { store } from '../redux/store'

const requestHandler = axios.create({
  baseURL:
    'https://0ec9-2405-4802-6ea4-6950-1c8c-f1f6-e513-c990.ngrok-free.app/',
  timeout: 10000,
  headers: { 'ngrok-skip-browser-warning': 'true' },
})

const handleError = error => {
  store.dispatch(setLoading(false))
  return Promise.reject(error)
}

requestHandler.interceptors.request.use(config => {
  config.headers['Authorization'] = `Bearer ${localStorages.getToken()}`
  store.dispatch(setLoading(true))
  return config
}, handleError)

requestHandler.interceptors.response.use(config => {
  store.dispatch(setLoading(false))
  return config
}, handleError)

export { requestHandler }
