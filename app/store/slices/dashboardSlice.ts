import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import supabase from '@/lib/supabase';

// Fetch user data from supabase
export const fetchUserData = createAsyncThunk(
  'dashboard/fetchUserData',
  async (email: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('userName, darkMode')
      .eq('email', email)
      .single();

    if (error) throw new Error(error.message);
    return data;
  }
);

// Dashboard state interface
interface DashboardState {
  userName: string;
  darkMode: boolean;
}

const initialState: DashboardState = {
  userName: '',
  darkMode: false,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.userName = action.payload.userName;
      state.darkMode = action.payload.darkMode;
    });
  },
});

export const { toggleDarkMode, setUserName } = dashboardSlice.actions;
export default dashboardSlice.reducer;

