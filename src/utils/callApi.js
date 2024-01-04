import { requestHandler } from './requestHandler'

// auth
export const callApiLogin = async values => {
  const response = await requestHandler.post('/api/Auth/Login', values)
  return await response.data
}

// class
export const callApiGetClassesPaginationList = async (
  ItemPerPage,
  Page,
  AcademyYear,
  MajorName,
) => {
  const url = `api/Class/GetClassesPaginationList`
  const config = { params: { ItemPerPage, Page, AcademyYear, MajorName } }
  const response = await requestHandler.get(url, config)
  return await response.data
}

export const callApiCreateClass = async savedData => {
  const url = `api/Class/CreateClass`
  const response = await requestHandler.post(url, savedData)
  return await response.data
}

export const callApiUpdateClass = async dataRequest => {
  const url = `api/Class/UpdateClass`
  const response = await requestHandler.put(url, dataRequest)
  return await response.data
}

export const callApiDeleteClass = async classId => {
  const url = `api/Class/DeleteClass`
  const config = { params: { classId } }
  const response = await requestHandler.delete(url, config)
  return await response.data
}

// major
export const callApiGetMajorsList = async () => {
  const url = `api/Major/GetMajorsList`
  const response = await requestHandler.get(url)
  return await response.data
}

// user
export const callApiGetUserByUserId = async userId => {
  const url = 'api/User/GetUserByUserId'
  const config = { params: { userId } }
  const response = await requestHandler.get(url, config)
  return await response.data
}

export const callApiUpdateUser = async formData => {
  const url = 'api/User/UpdateUser'
  const config = {
    headers: { 'Content-Type': 'application/form-data' },
  }
  const response = await requestHandler.put(url, formData, config)
  return await response.data
}

export const callApiGetTeachersList = async () => {
  const url = `api/User/GetTeachersList`
  const response = await requestHandler.get(url)
  return await response.data
}

// Announcement
export const callApiGetAnnouncementsPaginationList = async (
  ItemPerPage,
  Page,
) => {
  const url = `api/Announcement/GetAnnouncementsPaginationList`
  const config = { params: { ItemPerPage, Page } }
  const response = await requestHandler.get(url, config)
  return await response.data
}

export const callApiCreateAnnouncement = async dataThongBao => {
  const url = `api/Announcement/CreateAnnouncement`
  const response = await requestHandler.post(url, dataThongBao)
  return await response.data
}

export const callApiUpdateAnnouncement = async dataEdit => {
  const url = `api/Announcement/UpdateAnnouncement`
  const repsonse = await requestHandler.put(url, dataEdit)
  return await repsonse.data
}

export const callApiDeleteAnnouncement = async announcementId => {
  const url = `api/Announcement/DeleteAnnouncement`
  const config = { params: { announcementId } }
  const repsonse = await requestHandler.delete(url, config)
  return await repsonse.data
}
