import React, { useEffect, useState } from 'react'
import MyNav from '../MyNav'
import {
  useBanUserMutation,
  useDeleteBillboardMutation,
  useGetAllUsersQuery,
  useGetBillboardQuery,
  useGetTagsQuery,
  useUnbanUserMutation
} from '../../../redux/GlobalApi'
import { Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap'
// import AddBillboard from './AddBillboard'
import Swal from 'sweetalert2'
import { formatDate } from '../../../utils/DateFormat'
import { renderTooltip } from '../../../utils/Tooltip'
import Footer from '../../Footer'
// import  from 'bootstrap-icons'
const AllUSers = () => {
  const { data, isLoading, error, isError, refetch } = useGetAllUsersQuery()
  //   const { data: tags, isLoading: tagsIsLoading } = useGetAllUsersQuery()
  //   const [deleteBillboard, deleteResults] = useDeleteBillboardMutation()
  console.log(data)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [searchQuery, setSearchQuery] = useState('')
  const [display, setDisplay] = useState(false)
  const [task, setTask] = useState('')
  const [operate, setOperate] = useState(null)

  // Calculate the filtered and paginated items
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const filteredItems = data?.users?.filter(
    item =>
      item?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item?.email?.toLowerCase().includes(searchQuery.toLowerCase())
  )
  const currentItems = filteredItems?.slice(indexOfFirstItem, indexOfLastItem)

  //   useEffect(() => {
  //     console.log({ data, tags })
  //   }, [data, tags])

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
        // deleteBillboard({ id }) // Call deleteBillboard here
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
  const [ban, banres] = useBanUserMutation()
  const banUser = id => {
    ban({ id })
    console.log('ban')
  }
  const [unban, unbanres] = useUnbanUserMutation()
  const unbanUser = id => {
    unban({ id })
    console.log('ban')
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

        <div className='container-fluid card m-0 mt-3 p-0 w-100 col-12'>
          <div className='table-responsive'>
            <table className='table mt-4'>
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>CNIC</th>
                  <th>Phone Number</th>
                  <th>Created At</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {!isLoading && data && (
                <tbody>
                  {currentItems.map(item => {
                    return (
                      <tr key={item.billboard_id}>
                        <td>{item.user_id}</td>
                        <td>{item.name || 'N/A'}</td>
                        <td>{item.email || 'N/A'}</td>
                        <td>{item.cnic}</td>
                        <td>{item.phone_number || 'N/A'}</td>
                        <td>{formatDate(item.created_at)}</td>
                        <td>
                          {item.status === null ? (
                            <span className='badge bg-secondary'>N/A</span>
                          ) : item.status === 1 ? (
                            <span className='badge bg-success'>Active</span>
                          ) : (
                            <span className='badge bg-danger'>Inactive</span>
                          )}
                        </td>

                        <td>
                          <div style={{ display: 'flex', gap: '10px' }}>
                            <OverlayTrigger
                              placement='top'
                              overlay={renderTooltip(null, 'Ban User')}
                            >
                              <div
                                onClick={() => banUser(item.user_id)}
                                style={{ cursor: 'pointer' }}
                              >
                                <img src='/images/ban.svg' alt='Ban' />
                              </div>
                            </OverlayTrigger>
                            <OverlayTrigger
                              placement='top'
                              overlay={renderTooltip(null, 'Unban User')}
                            >
                              <div
                                onClick={() => unbanUser(item.user_id)}
                                style={{
                                  display: 'flex',
                                  gap: '10px',
                                  cursor: 'pointer'
                                }}
                              >
                                <img
                                  src='/images/check2-circle.svg'
                                  alt='Unban'
                                />
                              </div>
                            </OverlayTrigger>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              )}
            </table>
            {data?.users && (
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
      {/* {task === 'add' && display ? (
        <>
          <AddBillboard setDisplay={setDisplay} display={display} tags={tags} />
        </>
      ) : task === 'update' && display ? (
        <AddBillboard
          setDisplay={setDisplay}
          display={display}
        //   tags={tags}
          update={true}
          data={operate}
        />
      ) : (
        <></>
      )} */}
    </>
  )
}

export default AllUSers
