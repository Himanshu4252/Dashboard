import { configureStore } from '@reduxjs/toolkit';
import { weatherReducer } from './slices/weatherSlice';
import { newsReducer } from './slices/newsSlice';
import dashboardReducer from './slices/dashboardSlice';
import todoReducer from './slices/todoSlice'

export const store = configureStore({
	reducer:{
		weather : weatherReducer,
		news: newsReducer,
		todo: todoReducer,
		dashboard: dashboardReducer,
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
