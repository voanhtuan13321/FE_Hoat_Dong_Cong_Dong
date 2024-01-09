import { requestHandler } from '../requestHandler'

// auth
const baseApiAuth = '/api/Auth'

export const callApiLogin = async data => {
  const url = `${baseApiAuth}/Login`
  const response = await requestHandler.post(url, data)
  return await response.data
}

export const callApiChangePassword = async data => {
  const url = `${baseApiAuth}/ChangePassword`
  const response = await requestHandler.post(url, data)
  return await response.data
}
