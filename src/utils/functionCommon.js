import * as XLSX from 'xlsx'
import { localStorages } from './localStorage'
import { requestHandler } from './requestHandler'
import { jwtDecode } from 'jwt-decode'
import { COMMUNITY_ACTIVITY_STATUS, KEY_ROLE_TOKEN, ROLES } from './properties'
import Swal from 'sweetalert2'

const condition = {
  DEFAULT: 1,
  SINHVIEN: 2,
  LOPTRUONG: 3,
  GIAOVIEN: 4,
  TRUONGKHOA: 5,
  ADMIN: 6,
}

export const getHighestRole = (roles = []) =>
  roles.reduce((mainIdRole, role) => {
    const temptIdRole = condition[role] || 0
    return Math.max(mainIdRole, temptIdRole)
  }, condition.DEFAULT)

const convertRolesTextToRolesNumber = roles =>
  roles.map(role => condition[role])

export const checkRoles = (roles = [], targetRoles = []) =>
  roles.some(role => targetRoles.includes(condition[role]))

export const checkRoles2 = (roles = [], targetRoles = []) =>
  roles.some(role => targetRoles.includes(role))

export const checkPermissionToAccessThePageAdmin = (roles = [], navigate) => {
  if (!checkRoles(convertRolesTextToRolesNumber(roles), [ROLES.admin])) {
    alert('Bạn không phải là admin nên không được truy cập trang này')
    navigate('/')
  }
}

export const checkPermissionToAccessThePage = (
  roles = [],
  targetRoles = [],
  navigate,
) => {
  if (!checkRoles(roles, targetRoles)) {
    Swal.fire('Bạn không có quyền truy cập trang này', '', 'error')
    navigate('/')
  }
}

export const checkAndHandleLogined = navigate => {
  const token = localStorages.getToken()
  !token && navigate('/login')
}

export const getUserId = () => {
  const token = localStorages.getToken()
  if (!token) return undefined
  const decoded = jwtDecode(token)
  return decoded['UserId']
}
export const getUserRole = () => {
  const token = localStorages.getToken()
  if (!token) return undefined
  const decoded = jwtDecode(token)
  return decoded[KEY_ROLE_TOKEN]
}

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

export const handleError = (error, navigate) => {
  switch (error.response.status) {
    case 401:
      // alert('Authentication')
      localStorages.removeToken()
      navigate('/login')
      break
    case 403:
      // alert('Forbidden')
      localStorages.removeToken()
      navigate('/login')
      break
    default:
      alert(error.message)
  }
}

export const convertToObjectFormFormik = async data => ({
  id: data.id ?? '',
  classId: data.classId ?? '',
  avatar: `${requestHandler.defaults.baseURL}api/User/GetAvatar?userId=${
    data.id
  }&time=${new Date().getTime()}`,
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

export const generateAcademyYearOptions = (length = 8) => {
  const currentYear = new Date().getFullYear()
  return Array.from({ length }, (_, i) => ({
    name: currentYear - i,
    value: currentYear - i,
  }))
}

export const generateYearOptions = year => {
  const currentYear = new Date().getFullYear()
  const length = currentYear - year + 1
  return Array.from({ length }, (_, i) => ({
    name: currentYear - i,
    value: currentYear - i,
  }))
}

export const caculateIndex = (data, inđex) =>
  data.itemPerPage * (data.currentPage - 1) + inđex + 1

export const checkIsCurrentYear = year => year === new Date().getFullYear()

export const determineActivityOutcome = (
  sumScoreClassPresidentConfirmed,
  sumScoreHeadTeacherConfirmed,
  sumScoreMajorHeadConfirmed,
) => {
  const scores = [
    sumScoreClassPresidentConfirmed,
    sumScoreHeadTeacherConfirmed,
    sumScoreMajorHeadConfirmed,
  ]

  const maxScore = Math.max(...scores)

  return {
    score: maxScore < 0 ? 0 : maxScore,
    status:
      maxScore < 0
        ? COMMUNITY_ACTIVITY_STATUS.rejected
        : maxScore === sumScoreClassPresidentConfirmed
          ? COMMUNITY_ACTIVITY_STATUS.classPresidentConfirmed
          : maxScore === sumScoreHeadTeacherConfirmed
            ? COMMUNITY_ACTIVITY_STATUS.headTeacherConfirmed
            : COMMUNITY_ACTIVITY_STATUS.majorHeadConfirmed,
  }
}
