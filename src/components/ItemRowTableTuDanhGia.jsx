import React, { useEffect, useState } from 'react'
import InputSelect from './InputSelect'
import InputNumber from './InputNumber'
import InputText from './InputText'
import Button from './Button'

const loaiHoatDong = [
  { name: 'Hiến máu', value: 1, khungDiem: { min: 200, max: 300 } },
  { name: 'Dọn vệ sinh', value: 2, khungDiem: { min: 100, max: 200 } },
]

export default function ItemRowTableTuDanhGia({
  index,
  data,
  onChangeStateItemRowTable,
  onClickDeleteItem,
}) {
  const renInitSelected = () => {
    return !data.loaiHoatDong
      ? loaiHoatDong[0]
      : loaiHoatDong.filter(hd => hd.value === data.loaiHoatDong)[0]
  }

  const [selected, setSelected] = useState(renInitSelected())
  const [rowData, setRowData] = useState({
    loaiHoatDong: renInitSelected().value,
    diemTuDanhGia: data.diemTuDanhGia,
    diemBanCanSuDanhGia: data.diemBanCanSuDanhGia,
    linkMinhChung: data.linkMinhChung,
  })

  const onSelectOption = selected => {
    setSelected(selected)
    setRowData({ ...rowData, loaiHoatDong: selected.value })
  }

  const onChangeValue = event => {
    const { name, value } = event.target
    let newValue
    newValue = Number(value)
    setRowData({ ...rowData, [name]: newValue || value })
  }

  useEffect(() => {
    onChangeStateItemRowTable(index, rowData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowData])

  return (
    <tr className='text-main'>
      <td className='border border-primary p-1 text-center'>{index + 1}</td>
      <td className='border border-primary p-1'>
        <InputSelect
          options={loaiHoatDong}
          value={selected}
          onChange={onSelectOption}
        />
      </td>
      <td className='border border-primary p-1 text-center'>
        {`${selected.khungDiem.min} - ${selected.khungDiem.max}`}
      </td>
      <td className='border border-primary p-1'>
        <InputNumber
          name='diemTuDanhGia'
          value={data.diemTuDanhGia}
          onChange={onChangeValue}
        />
      </td>
      <td className='border border-primary p-1'>
        {/* {data.diemBanCanSuDanhGia} */}
        <InputNumber
          name='diemBanCanSuDanhGia'
          value={data.diemBanCanSuDanhGia}
          onChange={onChangeValue}
        />
      </td>
      <td className='border border-primary p-1'>
        {/* {data.linkMinhChung} */}
        <InputText
          name='linkMinhChung'
          value={data.linkMinhChung}
          onChange={onChangeValue}
        />
      </td>
      <td className='border border-primary p-1 text-center'>
        <Button
          type='delete'
          label='xoá'
          onClick={() => onClickDeleteItem(index)}
        />
      </td>
    </tr>
  )
}
