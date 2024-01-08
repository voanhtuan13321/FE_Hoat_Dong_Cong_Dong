import { requestHandler } from './requestHandler'

// auth
export const callApiLogin = async data => {
  const url = '/api/Auth/Login'
  const response = await requestHandler.post(url, data)
  return await response.data
}

export const callApiChangePassword = async data => {
  const url = '/api/Auth/ChangePassword'
  const repsonse = await requestHandler.post(url, data)
  return await repsonse.data
}

// class
export const callApiGetClassesPaginationList = async (
  ItemPerPage,
  Page,
  AcademyYear,
  MajorId,
) => {
  const url = `api/Class/GetClassesPaginationList?time=${new Date().getTime()}`
  const config = { params: { ItemPerPage, Page, AcademyYear, MajorId } }
  const response = await requestHandler.get(url, config)
  return await response.data
}

export const callApiGetClassesList = async () => {
  const url = `api/Class/GetClassesList?time=${new Date().getTime()}`
  const response = await requestHandler.get(url)
  return await response.data
}

export const callApiGetClassesByTeacherId = async teacherId => {
  const url = `api/Class/GetClassesByTeacherId?time=${new Date().getTime()}`
  const config = { params: { teacherId } }
  const response = await requestHandler.get(url, config)
  return await response.data
}

export const callApiCreateClass = async data => {
  const url = `api/Class/CreateClass`
  const response = await requestHandler.post(url, data)
  return await response.data
}

export const callApiUpdateClass = async data => {
  const url = `api/Class/UpdateClass`
  const response = await requestHandler.put(url, data)
  return await response.data
}

export const callApiUpdateClassPresident = async data => {
  const url = `api/Class/UpdateClassPresident`
  const repsonse = await requestHandler.patch(url, data)
  return await repsonse.data
}

export const callApiDeleteClass = async classId => {
  const url = `api/Class/DeleteClass`
  const config = { params: { classId } }
  const response = await requestHandler.delete(url, config)
  return await response.data
}

// major
export const callApiGetMajorsList = async () => {
  const url = `api/Major/GetMajorsList?time=${new Date().getTime()}`
  const response = await requestHandler.get(url)
  return await response.data
}

// user
export const callApiGetUserByUserId = async userId => {
  const url = `api/User/GetUserByUserId?time=${new Date().getTime()}`
  const config = { params: { userId } }
  const response = await requestHandler.get(url, config)
  return await response.data
}

export const callApiGetStudentsListByClassId = async classId => {
  const url = `api/User/GetStudentsListByClassId?time=${new Date().getTime()}`
  const config = { params: { classId } }
  const response = await requestHandler.get(url, config)
  return await response.data
}

export const callApiCreateUser = async data => {
  const url = 'api/User/CreateUser'
  const repsonse = await requestHandler.post(url, data)
  return await repsonse.data
}

export const callApiUpdateUser = async formData => {
  const url = 'api/User/UpdateUser'
  const config = {
    headers: { 'Content-Type': 'application/form-data' },
  }
  const response = await requestHandler.put(url, formData, config)
  return await response.data
}

export const callApiUpdateUserStatus = async data => {
  const url = 'api/User/UpdateUserStatus'
  const repsonse = await requestHandler.patch(url, data)
  return await repsonse.data
}

export const callApiGetTeachersList = async () => {
  const url = `api/User/GetTeachersList?time=${new Date().getTime()}`
  const response = await requestHandler.get(url)
  return await response.data
}

// Announcement
export const callApiGetAnnouncementsPaginationList = async (
  ItemPerPage,
  Page,
) => {
  const url = `api/Announcement/GetAnnouncementsPaginationList?time=${new Date().getTime()}`
  const config = { params: { ItemPerPage, Page } }
  const response = await requestHandler.get(url, config)
  return await response.data
}

export const callApiCreateAnnouncement = async data => {
  const url = `api/Announcement/CreateAnnouncement`
  const response = await requestHandler.post(url, data)
  return await response.data
}

export const callApiUpdateAnnouncement = async data => {
  const url = `api/Announcement/UpdateAnnouncement`
  const repsonse = await requestHandler.put(url, data)
  return await repsonse.data
}

export const callApiDeleteAnnouncement = async announcementId => {
  const url = `api/Announcement/DeleteAnnouncement`
  const config = { params: { announcementId } }
  const repsonse = await requestHandler.delete(url, config)
  return await repsonse.data
}
