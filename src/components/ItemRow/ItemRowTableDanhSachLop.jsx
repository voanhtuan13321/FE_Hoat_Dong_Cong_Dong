import { useNavigate } from 'react-router-dom'

import InputCheckbox from '../Input/InputCheckbox'

import {
  ROLES,
  callApiUpdateClassPresident,
  checkRoles,
  getUserRole,
  handleError,
} from '../../utils'

export default function ItemRowTableDanhSachLop({
  dt,
  index,
  classPresidentId,
  refresh,
}) {
  const navigate = useNavigate()

  const changeClassPresident = async () => {
    try {
      const dataRequest = {
        classId: dt.classId,
        classPresidentId: dt.id,
      }
      // console.log(dataRequest)
      const data = await callApiUpdateClassPresident(dataRequest)
      // console.log(data)
      refresh()
    } catch (error) {
      console.error(error)
      handleError(error, navigate)
    }
  }

  return (
    <tr className='text-center'>
      <td className='border border-primary text-main p-2'>{index + 1}</td>
      <td className='border border-primary text-main p-2'>{dt.studentId}</td>
      <td className='border border-primary text-main p-2 text-left'>{`${dt.firstName} ${dt.lastName}`}</td>
      <td className='border border-primary text-main p-2 text-left'>
        {dt.phone}
      </td>
      <td className='border border-primary text-main p-2 text-left'>
        {dt.email}
      </td>
      <td className='border border-primary text-main p-2 text-left'>
        {dt.facebook}
      </td>
      <td className='border border-primary text-main p-2 text-left'>
        {`${dt.street || ''} ${dt.ward || ''} ${dt.district || ''} ${
          dt.city || ''
        }`}
      </td>
      {checkRoles(getUserRole(), [ROLES.giaoVien, ROLES.truongKhoa]) && (
        <td className='border border-primary text-main p-2'>
          <InputCheckbox
            value={classPresidentId === dt.id}
            onChange={changeClassPresident}
          />
        </td>
      )}
      <td className='border border-primary text-main p-2 underline text-primary cursor-pointer'>
        <span onClick={() => navigate(`/tu-danh-gia?studentId=${dt.id}`)}>
          Xem chi tiết
        </span>
      </td>
    </tr>
  )
}
