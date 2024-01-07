import React, { useState } from 'react'
import Button from '../Button'
import InputSelect from '../Input/InputSelect'

const initState = {
  khoa: [
    { name: 'Khoa A', value: 1 },
    { name: 'Khoa B', value: 2 },
    { name: 'Khoa C', value: 3 },
    { name: 'Khoa D', value: 4 },
  ],
  ten: [
    { name: 'Nguyễn Văn A', value: 1 },
    { name: 'Nguyễn Văn B', value: 2 },
    { name: 'Nguyễn Văn C', value: 3 },
    { name: 'Nguyễn Văn D', value: 4 },
  ],
}

export default function ItemRowTableDanhSachKhoaAdminAdd({ setShowAddNew }) {
  const [dataKhoa, setDataKhoa] = useState({
    khoa: initState.khoa[0],
    ten: initState.ten[0],
  })

  const onSelectChange = (name, selectedOption) => {
    setDataKhoa({ ...dataKhoa, [name]: selectedOption })
  }

  const onClickLuu = () => {
    console.log(dataKhoa)
  }

  const renderContent = (selectedOption, name) => {
    return (
      <InputSelect
        name={name}
        value={selectedOption}
        onChange={selected => onSelectChange(name, selected)}
        options={initState[name]}
      />
    )
  }

  return (
    <tr>
      <td className='border border-primary p-1 text-center'></td>
      <td className='border border-primary p-1 text-center'>
        {renderContent(dataKhoa.khoa, 'khoa')}
      </td>
      <td className='border border-primary p-1'>
        {renderContent(dataKhoa.ten, 'ten')}
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
