import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {INewsArticle} from '../../lib/shared.interface';

// Define the initial state structure
interface NewsState {
  articles: INewsArticle[];
  totalResults: number;
  status?: string;
}

const initialState: NewsState = {
  articles: [],
  totalResults: 0,
  status: '',
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setNews: (
      state,
      action: PayloadAction<{
        articles: INewsArticle[];
        totalResults: number;
        status?: string;
      }>,
    ) => {
      state.articles = action.payload.articles;
      state.totalResults = action.payload.totalResults;
      state.status = action.payload.status;
    },
  },
});

export const {setNews} = newsSlice.actions;

export default newsSlice.reducer;
