import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../Button'
import InputSelect from '../Input/InputSelect'
import InputText from '../Input/InputText'

import {
  callApiCreateMajor,
  callApiGetTeachersList,
  handleError,
} from '../../utils'

export default function ItemRowTableDanhSachKhoaAdminAdd({
  setShowAddNew,
  refresh,
}) {
  const [listTeachers, setListTeachers] = useState([])
  const [dataKhoa, setDataKhoa] = useState({ tenKhoa: '', giaoVien: '' })
  const [selectedTeacher, setSelectedTeacher] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    getListTeachers()
  }, [])

  const onSelectChange = (name, selectedOption) => {
    setDataKhoa({ ...dataKhoa, [name]: selectedOption })
    setSelectedTeacher(selectedOption)
  }

  const getListTeachers = async () => {
    try {
      const data = await callApiGetTeachersList()
      const result = data.map(item => ({
        ...item,
        name: item.firstName + ' ' + item.lastName,
        value: item.id,
      }))
      setListTeachers(result)
      setSelectedTeacher(result[0])
    } catch (error) {
      console.error(error)
      handleError(error, navigate)
    }
  }

  const onClickSave = async () => {
    const selectedData = {
      majorHeadId: dataKhoa.giaoVien.value,
      name: dataKhoa.tenKhoa,
    }

    try {
      const data = await callApiCreateMajor(selectedData)
      setShowAddNew(false)
      refresh()
    } catch (error) {
      console.error(error)
      handleError(error, navigate)
    }
  }

  const onChangeInput = event => {
    const { name, value } = event.target
    setDataKhoa({ ...dataKhoa, [name]: value })
  }

  const renderContent = (selectedOption, name) => (
    <InputSelect
      name={name}
      value={selectedTeacher}
      onChange={selected => onSelectChange(name, selected)}
      options={selectedOption}
    />
  )

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
        {renderContent(listTeachers, 'giaoVien')}
      </td>
      <td className='border border-primary p-1 flex'>
        <div className='w-50% flex justify-center'>
          <Button label='lưu' onClick={onClickSave} />
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
