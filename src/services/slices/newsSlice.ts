import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Define the initial state structure
interface NewsState {
  articles: any[]; // The news articles
}

const initialState: NewsState = {
  articles: [],
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setNews: (state, action: PayloadAction<any[]>) => {
      state.articles = action.payload;
    },
  },
});

export const {setNews} = newsSlice.actions;

export default newsSlice.reducer;
