export default function ItemRowNoData({ colSpan }) {
  return (
    <tr className='text-center'>
      <td className='border border-primary text-main p-2' colSpan={colSpan}>
        Không có dữ liệu...
      </td>
    </tr>
  )
}
