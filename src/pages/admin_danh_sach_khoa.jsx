import React, { useState } from 'react'
import Swal from 'sweetalert2'
import Title from '../components/Title'
import Table from '../components/Table/index'
import Button from '../components/Button'
import InputText from '../components/InputText'

const initialDataTable = {
  header: [
    { className: 'w-1/6', title: 'stt' },
    { className: 'w-2/6', title: 'Tên khoa' },
    { className: 'w-2/6', title: 'Trưởng khoa' },
    { className: 'w-1/6', title: '' },
  ],
  value: [
    { stt: 1, khoa: 'K.Cơ khí', ten: 'Nguyễn Văn A' },
    { stt: 2, khoa: 'K.Cơ khí', ten: 'Nguyễn Văn B' },
    { stt: 3, khoa: 'K.Cơ khí', ten: 'Nguyễn Văn C' },
    { stt: 4, khoa: 'K.Cơ khí', ten: 'Nguyễn Văn D' },
  ],
}

export default function AdminDanhSachKhoa() {
  const [dataTable, setDataTable] = useState(initialDataTable)
  const [editingRows, setEditingRows] = useState([])
  const [addMode, setAddMode] = useState(false)

  const handleButtonClick = (index, action) => {
    switch (action) {
      case 'add':
        setAddMode(true)
        setDataTable(prevData => {
          const updatedValue = [
            ...prevData.value,
            { stt: prevData.value.length + 1, khoa: '', ten: '' },
          ]
          return { ...prevData, value: updatedValue }
        })
        break
      case 'edit':
        setEditingRows(prevEditingRows => {
          const updatedEditingRows = [...prevEditingRows]
          if (updatedEditingRows.includes(index)) {
            updatedEditingRows.splice(updatedEditingRows.indexOf(index), 1)
          } else {
            updatedEditingRows.push(index)
          }
          return updatedEditingRows
        })
        setAddMode(false)
        break
      case 'delete':
        handleDeleteButtonClick(index)
        break
      default:
        break
    }
  }

  const handleDeleteButtonClick = index => {
    if (addMode || editingRows.includes(index)) {
      setAddMode(false)
      setEditingRows(prevEditingRows =>
        prevEditingRows.filter(row => row !== index),
      )
    } else {
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
          setDataTable(prevData => {
            const updatedValue = [...prevData.value]
            updatedValue.splice(index, 1)
            return { ...prevData, value: updatedValue }
          })

          Swal.fire({
            title: 'Deleted!',
            text: 'Your file has been deleted.',
            icon: 'success',
          })
        }
      })
    }
  }

  const renderBodyTable = () => {
    return dataTable.value.map((dt, index) => {
      const isEditing = editingRows.includes(index)
      const isAddRow = addMode && index === dataTable.value.length - 1

      return (
        <tr key={index}>
          <td className='border border-primary p-1 text-center'>{dt.stt}</td>
          <td className='border border-primary p-1 text-center'>
            {isEditing || isAddRow ? (
              <InputText
                name={`khoa_${index}`}
                value={dt.khoa}
                onChange={event =>
                  handleInputChange(index, 'khoa', event.target.value)
                }
              />
            ) : (
              dt.khoa
            )}
          </td>
          <td className='border border-primary p-1 text-center'>
            {isEditing || isAddRow ? (
              <InputText
                name={`ten_${index}`}
                value={dt.ten}
                onChange={event =>
                  handleInputChange(index, 'ten', event.target.value)
                }
              />
            ) : (
              dt.ten
            )}
          </td>
          <td className='border border-primary p-1 flex'>
            <div className='w-1/2 flex justify-center'>
              <Button
                label={isEditing || isAddRow ? 'Lưu' : 'Sửa'}
                type={isEditing || isAddRow ? null : 'edit'}
                onClick={() => handleButtonClick(index, 'edit')}
              />
            </div>
            <div className='w-1/2 flex justify-center'>
              <Button
                label={isEditing || isAddRow ? 'Hủy' : 'Xóa'}
                type={isEditing || isAddRow ? 'outline' : 'delete'}
                onClick={() => handleButtonClick(index, 'delete')}
              />
            </div>
          </td>
        </tr>
      )
    })
  }

  const handleInputChange = (index, field, updatedValue) => {
    setDataTable(prevData => {
      const updatedData = [...prevData.value]
      updatedData[index][field] = updatedValue
      return { ...prevData, value: updatedData }
    })
  }

  return (
    <>
      <div className='container mx-auto my-3'>
        <Title title={'Danh sách khoa'} />
        <div className='my-3 border-2'>
          <div className='flex justify-end my-2 mx-8'>
            <Button
              label={'Thêm'}
              type={'add'}
              onClick={() =>
                handleButtonClick(dataTable.value.length - 1, 'add')
              }
            />
          </div>
          <Table header={dataTable.header}>{renderBodyTable()}</Table>
        </div>
      </div>
    </>
  )
}
