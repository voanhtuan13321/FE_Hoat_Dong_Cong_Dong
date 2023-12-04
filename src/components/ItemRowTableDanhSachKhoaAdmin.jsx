import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import Button from './Button'
import InputSelect from './InputSelect'

const dataTable = {
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

export default function ItemRowTableDanhSachKhoaAdmin({ stt, data }) {
  const [isShowEdit, setShowEdit] = useState(false)
  const [listDanhSachKhoa, setListDanhSachKhoa] = useState([])
  const [selectedTen, setSelectedTen] = useState({})
  const [selectedKhoa, setSelectedKhoa] = useState({})
  const [rowData, setRowData] = useState({
    khoa: data.khoa,
    ten: data.ten,
  })

  const onClickEdit = () => {
    setShowEdit(!isShowEdit)
  }

  useEffect(() => {
    fetchListDanhSachKhoa()
  }, [])

  const fetchListDanhSachKhoa = () => {
    const khoaData = dataTable.khoa
    const tenData = dataTable.ten

    setListDanhSachKhoa({
      khoa: khoaData,
      ten: tenData,
    })

    setSelectedTen(getDanhSachTen(data.ten, tenData))
    setSelectedKhoa(getDanhSachKhoa(data.khoa, khoaData))
    setRowData({
      ...rowData,
      khoa: getDanhSachKhoa(data.khoa, khoaData).name,
      ten: getDanhSachTen(data.ten, tenData).name,
    })
  }

  const getDanhSachKhoa = (value, khoaData) => {
    return !value
      ? khoaData[0]
      : khoaData.find(item => item.value === value) || khoaData[0]
  }

  const getDanhSachTen = (value, tenData) => {
    return !value
      ? tenData[0]
      : tenData.find(item => item.value === value) || tenData[0]
  }

  const onSelectOptionTen = selected => {
    setSelectedTen(selected)
    setRowData({ ...rowData, ten: selected.name })
  }

  const onSelectOptionKhoa = selected => {
    setSelectedKhoa(selected)
    setRowData({ ...rowData, khoa: selected.name })
  }

  const onClickLuu = () => {
    console.log(rowData)
  }

  const handleDeleteButtonClick = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
        })
      }
    })
  }

  const renderContent = (value, name) =>
    isShowEdit ? (
      name === 'ten' ? (
        <InputSelect
          name={name}
          options={listDanhSachKhoa.ten}
          value={selectedTen}
          onChange={onSelectOptionTen}
        />
      ) : (
        <InputSelect
          name={name}
          options={listDanhSachKhoa.khoa}
          value={selectedKhoa}
          onChange={onSelectOptionKhoa}
        />
      )
    ) : (
      value
    )

  return (
    <tr className='text-main'>
      <td className='border border-primary p-1 text-center'>{stt + 1}</td>
      <td className='border border-primary p-1 text-center'>
        {renderContent(rowData.khoa, 'khoa')}
      </td>
      <td className='border border-primary p-1 text-center'>
        {renderContent(rowData.ten, 'ten')}
      </td>
      <td className='border border-primary p-1 flex'>
        <div className='w-1/2 flex justify-center'>
          <Button
            label={isShowEdit ? 'lưu' : 'sửa'}
            type={isShowEdit ? '' : 'edit'}
            onClick={isShowEdit ? onClickLuu : onClickEdit}
          />
        </div>
        <div className='w-1/2 flex justify-center'>
          <Button
            label={isShowEdit ? 'hủy' : 'Xóa'}
            type={isShowEdit ? 'outline' : 'delete'}
            onClick={isShowEdit ? onClickEdit : handleDeleteButtonClick}
          />
        </div>
      </td>
    </tr>
  )
}
