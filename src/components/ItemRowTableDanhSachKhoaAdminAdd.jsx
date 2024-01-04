import React, { useEffect, useState } from 'react'
import Button from './Button'
import InputSelect from './InputSelect'
import { requestHandler } from '../utils'
import InputText from './InputText'

export default function ItemRowTableDanhSachKhoaAdminAdd({
  setShowAddNew,
  fetchListKhoa,
}) {
  const [listGiaoVien, setListGiaoVien] = useState([])
  const [dataKhoa, setDataKhoa] = useState({
    tenKhoa: '',
    giaoVien: '',
  })

  useEffect(() => {
    getListGiaoVien()
  }, [])

  const [selectedGiaoVien, setSelectedGiaoVien] = useState({})

  const onSelectChange = (name, selectedOption) => {
    setDataKhoa({ ...dataKhoa, [name]: selectedOption })
    setSelectedGiaoVien(selectedOption)
  }

  const getListGiaoVien = () => {
    requestHandler.get('/api/User/GetTeachersList').then(response => {
      const mapTen = response.data
      const listTenGiaoVien = mapTen.map((teacher, index) => ({
        name: teacher.firstName + ' ' + teacher.lastName,
        value: teacher.id,
      }))
      setListGiaoVien(listTenGiaoVien)
    })
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
        fetchListKhoa()
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
