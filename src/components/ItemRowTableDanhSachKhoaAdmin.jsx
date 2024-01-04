import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import Button from './Button'
import InputSelect from './InputSelect'
import InputText from './InputText'
import { requestHandler } from '../utils'


export default function ItemRowTableDanhSachKhoaAdmin({ stt, data }) {
  const [isShowEdit, setShowEdit] = useState(false)
  const [listGiaoVien, setListGiaoVien] = useState([{}])
  const [selectedGiaoVien, setSelectedGiaoVien] = useState({})
  const [rowData, setRowData] = useState({
    tenKhoa: data.name,
    giaoVien: data.majorHeadFullName,
  })
  const [dataKhoa, setDataKhoa] = useState({
    tenKhoa: data.name,
    giaoVien: data.majorHeadFullName,
  })

  const onClickEdit = () => {
    setShowEdit(!isShowEdit)
   
  }

  useEffect(() => {
    fetchListDanhSachKhoa()
  }, [])

  const fetchListDanhSachKhoa = () => {
   
    requestHandler.get('/api/User/GetTeachersList').then(response => {
      const mapTen = response.data
      const listTenGiaoVien = mapTen.map((teacher, index) => ({
        name: teacher.firstName + ' ' + teacher.lastName,
        value: teacher.id,
      }))
      setListGiaoVien(listTenGiaoVien)
      setSelectedGiaoVien( getDanhSachGiaoVien(data.majorHeadId,listTenGiaoVien))
    })

    // setRowData({
    //   ...rowData,
    //   khoa: getDanhSachKhoa(data.khoa, khoaData).name,
    //   ten: getDanhSachTen(data.ten, tenData).name,
    // })
  }
  const onSelectChange = (name, selectedOption) => {
    setDataKhoa({ ...dataKhoa, [name]: selectedOption })
    setSelectedGiaoVien(selectedOption)
  }

  const getDanhSachGiaoVien = (value, tenData) => {
    return !value
      ? tenData[0]
      : tenData.find(item => item.value === value) || tenData[0]
  }
  const onChangeInput = event => {
    const { name, value } = event.target
    setDataKhoa({
      ...dataKhoa,
      [name]: value,
    })
  }
  const onClickLuu = () => {
    console.log(dataKhoa);
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
      name === 'tenKhoa' ? (
      <InputText name={name} value={dataKhoa.tenKhoa}
      onChange={onChangeInput}/>
      ) : (
        <InputSelect
        name={name}
        value={selectedGiaoVien}
        onChange={selected => onSelectChange(name, selected)}
        options={listGiaoVien}
        />
      )
    ) : (
      value
    )

  return (
    <tr className='text-main'>
      <td className='border border-primary p-1 text-center'>{stt + 1}</td>
      <td className='border border-primary p-1 text-center'>
      {renderContent(rowData.tenKhoa,'tenKhoa')}
      </td>
      <td className='border border-primary p-1 text-center'>
        {renderContent(rowData.giaoVien, 'giaoVien')}
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
