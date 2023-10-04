import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const userSliceApi = createApi({
  reducerPath: 'userSliceApi',
  baseQuery: fetchBaseQuery({baseUrl:"http://127.0.0.1:2000/"}),
  endpoints:(builder)=>({
    getUser: builder.query({
      query: (token) => ({
          url: '/user',
          method: 'GET',
          headers: {
              authorization: token,
          }
      }),
    }),
  addUser: builder.mutation({
    query: (body)=>({
      url:"user",
      method: 'post',
      body,
    })
  })
  
  })
  
  });
  export const {useGetUserQuery , useAddUserMutation}=userSliceApi