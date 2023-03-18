import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import {
  SigninParams,
  KeychainCredentials,
  Country,
  SignUpParams,
} from '@services/types';
import { AuthService } from '@services';

interface AuthState {
  token: string;
  isSignedOut: boolean;
  user: any;
}

const initialState: AuthState = {
  token: '',
  isSignedOut: true,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    restore: (state, action: PayloadAction<KeychainCredentials>) => {
      const { token: token, user } = action?.payload;
      state.token = token;
      state.isSignedOut = false;
      state.user = user ? user : null;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action?.payload;
    },
    setUser: (state, action: PayloadAction<object>) => {
      state.user = action?.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(
      signin.fulfilled,
      (state, action: PayloadAction<KeychainCredentials>) => {
        state.isSignedOut = false;
        state.token = action?.payload?.token;
        state.user = action?.payload?.user;
      },
    );
    builder.addCase(
      register.fulfilled,
      (state, action: PayloadAction<KeychainCredentials>) => {
        state.isSignedOut = false;
        state.token = action?.payload?.token;
        state.user = action?.payload?.user;
      },
    );
    builder.addCase(signout.fulfilled, () => {
      return initialState;
    });
  },
});

export const { setToken, restore, setUser } = authSlice.actions;

export const signin = createAsyncThunk(
  'user/signin',
  async (credentials: SigninParams, { rejectWithValue }) => {
    return AuthService.signin(credentials).catch(error => {
      return rejectWithValue(
        error?.response?.data || error || 'Unexpected error',
      );
    });
  },
);

export const register = createAsyncThunk(
  'user/register',
  async (credentials: SignUpParams, { rejectWithValue }) => {
    return AuthService.registerUser(credentials).catch(error => {
      return rejectWithValue(
        error?.response?.data || error || 'Unexpected error',
      );
    });
  },
);
export const signout = createAsyncThunk('user/signout', async () => {
  AuthService.signout().catch(_ => {
    __DEV__ && console.log('Unable to logout on server');
  });
});

export default authSlice.reducer;
