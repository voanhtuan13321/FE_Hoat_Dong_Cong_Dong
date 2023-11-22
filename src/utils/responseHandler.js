import { toast } from 'react-hot-toast'
import { localStorages } from './localStorage'

export const errorResponseHandler = error => {
  toast.dismiss('loading-toast')
  if (!error.response || !error.response.data) {
    if (error.statusCode && error.statusCode === 403) {
      return forceLogoutHandler(error.message)
    }
    if (error.statusCode && error.statusCode === 401) {
      return forceLogoutHandler(error.message)
    }
    return toast.error(error.message)
  }
  const { data } = error.response
  if (data) {
    if (data.statusCode) {
      if (data.statusCode === 401 || data.statusCode === 403) {
        return forceLogoutHandler(data.message)
      }
      return
    }
    if (data.details) {
      const input = data.details[0].path.replace('/', '').toLowerCase()
      const message = data.details[0].message
      toast.error(`${input} ${message}`)
      return
    }
    if (data.message) {
      const message = data.message
      toast.error(message)
      return
    }
  }
}

export const successResponseHandler = response => {
  toast.dismiss('loading-toast')
  const { data } = response
  if (!data) {
    return toast.error('Something went wrong! Please try again later')
  }
  if (data.error) {
    return toast.error('Something went wrong! Please try again later')
  }
  if (!data.success) {
    toast.error(
      data.message ||
        data?.data?.error_message ||
        'Something went wrong! Please try again later',
    )
    if (data.status === 403) {
      return forceLogoutHandler()
    }
    return
  } else {
    if (data.data) {
      if (data.data.error_message) {
        if (data.status === 403) {
          return forceLogoutHandler()
        }
        return toast.error(data.data.error_message)
      }
      if (data.message) {
        toast.success(data.message)
      }
      return data
    }
    if (data.message) {
      toast.success(data.message)
    }
  }
  return data
}

const forceLogoutHandler = (message = '') => {
  if (message) {
    toast.error(message)
  }
  localStorages.removeCurrentUser()
  localStorages.removeToken()
  setTimeout(() => {
    window.location.href = '/'
  }, 3000)
}
