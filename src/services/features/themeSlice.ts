import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Theme} from '../../lib/types';

interface ThemeState {
  theme: Theme;
  activeTheme: Theme | null;
}

const initialState: ThemeState = {
  theme: 'system',
  activeTheme: null,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (
      state,
      action: PayloadAction<{theme: Theme; activeTheme: Theme}>,
    ) => {
      state.theme = action.payload.theme;
      state.activeTheme = action.payload.activeTheme;
    },
  },
});

export const {setTheme} = themeSlice.actions;
export default themeSlice.reducer;
