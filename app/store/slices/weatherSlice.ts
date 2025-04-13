import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface DataPoint{
	name : string;
	Temprature: number;
	amt: number;
}

interface CurrentData{
	sunrise: string;
	sunset: string;
	description: string;
	temp: number;

}

interface weatherState{
	tempData: DataPoint[];
	currentDay:CurrentData;
	loading: boolean;
	error: string | null;
}

const initialState: weatherState = {
	tempData: [],
	currentDay:{
		sunrise:'',
		sunset:'',
		description:'',
		temp:0,
	},
	loading: false,
	error: null,
};

export const fetchWeather = createAsyncThunk(
	'weather/fetchWeather',
	async()=>{
		const response = await fetch( process.env.NEXT_PUBLIC_WEATHER_API || ' ');
		if(!response.ok){
			throw new Error('failed to fetch weather data');

		}
		const result = await response.json();

		const currentDay:CurrentData = {
			sunrise: result.days[0].sunrise,
			sunset: result.days[0].sunset,
			description: result.days[0].description,
			temp: parseFloat(((result.days[0].temp - 32) * (5/9)).toFixed(1)),
		};
		const tempData: DataPoint[] = result.days[0].hours.map((hour:any) =>({
			name : hour.datetime,
			Temprature: (hour.temp -32 ) * (5/9),
		}));
		return { currentDay, tempData };
	}
);

const weatherSlice = createSlice({
	name : 'weather',
	initialState,
	reducers: {},
	extraReducers: (builder) =>{
		builder
		.addCase(fetchWeather.pending, (state) =>{
				state.loading = true;
				state.error = null;
			})
		.addCase(fetchWeather.fulfilled, (state, action )=>{
				state.loading = false;
				state.currentDay = action.payload.currentDay;
				state.tempData = action.payload.tempData;	
			})
		.addCase(fetchWeather.rejected, (state, action )=>{
				state.loading = false;
				state.error = action.error.message || 'failed to fetch weather data! ';
			});
	},

});
export const weatherReducer = weatherSlice.reducer;

