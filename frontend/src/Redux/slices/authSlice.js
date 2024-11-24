import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserServices } from '../Common/UserServices';

// Async Thunks
export const signin = createAsyncThunk('auth/signin', async (formData, { rejectWithValue }) => {
  try {
    console.log(formData)
    const { data } = await UserServices.signIn(formData);
    return data.user;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const signUp = createAsyncThunk('auth/signUp', async (formData, { rejectWithValue }) => {
  try {
    const { data } = await UserServices.signUp(formData);
    return data.user;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const loadUser = createAsyncThunk('auth/loadUser', async (_, { rejectWithValue }) => {
  try {
    const { data } = await UserServices.userDetails();
    return data.user;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await UserServices.logOut();
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signin.pending, (state) => {
        state.loading = true;
      })
      .addCase(signin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = payload;
      })
      .addCase(signin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.isAuthenticated = false;
      })
      .addCase(signUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUp.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = payload;
      })
      .addCase(signUp.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = payload;
      })
      .addCase(loadUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = payload;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { clearErrors } = authSlice.actions;
export const authReducers =  authSlice.reducer;
