import { requestHandler } from '../requestHandler'

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
