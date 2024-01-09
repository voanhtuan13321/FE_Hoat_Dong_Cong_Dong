import { requestHandler } from '../requestHandler'

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
