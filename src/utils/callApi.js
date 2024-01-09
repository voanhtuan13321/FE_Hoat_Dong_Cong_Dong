import { requestHandler } from './requestHandler'

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

// class
const baseApiClass = 'api/Class'

export const callApiGetClassesPaginationList = async (
  ItemPerPage,
  Page,
  AcademyYear,
  MajorId,
) => {
  const url = `${baseApiClass}/GetClassesPaginationList`
  const config = {
    params: {
      ItemPerPage,
      Page,
      AcademyYear,
      MajorId,
      time: new Date().getTime(),
    },
  }
  const response = await requestHandler.get(url, config)
  return await response.data
}

export const callApiGetClassesList = async () => {
  const url = `${baseApiClass}/GetClassesList`
  const config = { params: { time: new Date().getTime() } }
  const response = await requestHandler.get(url, config)
  return await response.data
}

export const callApiGetClassesByTeacherId = async teacherId => {
  const url = `${baseApiClass}/GetClassesByTeacherId`
  const config = { params: { teacherId, time: new Date().getTime() } }
  const response = await requestHandler.get(url, config)
  return await response.data
}

export const callApiCreateClass = async data => {
  const url = `${baseApiClass}/CreateClass`
  const response = await requestHandler.post(url, data)
  return await response.data
}

export const callApiUpdateClass = async data => {
  const url = `${baseApiClass}/UpdateClass`
  const response = await requestHandler.put(url, data)
  return await response.data
}

export const callApiUpdateClassPresident = async data => {
  const url = `${baseApiClass}/UpdateClassPresident`
  const response = await requestHandler.patch(url, data)
  return await response.data
}

export const callApiDeleteClass = async classId => {
  const url = `${baseApiClass}/DeleteClass`
  const config = { params: { classId } }
  const response = await requestHandler.delete(url, config)
  return await response.data
}

// major
const baseApiMajor = 'api/Major'

export const callApiGetMajorsList = async () => {
  const url = `${baseApiMajor}/GetMajorsList`
  const config = { params: { time: new Date().getTime() } }
  const response = await requestHandler.get(url, config)
  return await response.data
}

export const callApiGetMajorsPaginationList = async(ItemPerPage, Page) =>{
  const url = `api/Major/GetMajorsPaginationList`
  const config = { params: { ItemPerPage, Page }}
  const response = await requestHandler.get(url,config)
  return await response.data
}

export const callApiUpdateMajor = async dataEdit =>{
  const url = `api/Major/UpdateMajor`
  const repsonse = await requestHandler.put(url,dataEdit)
  return await repsonse.data
}

export const callApiDeleteMajor = async majorId =>{
  const url = `api/Major/DeleteMajor`
  const config = {params: {majorId}}
  const repsonse = await requestHandler.delete(url,config)
  return await repsonse.data
}

// user
const baseApiUser = 'api/User'

export const callApiGetUserByUserId = async userId => {
  const url = `${baseApiUser}/GetUserByUserId`
  const config = { params: { userId, time: new Date().getTime() } }
  const response = await requestHandler.get(url, config)
  return await response.data
}

export const callApiGetStudentsListByClassId = async classId => {
  const url = `${baseApiUser}/GetStudentsListByClassId`
  const config = { params: { classId, time: new Date().getTime() } }
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

export const callApiGetTeachersList = async () => {
  const url = `${baseApiUser}/GetTeachersList`
  const config = { params: { time: new Date().getTime() } }
  const response = await requestHandler.get(url, config)
  return await response.data
}

export const callApiGetTeachersPaginationList = async (ItemPerPage,Page) => {
  const url = `api/User/GetTeachersPaginationList?time=${new Date().getTime()}`
  const config = {params: {ItemPerPage , Page}}
  const response = await requestHandler.get(url,config)
  return await response.data
}
// Announcement
const baseApiAnnouncement = 'api/Announcement'

export const callApiGetAnnouncementsPaginationList = async (
  ItemPerPage,
  Page,
) => {
  const url = `${baseApiAnnouncement}/GetAnnouncementsPaginationList`
  const config = { params: { ItemPerPage, Page, time: new Date().getTime() } }
  const response = await requestHandler.get(url, config)
  return await response.data
}

export const callApiCreateAnnouncement = async data => {
  const url = `${baseApiAnnouncement}/CreateAnnouncement`
  const response = await requestHandler.post(url, data)
  return await response.data
}

export const callApiUpdateAnnouncement = async data => {
  const url = `${baseApiAnnouncement}/UpdateAnnouncement`
  const response = await requestHandler.put(url, data)
  return await response.data
}

export const callApiDeleteAnnouncement = async announcementId => {
  const url = `${baseApiAnnouncement}/DeleteAnnouncement`
  const config = { params: { announcementId } }
  const response = await requestHandler.delete(url, config)
  return await response.data
}

// CommunityActivityType
const baseApiCommunityActivityType = 'api/CommunityActivityType'

export const callApiGetCommunityActivityTypesList = async () => {
  const url = `${baseApiCommunityActivityType}/GetCommunityActivityTypesList`
  const config = { params: { time: new Date().getTime() } }
  const response = await requestHandler.get(url, config)
  return await response.data
}

export const callApiGetCommunityActivityTypesPaginationList = async (
  ItemPerPage,
  Page,
) => {
  const url = `${baseApiCommunityActivityType}/GetCommunityActivityTypesPaginationList`
  const config = { params: { ItemPerPage, Page, time: new Date().getTime() } }
  const response = await requestHandler.get(url, config)
  return await response.data
}

export const callApiCreateCommunityActivityType = async data => {
  const url = `${baseApiCommunityActivityType}/CreateCommunityActivityType`
  const response = await requestHandler.post(url, data)
  return await response.data
}

export const callApiUpdateCommunityActivityType = async data => {
  const url = `${baseApiCommunityActivityType}/UpdateAnnouncement`
  const response = await requestHandler.put(url, data)
  return await response.data
}

export const callApiDeleteCommunityActivityType =
  async communityActivityTypeId => {
    const url = `${baseApiCommunityActivityType}/DeleteCommunityActivityType`
    const config = { params: { communityActivityTypeId } }
    const response = await requestHandler.delete(url, config)
    return await response.data
  }

// CommunityActivity
const baseApiCommunityActivity = 'api/CommunityActivity'

export const callApiGetUserCommunityActivities = async (userId, year) => {
  const url = `${baseApiCommunityActivity}/GetUserCommunityActivities`
  const config = { params: { userId, year, time: new Date().getTime() } }
  const response = await requestHandler.get(url, config)
  return await response.data
}

export const callApiCreateCommunityActivity = async data => {
  const url = `${baseApiCommunityActivity}/CreateCommunityActivity`
  const response = await requestHandler.post(url, data)
  return await response.data
}

export const callApiUpdateCommunityActivity = async data => {
  const url = `${baseApiCommunityActivity}/UpdateCommunityActivity`
  const response = await requestHandler.put(url, data)
  return await response.data
}

export const callApiDeleteCommunityActivity = async caId => {
  const url = `${baseApiCommunityActivity}/DeleteCommunityActivity`
  const config = { params: { caId } }
  const response = await requestHandler.delete(url, config)
  return await response.data
}
