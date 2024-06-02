import React, { useEffect, useState } from 'react'
// import MyNav from '../../Admin/MyNav'
// import { useMyWinningQuery } from '../../../redux/GlobalApi'
import { Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap'
// import { useMywinningQuery } from '../../../redux/GlobalApi'

import { formatDate } from '../../utils/DateFormat'
// import SelectContent from './SelectContent'

import { useWillToPayQuery } from '../../redux/GlobalApi'
import PaymentButton from './Proceeding/PaymentButton'
import SelectContent from './Proceeding/SelectContent'
import MyNav from '../Admin/MyNav'

// import { formatDate } from '../../../utils/ DateFormat'

const PaymentPage = () => {
  const { data, isLoading, error, isError, refetch } = useWillToPayQuery()
  const [showModal, setShowModal] = useState(false)
  const [toPay, setToPay] = useState(0)
  const [order, setOrder] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [searchQuery, setSearchQuery] = useState('')
  const [display, setDisplay] = useState(false)
  const [operate, setOperate] = useState(null)
  const [task, setTask] = useState('')
  // Calculate the filtered and paginated items
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const filteredItems = data?.orders?.filter(
    item =>
      item?.bidAmount.toString().includes(searchQuery) ||
      (item?.title &&
        item.bidAmount.toLowerCase().includes(searchQuery.toLowerCase()))
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
        <div className='row mt-4'>
          <div className='col-12 col-md-6 mb-3 mb-md-0'>
            <Form.Control
              type='text'
              placeholder='Search by bid amount...'
              className='form-control'
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
          </div>

          <div className='col-12 col-md-6 d-flex justify-content-end mt-2 mt-md-0'>
            <label
              style={{
                display: 'flex',
                whiteSpace: 'nowrap',
                alignItems: 'center',
                fontWeight: 'normal'
              }}
            >
              <small className='title'>Show</small>
              <Form.Select
                aria-label='Change Page size'
                onChange={handlePageSizeChange}
                defaultValue='10'
                className='ms-2 me-3'
              >
                <option value='10'>10</option>
                <option value='20'>20</option>
                <option value='30'>30</option>
                <option value='50'>50</option>
              </Form.Select>
              <small>entries</small>
            </label>
          </div>
        </div>
        <div className='container-fluid card m-0 mt-3 p-0 w-100 col-12'>
          <div className='table-responsive'>
            <table className='table mt-4'>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>For Date and Time</th>
                  <th>Name</th>

                  <th>Title</th>
                  <th>Bid Amount</th>
                  <th>Paid</th>
                  <th>Action</th>
                </tr>
              </thead>
              {!isLoading && data?.orders && (
                <tbody>
                  {data?.orders?.map(order => (
                    <tr key={order.order_id}>
                      <td>{order.order_id}</td>
                      <td>{formatDate(order.forDateTime)}</td>
                      <td>{order.name || 'N/A'}</td>

                      <td>{order.title}</td>
                      <td>${order.bidAmount.toFixed(2)}</td>
                      <td>
                        {order.paid ? (
                          <div className='badge bg-label-info'>Paid</div>
                        ) : (
                          <div className='badge bg-label-danger'>Unpaid</div>
                        )}
                      </td>
                      <td>
                        {order.paid === 0 ? (
                          <div
                            onClick={() => {
                              setToPay(order.bidAmount)
                              setShowModal(true)
                              setOrder(order)
                            }}
                          >
                            <img src='/images/cash-coin.svg' alt='pay' />
                          </div>
                        ) : (
                          <div>
                            <img src='/images/check-lg.svg' alt='pay' />
                          </div>
                        )}
                      </td>
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
                  currentPage={currentPage}
                  paginate={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
      </section>
      <PaymentButton
        // amount={100000}
        amount={toPay * 100}
        currency='pkr'
        showModal={showModal}
        setShowModal={setShowModal}
        order={order}
        refetch={refetch}
      />
    </>
  )
}

export default PaymentPage
