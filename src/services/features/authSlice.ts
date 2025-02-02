import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AuthState, FirebaseUser} from '../../lib/shared.interface';

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Set the user
    setUser: (state, action: PayloadAction<FirebaseUser>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    // Remove the user (on sign out)
    removeUser: state => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
    // Set the loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    // Set any error (on failure)
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {setUser, removeUser, setLoading, setError} = authSlice.actions;

export default authSlice.reducer;
