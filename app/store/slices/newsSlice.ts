import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Article{
	title: "string";
	description: "string";
	url: "string";
}

interface NewsState{
	news: Article[];
	loading:boolean;
	error: string | null;
}

const initialState:NewsState = {
	news:[],
	loading: false,
	error: null,
}

export const fetchNews = createAsyncThunk('news/fetchNews', async()=> {
	const API_URL = process.env.NEXT_PUBLIC_NEWS_API;
	if(!API_URL)throw new Error('API URL is not defined.');

	const response = await fetch(API_URL);
	const result = await response.json();
	return result.articles || [];
});

const newsSlice = createSlice({
	name: 'news',
	initialState,
	reducers:{},
	extraReducers: (builder) =>{
		builder.addCase(fetchNews.pending, (state) =>{
			state.loading = true;
			state.error = null;
		})
		.addCase(fetchNews.fulfilled, (state, action) =>{
				state.loading = false;
				state.news = action.payload;
			})
		.addCase(fetchNews.rejected, (state, action) =>{
				state.loading =false;
				state.error = action.error.message || "failed to fetch news";
			});
	},
});

export const newsReducer = newsSlice.reducer;
