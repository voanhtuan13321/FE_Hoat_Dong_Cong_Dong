import React from 'react'
import ReactPaginate from 'react-paginate'
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md'

/**
 * cách sử dụng
 *   <Pagination
        totalItems={listThongBao.totalItems}
        totalPages={listThongBao.totalPages}
        itemPerPage={listThongBao.itemPerPage}
        currentPage={listThongBao.currentPage}
        isNextPage={listThongBao.isNextPage}
        isPreviousPage={listThongBao.isPreviousPage}
        onPageChange={getList}
      />
 */

const Pagination = ({
  totalPages,
  currentPage,
  isNextPage,
  isPreviousPage,
  onPageChange,
}) => {
  const handlePageChange = ({ selected }) => {
    onPageChange(selected + 1)
  }

  return (
    <div className='flex justify-center'>
      <ReactPaginate
        className='flex gap-1 my-6'
        pageCount={totalPages ?? 0}
        pageRangeDisplayed={3}
        pageClassName='border border-solid w-10 h-10 rounded-md hover:text-white hover:bg-primary cursor-pointer flex'
        pageLinkClassName='py-2 px-4'
        marginPagesDisplayed={2}
        forcePage={currentPage - 1 || 0}
        previousLabel={
          isPreviousPage ? (
            <span className='w-10 h-10 flex items-center justify-center bg-white  hover:bg-primary hover:text-white text-main rounded-md border border-solid'>
              <MdNavigateBefore />
            </span>
          ) : null
        }
        nextLabel={
          isNextPage ? (
            <span className='w-10 h-10 flex items-center justify-center bg-white hover:bg-primary hover:text-white text-main rounded-md border border-solid'>
              <MdNavigateNext />
            </span>
          ) : null
        }
        breakLabel={'...'}
        onPageChange={handlePageChange}
        activeClassName='bg-primary text-white'
      />
    </div>
  )
}

export default Pagination
