import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
// import dotenv from "dotenv"


// dotenv.config()
export const authSliceApi = createApi({
  reducerPath: 'authSliceApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:2000/'}),
  endpoints: (build) => ({
      getLoginCheck: build.query({
          query: (token) => ({
              url: 'auth/',
              method: 'GET',
              headers: {
                  authorization: token,
              }
          }),

      }),
      getLoginUser: build.query({
          query: (token) => ({
              url: 'auth/login-user',
              method: 'GET',
              headers: {
                  authorization: token,
              }
          }),
      }),
      loginUser: build.mutation({
          query: (body) => ({
              url: 'auth/',
              method: 'POST',
              body,
          })
      }),
      resetPassword: build.mutation({
        query: (body) => ({
            url: 'auth/reset-password',
            method: 'POST',
            body,
        })
    }),
    resetPasswordConfirm: build.mutation({
        query: (body) => ({
            url: 'auth/reset-password-confirm',
            method: 'POST',
            body,
        })
    })
})

})

export const {
  useGetLoginCheckQuery,
  useGetLoginUserQuery,
  useLoginUserMutation,
  useResetPasswordMutation,
  useResetPasswordConfirmMutation,
} = authSliceApi;