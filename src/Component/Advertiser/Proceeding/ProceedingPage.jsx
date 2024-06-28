import React, { useEffect, useState } from 'react'
// import MyNav from '../../Admin/MyNav'
// import { useMyWinningQuery } from '../../../redux/GlobalApi'
import { Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useMywinningQuery } from '../../../redux/GlobalApi'
import MyNav from '../../Admin/MyNav'
import { formatDate } from '../../../utils/DateFormat'
import SelectContent from './SelectContent'
import PaymentButton from './PaymentButton'
import Footer from '../../Footer'

// import { formatDate } from '../../../utils/DateFormat'

const ProceedingPage = () => {
  const { data, isLoading, error, isError, refetch } = useMywinningQuery()
  const [showModal, setShowModal] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [searchQuery, setSearchQuery] = useState('')
  const [display, setDisplay] = useState(false)
  const [operate, setOperate] = useState(null)
  const [task, setTask] = useState('')
  // Calculate the filtered and paginated items
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const filteredItems = data?.winnings?.filter(
    item =>
      item?.bidAmount.toString().includes(searchQuery) ||
      (item?.billboard_title &&
        item.billboard_title.toLowerCase().includes(searchQuery.toLowerCase()))
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

  return (
    <>
      <MyNav />
      <section className='container-fluid'>
        <div className='row mt-4 align-items-center'>
          <div className='col-12 col-md-6'>
            <Form.Control
              type='text'
              placeholder='Search by bid amount...'
              className='form-control'
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
          </div>

          <div className='col-12 col-md-6 d-flex justify-content-end mt-2 mt-md-0'>
            <div className='d-flex align-items-center'>
              <small className='mt-2 title'>Show</small>
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
            </div>
          </div>
        </div>
        <div className='container-fluid card m-0 mt-3 p-0 w-100 col-12'>
          <div className='table-responsive'>
            <table className='table mt-4'>
              <thead>
                <tr>
                  <th>Bid ID</th>
                  <th>Bid Amount</th>
                  <th>Billboard </th>
                  <th>For Date Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {!isLoading && data?.winnings.length > 0 ? (
                <tbody>
                  {currentItems?.map(item => {
                    return (
                      <tr key={item?.bid_id}>
                        <td>{item?.bid_id}</td>
                        <td>{item?.bidAmount}</td>
                        <td>{item?.billboard_title}</td>
                        <td>{formatDate(item?.forDateTime)}</td>
                        <td>
                          <div
                            onClick={() => {
                              setDisplay(true)
                              setTask('addContent')
                              setOperate(item)
                            }}
                          >
                            <OverlayTrigger
                              placement='top'
                              overlay={
                                <Tooltip id='tooltip'>Add Content</Tooltip>
                              }
                            >
                              <img src='/images/folder-plus.svg' alt='Eye' />
                            </OverlayTrigger>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              ) : isLoading ? (
                <tbody>
                  <tr>
                    <td>Data is Loading</td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td>No Data</td>
                  </tr>
                </tbody>
              )}
            </table>
            {data?.winnings && (
              <div className='m-3'>
                <Pagination
                  itemsPerPage={itemsPerPage}
                  totalItems={filteredItems.length}
                  currentPage={currentPage}
                  paginate={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />

      {display && task === 'addContent' && operate ? (
        <>
          <SelectContent
            display={display}
            setDisplay={setDisplay}
            operate={operate}
          ></SelectContent>
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default ProceedingPage
