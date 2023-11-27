import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({baseUrl: '/v1'}),
  endpoints: builder => ({
    signup: builder.mutation({
      query: ({username, email, password}) => ({
        url: '/register',
        method: 'POST',
        body: {username, email, password},
      }),
    }),
    login: builder.mutation({
      query: ({email, password}) => ({
        url: '/login',
        method: 'POST',
        body: {email, password},
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),
    getAllUsers: builder.query({
      query: () => '/users/list',
    }),
    getUserById: builder.query({
      query: (id: string) => `/user/${id}`,
    }),
    changePassword: builder.mutation({
      query: values => ({
        url: '/password/reset',
        method: 'POST',
        body: values,
      }),
    }),
    update: builder.mutation({
      query: values => ({
        url: `/admin/${values.id}`,
        method: 'POST',
        body: values,
      }),
    }),
    updateUserProfilePicture: builder.mutation({
      query: values => ({
        url: `/user/profileImage/${values.id}`,
        method: 'POST',
        body: values,
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useChangePasswordMutation,
  useUpdateMutation,
  useUpdateUserProfilePictureMutation,
} = api;
