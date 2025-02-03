import {createSlice} from '@reduxjs/toolkit';
import {INewsSource} from '../../lib';

interface SourcesState {
  sources: INewsSource[];
  status: string;
}

const initialState: SourcesState = {
  sources: [],
  status: 'idle',
};

const newsSourcesSlice = createSlice({
  name: 'sources',
  initialState,
  reducers: {
    setSources(state, action) {
      state.sources = action.payload.sources;
      state.status = action.payload.status;
    },
  },
});

export const {setSources} = newsSourcesSlice.actions;
export default newsSourcesSlice.reducer;
