import React, { useState } from 'react'
import InputSelect from '../components/InputSelect'
import Button from '../components/Button'
import Table from '../components/Table'
import ItemRowTableTuDanhGia from '../components/ItemRowTableTuDanhGia'
import Title from '../components/Title'

const optionsDotDanhGia = [
  { name: '2022-2023', value: 1 },
  { name: '2021-2022', value: 2 },
]

const dataTable = {
  header: [
    { className: 'w-5%', title: 'stt' },
    { className: 'w-20%', title: 'loại hoạt động' },
    { className: 'w-10%', title: 'khung điểm' },
    { className: 'w-10%', title: 'điểm tự đánh giá' },
    { className: 'w-10%', title: 'điểm ban cán sự đánh giá' },
    { className: '', title: 'link minh chứng' },
    { className: 'w-5%', title: '' },
  ],
  value: [
    {
      loaiHoatDong: 1,
      diemTuDanhGia: 150,
      diemBanCanSuDanhGia: 110,
      linkMinhChung: 'facebook.com',
    },
    {
      loaiHoatDong: 2,
      diemTuDanhGia: 150,
      diemBanCanSuDanhGia: 110,
      linkMinhChung: 'facebook.com',
    },
  ],
}

export default function TuDanhGia() {
  const [selected, setSelected] = useState(optionsDotDanhGia[0])
  const [listTuDanhGia, setListTuDanhGia] = useState(dataTable.value)

  const onClickThem = () => {
    setListTuDanhGia([
      ...listTuDanhGia,
      {
        loaiHoatDong: 0,
        diemTuDanhGia: 0,
        diemBanCanSuDanhGia: 0,
        linkMinhChung: '',
      },
    ])
  }

  const onClickDeleteItem = index => {
    console.log(index)
    const cloneStates = [...listTuDanhGia]
    cloneStates.splice(index, 1)
    setListTuDanhGia(cloneStates)
  }

  const onChangeStateItemRowTable = (index, rowData) => {
    const cloneStates = [...listTuDanhGia]
    cloneStates[index] = rowData
    setListTuDanhGia(cloneStates)
  }

  const onClickXacNhan = () => {
    console.log(listTuDanhGia)
  }

  const onClickXacNhanThamGia = () => {
    alert('Xac Nhan tham gia')
  }

  const renderBodyTable = () => {
    return listTuDanhGia.map((dt, index) => {
      return (
        <ItemRowTableTuDanhGia
          key={index}
          index={index}
          data={dt}
          onChangeStateItemRowTable={onChangeStateItemRowTable}
          onClickDeleteItem={onClickDeleteItem}
        />
      )
    })
  }

  return (
    <div className='container mx-auto'>
      <Title title='tự đánh giá' />
      <div className='mt-3'>
        <div className='flex items-center gap-2 '>
          <span className='font-bold text-primary text-main'>
            Năm đánh giá:
          </span>
          <div className='w-48'>
            <InputSelect
              options={optionsDotDanhGia}
              value={selected}
              onChange={setSelected}
            />
          </div>
        </div>
        <p className='font-bold text-main text-red-text my-2'>
          ** Bạn chưa được phép đánh giá học kỳ này **
        </p>
      </div>
      <div>
        <div className='flex justify-between items-center'>
          <h3 className='uppercase font-bold'>nội dung tự đánh giá</h3>
          <div>
            <Button label='thêm' type='add' onClick={onClickThem} />
          </div>
        </div>
        <div className='my-2'>
          <Table header={dataTable.header}>{renderBodyTable()}</Table>
        </div>
        <div className='flex justify-end gap-2'>
          <Button label='xác nhận' onClick={onClickXacNhan} />
          <Button label='xác nhận tham gia' onClick={onClickXacNhanThamGia} />
        </div>
      </div>
    </div>
  )
}
