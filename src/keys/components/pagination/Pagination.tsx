
interface PaginationProps {
   prevPage: () => void;
    nextPage: () => void;
}

export const Pagination = ({nextPage, prevPage}:PaginationProps) => {
  return (
    <div className='flex gap-5'>
                    <button
                        className='bg-indigo-600 py-3 px-5 rounded-md text-white  hover:bg-indigo-700'
                        onClick={prevPage}
                    >
                        <i className='fas fa-arrow-left'></i>
                    </button>
                    <button
                        className='bg-indigo-600 py-3 px-5 rounded-md text-white hover:bg-indigo-700'
                        onClick={nextPage}
                    >
                        <i className='fas fa-arrow-right'></i>
                    </button>
                </div>
  )
}
