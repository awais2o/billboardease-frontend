import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'
// import jwt from 'jsonwebtoken'

const baseUrl = process.env.REACT_APP_API_URL
const JWT_SECRET = process.env.REACT_APP_KEY
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
    // const id = Cookies.get('user_id')
    const authtoken = Cookies.get('Authorization')
    // const payload = { user_id: id }
    // const token = jwt.sign(payload, JWT_SECRET)
    console.log(authtoken)

    if (authtoken) {
      headers.set('Authorization', `${authtoken}`)
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
    }),
    login: builder.mutation({
      query: ({ input }) => createPostRequest('/auth/login/', input)
      // You may include additional mutations or queries here using your predefined functions
    }),
    getBillboard: builder.query({
      query: () => createRequest('/billboard'),
      providesTags: ['billboard']
    }),
    postBillboard: builder.mutation({
      query: ({ input }) => createPostRequest('/billboard', input),
      invalidatesTags: ['billboard']
    }),
    updateBillboard: builder.mutation({
      query: ({ input, id }) => createUpdateRequest(`/billboard/${id}`, input),
      invalidatesTags: ['billboard']
    }),
    deleteBillboard: builder.mutation({
      query: ({ id }) => createDeleteRequest(`/billboard/${id}`),
      invalidatesTags: ['billboard']
    }),
    getTags: builder.query({
      query: () => createRequest('/tags'),
      providesTags: ['tags']
    }),
    getAllUsers: builder.query({
      query: () => createRequest('/allusers'),
      providesTags: ['allusers']
    }),
    getImage: builder.query({
      query: ({ image }) => createRequest(`/media/getfile/${image}`)
    }),
    banUser: builder.mutation({
      query: ({ id }) => createUpdateRequest(`/allusers/ban/${id}`),
      invalidatesTags: ['allusers']
    }),
    unbanUser: builder.mutation({
      query: ({ id }) => createUpdateRequest(`/allusers/unban/${id}`),
      invalidatesTags: ['allusers']
    }),
    myContent: builder.query({
      query: () => createRequest(`/content/`),
      providesTags: ['mycontent']
    }),
    addMyContent: builder.mutation({
      query: ({ input }) => createPostRequest(`/content/`, input),
      invalidatesTags: ['mycontent']
    }),
    UpdateMyContent: builder.mutation({
      query: ({ id, input }) => createUpdateRequest(`/content/${id}`, input),
      invalidatesTags: ['mycontent']
    }),
    DeleteMyContent: builder.mutation({
      query: ({ id }) => createDeleteRequest(`/content/${id}`),
      invalidatesTags: ['mycontent']
    }),
    addtoWishlist: builder.mutation({
      query: ({ id, date }) =>
        createPostRequest(`/wishlist/${id}?date=${date}`),
      invalidatesTags: ['wishlist']
    }),
    wishlist: builder.query({
      query: () => createRequest(`/wishlist/`),
      providesTags: ['wishlist']
    })
    // Other endpoints using predefined request functions
  })
})

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetBillboardQuery,
  useGetTagsQuery,
  usePostBillboardMutation,
  useDeleteBillboardMutation,
  useUpdateBillboardMutation,
  useGetAllUsersQuery,
  useBanUserMutation,
  useUnbanUserMutation,
  useGetImageQuery,
  useMyContentQuery,
  useAddMyContentMutation,
  useUpdateMyContentMutation,
  useDeleteMyContentMutation,
  useAddtoWishlistMutation,
  useWishlistQuery
} = GlobalApi
