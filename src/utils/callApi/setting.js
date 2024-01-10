import { requestHandler } from '../requestHandler'

// Setting
const baseApiSetting = 'api/Setting'

export const callApiGetSettings = async name => {
  const url = `${baseApiSetting}/GetSettingByName?time=${new Date().getTime()}`
  const config = { params: { name, time: new Date().getTime() } }
  const response = await requestHandler.get(url, config)
  return await response.data
}

export const callApiUpdateSettingStatus = async (name, status) => {
  const url = `${baseApiSetting}/UpdateSettingStatus?name=${name}&status=${status}`
  const response = await requestHandler.patch(url)
  return await response.data
}
