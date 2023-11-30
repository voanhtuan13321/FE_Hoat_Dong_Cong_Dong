import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import Table from '../components/Table'
import Button from '../components/Button'
import ItemRowDanhSachHoatDongCongDongAdmin from '../components/ItemRowDanhSachHoatDongCongDongAdmin'

const dataTable = {
  header: [
    { className: 'w-5%', title: 'stt' },
    { className: '', title: 'Loại hoạt động cộng đồng' },
    { className: 'w-15%', title: 'Min điểm' },
    { className: 'w-15%', title: 'Max điểm' },
    { className: 'w-20%', title: '' },
  ],
  value: [
    { loaiHDCD: 'Hiến máu', minPoint: 10, maxPoint: 30 },
    { loaiHDCD: 'Hiến máu', minPoint: 10, maxPoint: 30 },
    { loaiHDCD: 'Hiến máu', minPoint: 10, maxPoint: 30 },
    { loaiHDCD: 'Hiến máu', minPoint: 10, maxPoint: 30 },
    { loaiHDCD: 'Hiến máu', minPoint: 10, maxPoint: 30 },
  ],
}

export default function AdminDanhSachHoatDongCongDong() {
  const [data, setData] = useState([])
  const [addButtonDisabled, setAddButtonDisabled] = useState(false)

  useEffect(() => {
    fetchListHDCD()
  }, [])

  const fetchListHDCD = () => {
    setData(dataTable.value)
  }

  const handleAddRow = () => {
    setAddButtonDisabled(true)
  }
  const dataAddRow = () => {
    return {
      loaiHDCD: '',
      minPoint: 0,
      maxPoint: 0,
    }
  }

  const renderBodyTable = () => {
    let arrJsx = data.map((dt, index) => {
      return (
        <ItemRowDanhSachHoatDongCongDongAdmin
          index={index}
          data={dt}
          isEdit={false}
        />
      )
    })
    addButtonDisabled &&
      (arrJsx = [
        ...arrJsx,
        <ItemRowDanhSachHoatDongCongDongAdmin
          index={-1}
          data={dataAddRow()}
          isEdit={true}
          setAddButtonDisabled={setAddButtonDisabled}
        />,
      ])

    return arrJsx
  }

  return (
    <>
      <div className='container p-2 justify-center m-auto'>
        <Title title={'Danh sách các hoạt động cộng đồng'} />

        <div className='py-2'>
          <div className='text-end py-2'>
            <Button
              type={'add'}
              label={'Thêm'}
              disabled={addButtonDisabled}
              onClick={e => handleAddRow()}
            />
          </div>
          <Table header={dataTable.header}>{renderBodyTable()}</Table>
        </div>
      </div>
    </>
  )
}
