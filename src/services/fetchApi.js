import requestHandler from '../utils/requestHandler'

const pathApis = {
  sinhVien: '/students',
  giaoVien: '/teachers',
}

export const getStudents = () => {
  return requestHandler.get(pathApis.sinhVien)
}

export const getStudentById = idStudent => {
  return requestHandler.get(`${pathApis.sinhVien}/${idStudent}`)
}

export const getTeachers = () => {
  return requestHandler.get(pathApis.teachers)
}
