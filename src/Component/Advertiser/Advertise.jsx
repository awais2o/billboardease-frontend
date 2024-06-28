import React, { useEffect, useState } from 'react'
import MyNav from '../Admin/MyNav'
import {
  useDeleteBillboardMutation,
  useGetBillboardQuery,
  useGetTagsQuery
} from '../../redux/GlobalApi'
import { Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap'
import Swal from 'sweetalert2'
import AddToWishlist from './AddToWishlist'
import { BidPage } from './BidPage'
import Footer from '../Footer'
import ImagePopup from '../Admin/Billboard/ImagePopup'

const Advertise = () => {
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
    // console.log({task,})
    useEffect(() => {
      console.log({ task, display })
    }, [task, display])
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
        <div className='row mt-4 align-items-center'>
          <div className='col-12 col-md-6 mb-3 mb-md-0'>
            <Form.Control
              type='text'
              placeholder='Search...'
              className='form-control'
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
          </div>
          <div className='col-12 col-md-6 d-flex justify-content-end'>
            <div className='d-flex align-items-center'>
              <small className='title'>Show</small>
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
              <small>entries</small>
            </div>
          </div>
        </div>

        <div className='container-fluid mt-3 p-0 w-100 col-12'>
          <div className='row'>
            {!isLoading && data ? (
              currentItems.map(item => {
                const tag = tags?.tags?.find(tag => tag.tag_id === item.tag_id)
                const tagName = tag ? tag.tag_name : 'N/A'
                return (
                  <div
                    key={item.billboard_id}
                    className='col-sm-12 col-md-6 col-lg-4 mb-4'
                  >
                    <div className='card h-100 hover-shadow'>
                      <div className='card-body'>
                        <h5 className='card-title'>{item.title}</h5>
                        <p className='card-text'>Quantity: {item.quantity}</p>
                        <p className='card-text'>
                          Location: {item.location_address}
                        </p>
                        <p className='card-text'>
                          Base Price: PKR {item.baseprice}
                        </p>
                        <p className='card-text'>Tag: {tagName}</p>
                      </div>
                      <div className='card-footer d-flex align-items-center'>
                        {/* <button
    className='btn btn-primary'
    onClick={() => {
      setDisplay(true)
      setTask('wishlist')
      setOperate(item)
    }}
  >
    Add to Wishlist
  </button> */}

                        <button
                          className='btn btn-inherit border border-secondary ms-2 custom-hover'
                          onClick={() => {
                            setDisplay(true)
                            setTask('bid')
                            setOperate(item)
                          }}
                        >
                          Make Bid
                        </button>
                        <div
                          className='ms-4'
                          onClick={() => {
                            setDisplay(true)
                            setTask('view')
                            setOperate(item)
                          }}
                        >
                          <OverlayTrigger
                            placement='top'
                            overlay={<Tooltip id='tooltip'>View</Tooltip>}
                          >
                            <img
                              src='/images/eye.svg'
                              alt='Eye'
                              // className=' custom-hover'
                            />
                          </OverlayTrigger>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            ) : isLoading ? (
              <h3>Data is Loading</h3>
            ) : (
              <h3>No Data</h3>
            )}
          </div>
        </div>
        {data?.billboards && (
          <div className='m-3'>
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={filteredItems.length}
              currentPage={currentPage}
              paginate={handlePageChange}
            />
          </div>
        )}
      </section>
      <Footer />
      {display && task === 'wishlist' ? (
        <>
          <AddToWishlist
            display={display}
            setDisplay={setDisplay}
            data={operate}
          />
        </>
      ) : display && task === 'bid' ? (
        <>
          <BidPage
            display={display}
            setDisplay={setDisplay}
            billboard={operate}
          />
        </>
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

export default Advertise
