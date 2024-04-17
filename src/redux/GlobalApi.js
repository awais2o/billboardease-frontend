import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'

const baseUrl = process.env.REACT_APP_API_URL
// const credentials = process.env.REACT_APP_API_CREDENTIALS

const createRequest = url => ({
  method: 'GET',
  url
})

const createPostRequest = (url, data) => ({
  method: 'POST',
  url,
  body: JSON.stringify(data),
  headers: { 'Content-Type': 'application/json' }
})

const createDeleteRequest = (url, data) => ({
  method: 'DELETE',
  url,
  body: JSON.stringify(data),
  headers: { 'Content-Type': 'application/json' }
})

const createUpdateRequest = (url, data) => ({
  method: 'PUT',
  url,
  body: JSON.stringify(data),
  headers: { 'Content-Type': 'application/json' }
})

const customBaseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const authToken = Cookies.get('Authorization') // Ensure this is the correct key where the token is stored
    if (authToken) {
      headers.set('Authorization', `Bearer ${authToken}`)
    }
    return headers
  }
})

// Enhance fetchBaseQuery to include response headers in the result
const baseQueryWithHeaders = async (args, api, extraOptions) => {
  const result = await customBaseQuery(args, api, extraOptions)
  if (result.meta && result.meta.response) {
    const headers = {}
    result.meta.response.headers.forEach((value, key) => {
      headers[key] = value
    })
    // Extend the result with headers
    console.log({ headers })
    return { ...result, headers }
  }
  return result
}

export const GlobalApi = createApi({
  reducerPath: 'GlobalApi',
  baseQuery: baseQueryWithHeaders,
  endpoints: builder => ({
    register: builder.mutation({
      query: ({ input }) => createPostRequest('/auth/register/', input)
      // You may include additional mutations or queries here using your predefined functions
    })
    // Other endpoints using predefined request functions
  })
})

export const { useRegisterMutation } = GlobalApi
