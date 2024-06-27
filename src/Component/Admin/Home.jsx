import React from 'react'
import MyNav from './MyNav'
import { Container, Row, Col, Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  useAveragebidQuery,
  useMonthlygrowthQuery,
  useRecentBillboardQuery,
  useRecentadvertisersQuery,
  useTotalBillboardQuery,
  useTotaladminsQuery,
  useTotaladvertisersQuery,
  useTotalrevenueQuery
} from '../../redux/GlobalApi'
import { LoaderIcon } from 'react-hot-toast'
import Footer from '../Footer'

const Home = () => {
  const { data: totalBilllboard } = useTotalBillboardQuery()
  const { data: recentBilllboard } = useRecentBillboardQuery()
  const { data: totaladvertisers } = useTotaladvertisersQuery()
  const { data: recentadvertisers } = useRecentadvertisersQuery()
  const { data: totaladmins } = useTotaladminsQuery()
  const { data: totalrevenue } = useTotalrevenueQuery()
  const { data: averagebid } = useAveragebidQuery()
  const { data: monthlygrowth } = useMonthlygrowthQuery()

  // monthlygrowth
  return (
    <>
      <MyNav />
      <Container fluid className='mt-3'>
        <Row className='mt-2 mb-2'>
          <Col md={6}>
            <Card className='text-center'>
              <Card.Body>
                <Card.Title>Total Billboards</Card.Title>
                <h2>
                  {totalBilllboard?.total || (
                    <>
                      <LoaderIcon></LoaderIcon>
                    </>
                  )}
                </h2>
                <p style={{ color: 'green' }}>
                  Available billboards for advertising
                </p>
                <Card.Text>
                  {' '}
                  Updated as of {new Date().toLocaleDateString()}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className='text-center'>
              <Card.Body>
                <Card.Title>Recent Billboards</Card.Title>
                <h2>
                  {recentBilllboard?.recentCount || (
                    <>
                      <LoaderIcon></LoaderIcon>
                    </>
                  )}
                </h2>
                <p style={{ color: 'green' }}>
                  ↑{' '}
                  {(recentBilllboard?.recentCount / totalBilllboard?.total) *
                    100}
                  %
                </p>
                <Card.Text> vs previous 30 days</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Add more cards as needed */}
        </Row>
        {/* <Col md={4}>
            <Card className='text-center'>
              <Card.Body>
                <Card.Title>Sales</Card.Title>
                <h2>$5,000</h2>
                <p style={{ color: 'green' }}>↑ 30%</p>
                <Card.Text>vs previous 30 days</Card.Text>
              </Card.Body>
            </Card>
          </Col> */}
        <Row className='mt-3'>
          <Col md={4}>
            <Card className='text-center'>
              <Card.Body>
                <Card.Title>Total Advertisers</Card.Title>
                <h2>{totaladvertisers?.total || 0}</h2>
                <p style={{ color: 'green' }}>
                  Available advertisers for advertising
                </p>
                <Card.Text>
                  {' '}
                  Updated as of {new Date().toLocaleDateString()}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className='text-center'>
              <Card.Body>
                <Card.Title>Recent Advertisers</Card.Title>
                <h2>{recentadvertisers?.recentCount || 0}</h2>
                <p style={{ color: 'green' }}>
                  ↑{' '}
                  {(recentadvertisers?.recentCount / totaladvertisers?.total) *
                    100}
                  %
                </p>
                <Card.Text> vs previous 30 days</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className='text-center'>
              <Card.Body>
                <Card.Title>Total Admins</Card.Title>
                <h2>{totaladmins?.total || 0}</h2>
                <p style={{ color: 'green' }}>
                  Available Admins for Management
                </p>
                <Card.Text>
                  {' '}
                  Updated as of {new Date().toLocaleDateString()}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Add more cards as needed */}
        </Row>

        <Row className='mt-3'>
          <Col md={4}>
            <Card className='text-center'>
              <Card.Body>
                <Card.Title>Total Revenue</Card.Title>
                <h2>PKR {totalrevenue?.totalRevenue || 0}</h2>
                <p style={{ color: 'green' }}>
                  Total Revenue Generated till now
                </p>
                <Card.Text>
                  {' '}
                  Updated as of {new Date().toLocaleDateString()}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className='text-center'>
              <Card.Body>
                <Card.Title>Average Bid</Card.Title>
                <h2>PKR {Math.round(averagebid?.averageBid) || 0}</h2>
                <p style={{ color: 'green' }}>Average bid on our Application</p>
                <Card.Text>
                  Updated as of {new Date().toLocaleDateString()}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className='text-center'>
              <Card.Body>
                <Card.Title>Monthly Growth</Card.Title>
                <h2>{monthlygrowth?.growth || 0}%</h2>
                <p style={{ color: 'green' }}>
                  Comparison of revenue from past data
                </p>
                <Card.Text> vs previous 30 days</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Add more cards as needed */}
        </Row>
      </Container>
      <Footer></Footer>
    </>
  )
}

export default Home
