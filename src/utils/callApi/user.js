import { requestHandler } from '../requestHandler'

// user
const baseApiUser = 'api/User'

export const callApiGetUserByUserId = async userId => {
  const url = `${baseApiUser}/GetUserByUserId`
  const config = { params: { userId, time: new Date().getTime() } }
  const response = await requestHandler.get(url, config)
  return await response.data
}

export const callApiGetStudentsListByClassId = async (classId, year) => {
  const url = `${baseApiUser}/GetStudentsListByClassId`
  const config = { params: { classId, year, time: new Date().getTime() } }
  const response = await requestHandler.get(url, config)
  return await response.data
}

export const callApiCreateUser = async data => {
  const url = `${baseApiUser}/CreateUser`
  const response = await requestHandler.post(url, data)
  return await response.data
}

export const callApiUpdateUser = async formData => {
  const url = `${baseApiUser}/UpdateUser`
  const config = {
    headers: { 'Content-Type': 'application/form-data' },
  }
  const response = await requestHandler.put(url, formData, config)
  return await response.data
}

export const callApiUpdateUserStatus = async data => {
  const url = `${baseApiUser}/UpdateUserStatus`
  const response = await requestHandler.patch(url, data)
  return await response.data
}

export const callApiDeleteUser = async userId => {
  const url = `${baseApiUser}/DeleteUser`
  const config = { params: { userId } }
  const response = await requestHandler.delete(url, config)
  return await response.data
}

export const callApiGetTeachersList = async () => {
  const url = `${baseApiUser}/GetTeachersList`
  const config = { params: { time: new Date().getTime() } }
  const response = await requestHandler.get(url, config)
  return await response.data
}

export const callApiGetTeachersPaginationList = async (ItemPerPage, Page) => {
  const url = `api/User/GetTeachersPaginationList?time=${new Date().getTime()}`
  const config = { params: { ItemPerPage, Page } }
  const response = await requestHandler.get(url, config)
  return await response.data
}
