import React, { useEffect } from 'react'
import MyNav from './MyNav'
import { useGetBillboardQuery } from '../../redux/GlobalApi'
import { Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap'

const Billboards = () => {
  const { data, isLoading, error, isError, refetch } = useGetBillboardQuery()
  useEffect(() => {
    console.log({ error })
  }, [error])
  return (
    <>
      <MyNav />
      <section className='container-fluid'>
        <div className='col-12'>
          <div className='row mt-4 '>
            {/* <div className='d-flex justify-content-between '> */}{' '}
            <div className='col-12  col-md-6'>
              <Form.Control
                type='text'
                placeholder='Search...'
                className='form-control '
                // value={searchValue}
                // onChange={handleSearchInputChange}
              />
            </div>
            <div className=' col-12 col-md-6 d-flex justify-content-end mt-2 mt-md-0'>
              <div className=' app-email-compose'>
                <OverlayTrigger
                  placement='top'
                  overlay={<Tooltip id='tooltip'>Add Billboard</Tooltip>}
                >
                  <Button
                    className='send-invoice-btn btn btn-primary'
                    onClick={() => {
                      // setSidePage(true)
                      // setName('add')
                    }}
                  >
                    Add Billboard
                  </Button>
                </OverlayTrigger>
              </div>
            </div>
          </div>

          {/* </div> */}
        </div>
        <div className='col-12 mt-3'>
          <div>
            <div className='col-12 d-flex justify-content-end'>
              <label
                style={{
                  display: 'flex',
                  whiteSpace: 'nowrap',
                  fontWeight: 'normal'
                }}
              >
                <small className=' mt-2 title'> Show</small>
                <Form.Select
                  aria-label='Change Page size'
                  // onChange={handlePageSize}
                  defaultValue={10}
                  className='ms-2 me-3'
                >
                  <option value='10'>10</option>
                  <option value='20'>20</option>
                  <option value='30'>30</option>
                  <option value='50'>50</option>
                </Form.Select>
                <small className=' mt-2'> entries</small>
              </label>
            </div>
          </div>
        </div>
        <div className='container-fluid card  m-0 mt-3 p-0 w-100 col-12'>
          <div className='table-responsive'>
            <table className='table mt-4'>
              <thead>
                <tr>
                  <td>
                    <div
                      className='d-flex align-items-center sort heading'
                      style={{ justifyContent: 'space-between' }}
                    >
                      #
                    </div>
                  </td>
                  <td>
                    <div
                      className='d-flex align-items-center sort heading'
                      style={{ justifyContent: 'space-between' }}
                    >
                      Title
                    </div>{' '}
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>hi</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  )
}

export default Billboards
