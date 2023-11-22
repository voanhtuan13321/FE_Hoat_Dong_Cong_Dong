import axios from 'axios'
import { localStorages } from './localStorage'
import { errorResponseHandler, successResponseHandler } from './responseHandler'

const requestHandler = axios.create({
  baseURL: 'https://dummyjson.com/',
  timeout: 0,
  // headers: {
  //   'Content-Type': 'application/json',
  //   Accept: 'application/json',
  // },
})

requestHandler.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `Bearer ${localStorages.getToken()}`
    return config
  },
  error => Promise.reject(error),
)

requestHandler.interceptors.response.use(
  successResponseHandler,
  errorResponseHandler,
)

export { requestHandler }
