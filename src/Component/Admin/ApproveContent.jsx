import React, { useState } from 'react'
import { Button, Form, OverlayTrigger } from 'react-bootstrap'

import { formatDate } from '../../utils/DateFormat'
// import { useApproveContentQuery } from '../../../redux/GlobalApi'
import {
  useApproveContentMutation,
  useDisapproveContentMutation,
  useUpcomingAllOrdersQuery
} from '../../redux/GlobalApi'
import MyNav from './MyNav'
import { renderTooltip } from '../../utils/Tooltip'
import VideoPopup from '../Advertiser/Content/VideoPopup'
import Footer from '../Footer'

const ApproveContentPage = () => {
  const { data, isLoading, error, isError } = useUpcomingAllOrdersQuery()
  const [approve, approveResults] = useApproveContentMutation()
  const [disapprove, disapproveResults] = useDisapproveContentMutation()

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [searchQuery, setSearchQuery] = useState('')
  const [display, setDisplay] = useState(false)
  const [task, setTask] = useState('')
  const [operate, setOperate] = useState()

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const filteredItems = data?.orders?.filter(
    item =>
      item.bidAmount?.toString().includes(searchQuery) ||
      item.billboardTitle?.toLowerCase().includes(searchQuery.toLowerCase())
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

  return (
    <>
      <MyNav />
      <section className='container-fluid'>
        <div className='col-12'>
          <div className='row mt-4'>
            <div className='col-12 col-md-6'>
              <Form.Control
                type='text'
                placeholder='Search by Bid Amount or Billboard Title...'
                className='form-control'
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
            </div>
            <div className='col-12  col-md-6 mt-2 mt-md-0 d-flex justify-content-end'>
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
        <div className='col-12 mt-3'></div>
        <div className='container-fluid card m-0 mt-3 p-0 w-100 col-12'>
          <div className='table-responsive'>
            <table className='table mt-4'>
              <thead>
                <tr>
                  <th>Bid ID</th>
                  <th>Bid Amount</th>
                  <th>Billboard Title</th>
                  <th>For Date Time</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {!isLoading && data?.orders && (
                <tbody>
                  {currentItems?.map(item => (
                    <tr key={item?.order_id}>
                      <td>{item?.order_id}</td>
                      <td>{item?.bidAmount}</td>
                      <td>{item?.billboardTitle}</td>
                      <td>{formatDate(item?.forDateTime)}</td>
                      <td>
                        {item?.approve === 1 ? (
                          <div className=' badge badge  bg-label-info'>
                            {' '}
                            Approved
                          </div>
                        ) : (
                          <div className=' badge  bg-label-danger'>
                            {' '}
                            Unapproved
                          </div>
                        )}
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <OverlayTrigger
                            placement='top'
                            overlay={renderTooltip(null, 'View Content ')}
                          >
                            <div
                              onClick={() => {
                                setDisplay(true)
                                setTask('display')
                                setOperate(item)
                              }}
                            >
                              <img src='/images/eye.svg' alt='Eye' />
                            </div>
                          </OverlayTrigger>
                          <OverlayTrigger
                            placement='top'
                            overlay={renderTooltip(null, 'Approve Content ')}
                          >
                            <div
                              onClick={() => {
                                approve({ order_id: item.order_id })
                              }}
                            >
                              <img src='/images/check2-all.svg' alt='Eye' />
                            </div>
                          </OverlayTrigger>

                          <OverlayTrigger
                            placement='top'
                            overlay={renderTooltip(null, 'Disapprove Content ')}
                          >
                            <div
                              onClick={() => {
                                disapprove({ order_id: item.order_id })
                              }}
                            >
                              <img
                                src='/images/x-octagon-fill.svg'
                                alt='Disapprove'
                              />
                            </div>
                          </OverlayTrigger>
                        </div>
                      </td>
                      {/* x-octagon-fill */}
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
            {data?.orders && (
              <div className='m-3'>
                <Pagination
                  itemsPerPage={itemsPerPage}
                  totalItems={filteredItems.length}
                  paginate={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
      {task === 'display' && display && (
        <VideoPopup
          display={display}
          setDisplay={setDisplay}
          image={operate.contentFilepath}
        ></VideoPopup>
      )}
    </>
  )
}

export default ApproveContentPage
