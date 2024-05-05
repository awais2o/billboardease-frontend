import React, { useEffect, useState } from 'react'
import MyNav from '../../Admin/MyNav'
import {
  useDeleteMyContentMutation,
  useGetTagsQuery,
  useMyContentQuery
} from '../../../redux/GlobalApi'
import { Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap'
import Swal from 'sweetalert2'
import AddContent from './AddContent'
import { formatDate } from '../../../utils/DateFormat'
import VideoPopup from './VideoPopup'
// import ImagePopup from './ImagePopup'
// import  from 'bootstrap-icons'
const Content = () => {
  const { data, isLoading, error, isError, refetch } = useMyContentQuery()
  const [deleteMyContent, deleteResults] = useDeleteMyContentMutation()

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [searchQuery, setSearchQuery] = useState('')
  const [display, setDisplay] = useState(false)
  const [task, setTask] = useState('')
  const [operate, setOperate] = useState(null)

  // Calculate the filtered and paginated items
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const filteredItems = data?.filter(
    item => item?.title?.toLowerCase().includes(searchQuery.toLowerCase())
    // ||
    // item.location_address.toLowerCase().includes(searchQuery.toLowerCase())
  )
  const currentItems = filteredItems?.slice(indexOfFirstItem, indexOfLastItem)

  const handlePageChange = pageNumber => setCurrentPage(pageNumber)
  const handlePageSizeChange = event => {
    setItemsPerPage(parseInt(event.target.value))
    setCurrentPage(1)
  }
  const handleSearchInputChange = event => {
    setSearchQuery(event.target.value)
    setCurrentPage(1)
  }

  const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i)
    }

    return (
      <nav>
        <ul className='pagination'>
          {pageNumbers?.map(number => (
            <li key={number} className='page-item'>
              <a
                href='#'
                className='page-link'
                onClick={() => paginate(number)}
              >
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    )
  }

  const handleDelete = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.isConfirmed) {
        deleteMyContent({ id }) // Call deleteMyContent here
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
          // toast: true,
          // position: 'top-end',
          showConfirmButton: false,
          timer: 2000 // Time in milliseconds (2 seconds)
        })
      }
    })
  }

  return (
    <>
      <MyNav />
      <section className='container-fluid'>
        <div className='col-12'>
          <div className='row mt-4'>
            <div className='col-12 col-md-6'>
              <Form.Control
                type='text'
                placeholder='Search...'
                className='form-control'
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
            </div>
            <div
              className='col-12 col-md-6 d-flex justify-content-end mt-2 mt-md-0'
              onClick={() => {
                setDisplay(true)
                setTask('add')
              }}
            >
              <OverlayTrigger
                placement='top'
                overlay={<Tooltip id='tooltip'>Add Content</Tooltip>}
              >
                <Button className='send-invoice-btn btn btn-primary'>
                  Add Content
                </Button>
              </OverlayTrigger>
            </div>
          </div>
        </div>
        <div className='col-12 mt-3'>
          <div className='col-12 d-flex justify-content-end'>
            <label
              style={{
                display: 'flex',
                whiteSpace: 'nowrap',
                fontWeight: 'normal'
              }}
            >
              <small className='mt-2 title'> Show</small>
              <Form.Select
                aria-label='Change Page size'
                onChange={handlePageSizeChange}
                defaultValue={10}
                className='ms-2 me-3'
              >
                <option value='10'>10</option>
                <option value='20'>20</option>
                <option value='30'>30</option>
                <option value='50'>50</option>
              </Form.Select>
              <small className='mt-2'> entries</small>
            </label>
          </div>
        </div>
        <div className='container-fluid card m-0 mt-3 p-0 w-100 col-12'>
          <div className='table-responsive'>
            <table className='table mt-4'>
              <thead>
                <tr>
                  <th>Content ID</th>
                  <th>Title</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {!isLoading && data && (
                <tbody>
                  {currentItems?.map(item => {
                    return (
                      <tr key={item?.content_id}>
                        <td>{item?.content_id}</td>
                        <td>{item?.title}</td>

                        <td>{formatDate(item?.created_at)}</td>
                        <td>
                          <div style={{ display: 'flex', gap: '10px' }}>
                            <div
                              onClick={() => {
                                setDisplay(true)
                                setTask('view')
                                setOperate(item)
                              }}
                            >
                              <img src='/images/eye.svg' alt='Eye' />
                            </div>
                            <div
                              onClick={() => {
                                setDisplay(true)
                                setTask('update')
                                setOperate(item)
                              }}
                            >
                              <img src='/images/pen.svg' alt='Pen' />
                            </div>
                            <div
                              onClick={() => {
                                handleDelete(item.content_id)
                              }}
                            >
                              <img src='/images/trash3.svg' alt='Pen' />
                            </div>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              )}
            </table>
            {data && (
              <>
                <div className='m-3'>
                  {' '}
                  <Pagination
                    itemsPerPage={itemsPerPage}
                    totalItems={filteredItems.length}
                    currentPage={currentPage}
                    paginate={handlePageChange}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </section>
      {task === 'add' && display ? (
        <>
          <AddContent
            display={display}
            setDisplay={setDisplay}
            data={operate}
          ></AddContent>
        </>
      ) : task === 'update' && display ? (
        <>
          <AddContent
            display={display}
            setDisplay={setDisplay}
            data={operate}
            update
          ></AddContent>
        </>
      ) : task === 'view' && display ? (
        <>
          <VideoPopup
            setDisplay={setDisplay}
            display={display}
            image={operate?.filepath}
          ></VideoPopup>
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default Content
