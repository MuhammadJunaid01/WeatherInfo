import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {INewsArticle} from '../../lib/shared.interface';

// Define the initial state structure
interface NewsState {
  articles: INewsArticle[]; // The news articles
}

const initialState: NewsState = {
  articles: [],
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setNews: (state, action: PayloadAction<INewsArticle[]>) => {
      state.articles = action.payload;
    },
  },
});

export const {setNews} = newsSlice.actions;

export default newsSlice.reducer;
