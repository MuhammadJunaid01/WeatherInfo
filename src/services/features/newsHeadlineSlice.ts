import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IGenericNewsResponse, INewsArticle} from '../../lib/shared.interface';

interface IHeadlineState {
  articles: INewsArticle[];
  totalResults: number;
  status: string;
}

const initialState: IHeadlineState = {
  articles: [],
  totalResults: 0,
  status: 'idle', // initial status (you can adjust it as per your app's logic)
};

const headlineSlice = createSlice({
  name: 'headline',
  initialState,
  reducers: {
    // Action to set headline data
    setHeadline: (
      state,
      action: PayloadAction<IGenericNewsResponse<INewsArticle[]>>,
    ) => {
      state.articles = action.payload.articles;
      state.totalResults = action.payload.totalResults;
      state.status = action.payload.status ?? 'idle';
    },
  },
});

export const {setHeadline} = headlineSlice.actions;

export default headlineSlice.reducer;
