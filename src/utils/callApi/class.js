import { requestHandler } from '../requestHandler'

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

export const callApiGetClassById = async classId => {
  const url = `${baseApiClass}/GetClassById`
  const config = { params: { classId } }
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
