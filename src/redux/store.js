import { configureStore } from '@reduxjs/toolkit'
import { GlobalApi } from './GlobalApi'

export const store = configureStore({
  reducer: {
    [GlobalApi.reducerPath]: GlobalApi.reducer
  },
  middleware: middleware => middleware().concat(GlobalApi.middleware)
})
