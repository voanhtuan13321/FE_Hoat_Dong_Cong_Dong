import * as XLSX from 'xlsx'
import { localStorages } from './localStorage'
import { requestHandler } from './requestHandler'

export const checkRoles = (roles = [], targetRole) => roles.includes(targetRole)

export const exportFileExcel = (jsonData = [], fileName = '') => {
  if (!Array.isArray(jsonData) || jsonData.length === 0) {
    console.error('Invalid jsonData')
    return
  }

  // Tạo sheet từ dữ liệu JSON
  const sheet = XLSX.utils.json_to_sheet(jsonData)
  // Tạo workbook và thêm sheet vào workbook
  const workBook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workBook, sheet, 'Sheet 1')
  // Xuất file Excel
  XLSX.writeFile(workBook, `${fileName}.xlsx`)
}

export const convertObjectToFormData = async obj => {
  const formData = new FormData()

  // Sử dụng Promise.all để chờ các lệnh append hoàn tất
  await Promise.all(
    Object.entries(obj).map(async ([key, value]) => {
      if (key === 'avatar') {
        formData.append(key, typeof value === 'string' ? '' : value)
      } else if (value instanceof Date) {
        formData.append(key, value.toISOString())
      } else {
        formData.append(key, value !== null ? value : '')
      }
    }),
  )

  return formData
}

export const handleError = (error, navigate) => {
  switch (error.response.status) {
    case 401:
      alert('Authentication')
      localStorages.removeToken()
      navigate('/login')
      break
    default:
      alert('Failed to all api', error.message)
  }
}

export const convertToObjectFormFormik = async data => ({
  id: data.id ?? '',
  classId: data.classId ?? '',
  avatar: `${requestHandler.defaults.baseURL}api/User/GetAvatar?userId=${data.id}`,
  firstName: data.firstName ?? '',
  lastName: data.lastName ?? '',
  dateOfBirth: new Date(data.dateOfBirth),
  placeOfBirth: data.placeOfBirth ?? '',
  gender: data.gender ?? true,
  ethnic: data.ethnic ?? '',
  nationality: data.nationality ?? '',
  identificationCardId: data.identificationCardId ?? '',
  identificationCardIssueDate: new Date(data.identificationCardIssueDate),
  identificationCardIssuePlace: data.identificationCardIssuePlace ?? '',
  religion: data.religion ?? '',
  phone: data.phone ?? '',
  email: data.email ?? '',
  status: data.status ?? 0,
  facebook: data.facebook ?? '',
  city: data.city ?? '',
  district: data.district ?? '',
  ward: data.ward ?? '',
  street: data.street ?? '',
})
