import React, { useEffect, useState } from 'react'
import MyNav from '../MyNav'
import {
  useDeleteBillboardMutation,
  useGetBillboardQuery,
  useGetTagsQuery
} from '../../../redux/GlobalApi'
import { Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap'
import AddBillboard from './AddBillboard'
import Swal from 'sweetalert2'
import ImagePopup from './ImagePopup'
import Footer from '../../Footer'
// import  from 'bootstrap-icons'
const Billboards = () => {
  const { data, isLoading, error, isError, refetch } = useGetBillboardQuery()
  const { data: tags, isLoading: tagsIsLoading } = useGetTagsQuery()
  const [deleteBillboard, deleteResults] = useDeleteBillboardMutation()

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [searchQuery, setSearchQuery] = useState('')
  const [display, setDisplay] = useState(false)
  const [task, setTask] = useState('')
  const [operate, setOperate] = useState(null)

  // Calculate the filtered and paginated items
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const filteredItems = data?.billboards?.filter(
    item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location_address.toLowerCase().includes(searchQuery.toLowerCase())
  )
  const currentItems = filteredItems?.slice(indexOfFirstItem, indexOfLastItem)

  useEffect(() => {
    console.log({ data, tags })
  }, [data, tags])
  useEffect(() => {
    console.log({ task, display })
  }, [task, display])

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
        deleteBillboard({ id }) // Call deleteBillboard here
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
                overlay={<Tooltip id='tooltip'>Add Billboard</Tooltip>}
              >
                <Button className='send-invoice-btn btn btn-primary'>
                  Add Billboard
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
                  <th>#</th>
                  <th>Title</th>
                  <th>Quantity (Units)</th>

                  <th>Location Address</th>
                  {/* <th>Dimension X</th>
                  <th>Dimension Y</th> */}
                  <th>Base Price (PKR)</th>
                  <th>Tag</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {!isLoading && data && (
                <tbody>
                  {currentItems.map(item => {
                    const tag = tags?.tags?.find(
                      tag => tag.tag_id === item.tag_id
                    )
                    const tagName = tag ? tag.tag_name : 'N/A'
                    return (
                      <tr key={item.billboard_id}>
                        <td>{item.billboard_id}</td>
                        <td>{item.title}</td>
                        <td>{item.quantity}</td>

                        <td>{item.location_address}</td>
                        {/* <td>{item.dimension_x}</td>
                        <td>{item.dimension_y}</td> */}
                        <td>{item.baseprice}</td>

                        <td>{tagName}</td>
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
                                handleDelete(item.billboard_id)
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
            {data?.billboards && (
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
      {task === 'add' && display ? (
        <>
          <AddBillboard setDisplay={setDisplay} display={display} tags={tags} />
        </>
      ) : task === 'update' && display ? (
        <AddBillboard
          setDisplay={setDisplay}
          display={display}
          tags={tags}
          update={true}
          data={operate}
        />
      ) : task === 'view' && display ? (
        <ImagePopup
          setDisplay={setDisplay}
          display={display}
          image={operate?.image}
        />
      ) : (
        <></>
      )}
    </>
  )
}

export default Billboards
