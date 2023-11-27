import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

import type {RootState} from '../store';

type roleType = string;

type userType = {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  telephone: string;
  data_of_birth: string;
  profile_picture_path: string;
  email: string;
  email_verified_at: string;
  password: string;
  is_platform_admin: string;
  remember_token: string;
  created_at: string;
  updated_at: string;
};

const profile: userType = {
  id: '',
  username: '',
  first_name: '',
  last_name: '',
  telephone: '',
  data_of_birth: '',
  profile_picture_path: '',
  email: '',
  email_verified_at: '',
  password: '',
  is_platform_admin: '',
  remember_token: '',
  created_at: '',
  updated_at: '',
};

const userRecord: userType = {
  id: '',
  username: '',
  first_name: '',
  last_name: '',
  telephone: '',
  data_of_birth: '',
  profile_picture_path: '',
  email: '',
  email_verified_at: '',
  password: '',
  is_platform_admin: '',
  remember_token: '',
  created_at: '',
  updated_at: '',
};

const users: userType[] = [];
const userRoles: roleType[] = [];

const initialState = {
  profile,
  users,
  status: 'idle',
  userRecord,
  isAuthenticated: false,
  userRoles: '',
};

type valueType = {
  email: string;
  password: string;
};

export const login = createAsyncThunk(
  'users/login',
  async ({email, password}: valueType) => {
    const userResponse = await axios.post(`/v1/login`, {email, password});
    return await userResponse.data;
  }
);

export const logout = createAsyncThunk('users/logout', async () => {
  const userLogoutResponse = await axios.post(`/v1/logout`);
  return await userLogoutResponse.data;
});

export const getAllUsers = createAsyncThunk(
  'users/index',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get(`/v1/users/list`);
      // console.log(response)
      return await response.data;
    } catch (err: any) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const getUserById = createAsyncThunk(
  'users/show',
  async (id: string, {rejectWithValue}) => {
    try {
      const response = await axios.get(`/v1/user/${id}`);
      return await response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const changePassword = createAsyncThunk(
  `users/changePassword`,
  async (values: any, {rejectWithValue}) => {
    try {
      const id = values.get('id');
      const storeResponse = await axios.post(`/v1/password/reset`, values);
      return storeResponse.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const update = createAsyncThunk(
  `users/update`,
  async (values: any, {rejectWithValue}) => {
    try {
      const id = values.get('id');
      const storeResponse = await axios.post(`/v1/admin/${id}`, values);
      return await storeResponse.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateUserProfilePicture = createAsyncThunk(
  `users/update/profile`,
  async (values: any, {rejectWithValue}) => {
    try {
      const id = values.get('id');
      const storeResponse = await axios.post(
        `/v1/user/profileImage/${id}`,
        values
      );
      return storeResponse.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(login.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(login.fulfilled, (state, action) => {
        if (state.status === 'pending') {
          state.status = 'idle';
          if (
            action.payload.hasOwnProperty('success') &&
            action.payload.success === true
          ) {
            state.isAuthenticated = true;
            state.profile = action.payload.data.profile;
            state.userRoles = action.payload.data.role;
          } else {
            state.isAuthenticated = false;
          }
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.isAuthenticated = false;
      })
      .addCase(logout.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(logout.fulfilled, (state, action) => {
        if (state.status === 'pending') {
          state.status = 'idle';
          state.isAuthenticated = false;
          state.profile = profile;
        }
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = 'failed';
        state.isAuthenticated = false;
        state.profile = profile;
      })
      .addCase(getAllUsers.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        if (state.status === 'pending') {
          state.status = 'idle';
        }

        if (
          action.payload.hasOwnProperty('suceess') &&
          action.payload.sucess === true
        ) {
          state.users = action.payload.data;
        }
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.status = 'rejected';
      })
      .addCase(getUserById.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        if (state.status === 'pending') {
          state.status = 'idle';
        }
        if (
          action.payload.hasOwnProperty('success') &&
          action.payload.success === true
        ) {
          state.userRecord = action.payload.data;
        }
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.status = 'failed';
        state.userRecord = userRecord;
      })
      .addCase(changePassword.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        if (state.status === 'pending') {
          state.status = 'idle';
        }

        if (
          action.payload.hasOwnProperty('success') &&
          action.payload.success === true
        ) {
          state.userRecord = action.payload.data;
        }
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.status = 'failed';
      })
      .addCase(update.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(update.fulfilled, (state, action) => {
        if (state.status === 'pending') {
          state.status = 'idle';
        }
        if (
          action.payload.hasOwnProperty('success') &&
          action.payload.success === true
        ) {
          state.userRecord = action.payload.data;
          state.profile = action.payload.data.profile;
        }
      })
      .addCase(update.rejected, (state, action) => {
        state.status = 'failed';
      })
      .addCase(updateUserProfilePicture.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(updateUserProfilePicture.fulfilled, (state, action) => {
        if (state.status === 'pending') {
          state.status = 'idle';
        }
        if (
          action.payload.hasOwnProperty('success') &&
          action.payload.success === true
        ) {
          state.userRecord = action.payload.data;
          state.profile = action.payload.data.profile;
        }
      })
      .addCase(updateUserProfilePicture.rejected, (state, action) => {
        state.status = 'failed';
      });
  },
});

export const selectIsAuthenticated = (state: RootState) =>
  state.user.isAuthenticated;
export const selectUserProfile = (state: RootState) => state.user.profile;
export const selectUserStatus = (state: RootState) => state.user.status;
export const selectUserRole = (state: RootState) => state.user.userRoles;
export const selectAllUsers = (state: RootState) => state.user.users;
export const selectUserRecord = (state: RootState) => state.user.userRecord;

export default userSlice.reducer;
