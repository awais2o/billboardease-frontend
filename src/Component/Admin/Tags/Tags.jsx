import React, { useState } from 'react'
import MyNav from '../MyNav'
import Footer from '../../Footer'
import {
  useDeleteTagsMutation,
  useGetTagsQuery
} from '../../../redux/GlobalApi'
import { Button, Form, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { renderTooltip } from '../../../utils/Tooltip'
import AddTagModal from './AddTagModal'

const Tags = () => {
  const { data, isLoading, error, isError, refetch } = useGetTagsQuery()
  const [deleteTag, deleteResults] = useDeleteTagsMutation()
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [searchQuery, setSearchQuery] = useState('')
  const [showModal, setShowModal] = useState(false)

  const handleCloseModal = () => setShowModal(false)
  const handleShowModal = () => setShowModal(true)

  // Calculate the filtered and paginated items
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const filteredItems = data?.tags?.filter(item =>
    item?.tag_name?.toLowerCase().includes(searchQuery.toLowerCase())
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
          {pageNumbers.map(number => (
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
        deleteTag({ id }).then(() => {
          Swal.fire({
            title: 'Deleted!',
            text: 'Your tag has been deleted.',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000 // Time in milliseconds (2 seconds)
          })
          refetch() // Refetch tags after deletion
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
            <div className='col-12 col-md-6 mt-2 mt-md-0 d-flex justify-content-end'>
              {/* <label
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
              </label> */}
              <Button
                variant='primary'
                onClick={handleShowModal}
                className='ms-2'
              >
                Add Tag
              </Button>
            </div>
          </div>
        </div>
        <div className='col-12'>
          <div className='row mt-4'>
            <div className='col-12  mt-2 mt-md-0 d-flex justify-content-end'>
              <div className='d-flex align-items-center'>
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
          </div>
        </div>

        <div className='container-fluid card m-0 mt-3 p-0 w-100 col-12'>
          <div className='table-responsive'>
            <table className='table mt-4'>
              <thead>
                <tr>
                  <th>Tag ID</th>
                  <th>Tag Name</th>
                  {/* <th>Actions</th> */}
                </tr>
              </thead>
              {!isLoading && data && (
                <tbody>
                  {currentItems.map(item => (
                    <tr key={item.tag_id}>
                      <td>{item.tag_id}</td>
                      <td>{item.tag_name || 'N/A'}</td>
                      {/* <td>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <OverlayTrigger
                            placement='top'
                            overlay={renderTooltip(null, 'Delete Tag')}
                          >
                            <div
                              onClick={() => handleDelete(item.tag_id)}
                              style={{ cursor: 'pointer' }}
                            >
                              <img src='/images/trash3.svg' alt='Delete' />
                            </div>
                          </OverlayTrigger>
                        </div>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
            {data?.tags && (
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
      <Footer />
      <AddTagModal
        show={showModal}
        handleClose={handleCloseModal}
        refetch={refetch}
      />
    </>
  )
}

export default Tags
