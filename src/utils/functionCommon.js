import { jwtDecode } from 'jwt-decode'
import * as XLSX from 'xlsx'

export const decryptionToken = token => jwtDecode(token)

export const checkRoles = (roles = [], targetRole) => roles.includes(targetRole)

export const exportFileExcel = (jsonData = [], fileName = '') => {
  if (!Array.isArray(jsonData) || jsonData.length === 0) {
    console.error('Invalid jsonData')
    return
  }

  // Tạo sheet từ dữ liệu JSON
  const ws = XLSX.utils.json_to_sheet(jsonData)

  // Tạo workbook và thêm sheet vào workbook
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1')

  // Xuất file Excel
  XLSX.writeFile(wb, `${fileName}.xlsx`)
}
