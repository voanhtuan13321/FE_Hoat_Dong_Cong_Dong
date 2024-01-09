import React, { useEffect, useState } from 'react'
import Button from '../Button'
import {
  callApiGetTeachersList,
  handleError,
  requestHandler,
} from '../../utils'
import { useNavigate } from 'react-router-dom'
import InputSelect from '../Input/InputSelect'
import InputText from '../Input/InputText'

export default function ItemRowTableDanhSachKhoaAdminAdd({
  setShowAddNew,
  refresh,
}) {
  const [listGiaoVien, setListGiaoVien] = useState([])
  const [dataKhoa, setDataKhoa] = useState({
    tenKhoa: '',
    giaoVien: '',
  })
  const navigate = useNavigate()
  useEffect(() => {
    getListGiaoVien()
  }, [])

  const [selectedGiaoVien, setSelectedGiaoVien] = useState({})

  const onSelectChange = (name, selectedOption) => {
    setDataKhoa({ ...dataKhoa, [name]: selectedOption })
    setSelectedGiaoVien(selectedOption)
  }

  const getListGiaoVien = async () => {
    try {
      const data = await callApiGetTeachersList()
      const result = data.map(item => ({
        ...item,
        name: item.firstName + ' ' + item.lastName,
        value: item.id,
      }))
      setListGiaoVien(result)
      setSelectedGiaoVien(result[0])
    } catch (error) {
      console.error(error)
      handleError(error, navigate)
    }
  }

  const onClickLuu = () => {
    const selectedData = {}

    Object.assign(selectedData, {
      majorHeadId: dataKhoa.giaoVien.value,
      name: dataKhoa.tenKhoa,
    })

    requestHandler
      .post('/api/Major/CreateMajor', selectedData)
      .then(res => {
        setShowAddNew(false)
        refresh()
      })
      .catch(er => console.log(er))
  }
  const onChangeInput = event => {
    const { name, value } = event.target
    setDataKhoa({
      ...dataKhoa,
      [name]: value,
    })
  }
  const renderContent = (selectedOption, name) => {
    return (
      <InputSelect
        name={name}
        value={selectedGiaoVien}
        onChange={selected => onSelectChange(name, selected)}
        options={selectedOption}
      />
    )
  }

  return (
    <tr>
      <td className='border border-primary p-1 text-center'></td>
      <td className='border border-primary p-1 text-center'>
        <InputText
          name='tenKhoa'
          value={dataKhoa.tenKhoa}
          onChange={onChangeInput}
        />
      </td>
      <td className='border border-primary p-1'>
        {renderContent(listGiaoVien, 'giaoVien')}
      </td>
      <td className='border border-primary p-1 flex'>
        <div className='w-50% flex justify-center'>
          <Button label='lưu' onClick={onClickLuu} />
        </div>
        <div className='w-50% flex justify-center'>
          <Button
            label='huỷ'
            type='outline'
            onClick={() => setShowAddNew(false)}
          />
        </div>
      </td>
    </tr>
  )
}
