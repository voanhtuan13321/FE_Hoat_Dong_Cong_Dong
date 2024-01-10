import { requestHandler } from '../requestHandler'

const baseApiCommunityActivity = 'api/CommunityActivity'

export const callApiGetUserCommunityActivities = async (userId, year) => {
  const url = `${baseApiCommunityActivity}/GetUserCommunityActivities`
  const config = { params: { userId, year, time: new Date().getTime() } }
  const response = await requestHandler.get(url, config)
  return await response.data
}

export const callApiGetUserCommunityActivitiesSumScoreHeadTeachersConfirmed =
  async (majorId, year) => {
    const url = `${baseApiCommunityActivity}/GetUserCommunityActivitiesSumScoreHeadTeachersConfirmed`
    const config = { params: { majorId, year, time: new Date().getTime() } }
    const response = await requestHandler.get(url, config)
    return await response.data
  }

export const callApiGetUserCommunityActivitiesSumScoreMajorHeadsConfimed =
  async year => {
    const url = `${baseApiCommunityActivity}/GetUserCommunityActivitiesSumScoreMajorHeadsConfimed`
    const config = { params: { year, time: new Date().getTime() } }
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

export const callApiGetUserCommunityActivitiesNoneYear = async userId => {
  const url = `${baseApiCommunityActivity}/GetUserCommunityActivities`
  const config = { params: { userId, time: new Date().getTime() } }
  const response = await requestHandler.get(url, config)
  return await response.data
}

export const callApiApproveUserCommunityActivitiesByHeadTeacher = async (
  userId,
  year,
) => {
  const url = `${baseApiCommunityActivity}/ApproveUserCommunityActivitiesByHeadTeacher`
  const config = { params: { userId, year } }
  const response = await requestHandler.patch(url, config)
  return await response.data
}

export const callApiApproveClassCommunityActivitiesByHeadTeacher = async (
  classId,
  year,
) => {
  const url = `${baseApiCommunityActivity}/ApproveClassCommunityActivitiesByHeadTeacher`
  const config = { params: { classId, year } }
  const response = await requestHandler.patch(url, config)
  return await response.data
}

export const callApiApproveMajorCommunityActivitiesByMajorHead = async (
  majorId,
  year,
) => {
  const url = `${baseApiCommunityActivity}/ApproveMajorCommunityActivitiesByMajorHead?majorId=${majorId}&year=${year}`
  const response = await requestHandler.patch(url)
  return await response.data
}
