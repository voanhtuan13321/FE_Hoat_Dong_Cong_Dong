import { jwtDecode } from 'jwt-decode'

export const decryptionToken = token => jwtDecode(token)

export const checkRoles = (roles = [], targetRole) => roles.includes(targetRole)
