import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import supabase from '@/lib/supabase';

interface TodoState {
  user: UserData | null;
  input: string;
  deadline: string;
  darkMode: boolean;
  selectedTasks: number[];
  userEmail: string;
  loading: boolean;
  error: string | null;
}

interface UserData {
  userName: string;
  gender: string;
  email: string;
  tasks: string[];
  darkMode: boolean;
}

interface AddTaskPayload {
  email: string;
  task: string;
}

interface CompleteTasksPayload {
  email: string;
}

const initialState: TodoState = {
  user: null,
  input: '',
  deadline: '',
  darkMode: false,
  selectedTasks: [],
  userEmail: '',
  loading: false,
  error: null,
};

// Fetch user info from supabase
export const fetchUser = createAsyncThunk(
  'todo/fetchUser',
  async (email: string, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (error) throw error;
      return data as UserData;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// Add a task
export const addTask = createAsyncThunk(
  'todo/addTask',
  async ({ email, task }: AddTaskPayload, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { todo: TodoState };
      const currentTasks = state.todo.user?.tasks || [];
      const updatedTasks = [...currentTasks, task];

      const { error } = await supabase
        .from('users')
        .update({ tasks: updatedTasks })
        .eq('email', email);

      if (error) throw error;
      return updatedTasks;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// Complete selected tasks
export const completeTasks = createAsyncThunk(
  'todo/completeTasks',
  async ({ email }: CompleteTasksPayload, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { todo: TodoState };
      const { user, selectedTasks } = state.todo;
      if (!user) throw new Error('User not found');

      const updatedTasks = user.tasks.filter((_, i) => !selectedTasks.includes(i));

      const { error } = await supabase
        .from('users')
        .update({ tasks: updatedTasks })
        .eq('email', email);

      if (error) throw error;
      return updatedTasks;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setInput: (state, action: PayloadAction<string>) => {
      state.input = action.payload;
    },
    setDeadline: (state, action: PayloadAction<string>) => {
      state.deadline = action.payload;
    },
    setUserEmail: (state, action: PayloadAction<string>) => {
      state.userEmail = action.payload;
    },
    toggleTaskSelection: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      if (state.selectedTasks.includes(id)) {
        state.selectedTasks = state.selectedTasks.filter((taskId) => taskId !== id);
      } else {
        state.selectedTasks.push(id);
      }
    },
    setSelectedTasks: (state, action: PayloadAction<number[]>) => {
      state.selectedTasks = action.payload;
    },
	 toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;  // Toggle between true and false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        if (state.user) {
          state.user.tasks = action.payload;
        }
        state.input = '';
      })
      .addCase(addTask.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(completeTasks.fulfilled, (state, action) => {
        if (state.user) {
          state.user.tasks = action.payload;
        }
        state.selectedTasks = [];
      })
      .addCase(completeTasks.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const {
  setInput,
  setDeadline,
  setUserEmail,
  toggleTaskSelection,
  toggleDarkMode,
  setSelectedTasks,
} = todoSlice.actions;

export default todoSlice.reducer;

