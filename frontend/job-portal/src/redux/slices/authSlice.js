import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/api';

// Async Thunks
export const hydrateUser = createAsyncThunk('auth/hydrate', async (_, { rejectWithValue }) => {
    try {
        const { data } = await API.get('/auth/me');
        return data;
    } catch (error) { return rejectWithValue(error.response?.data || { message: 'Session expired' }); }
});
export const login = createAsyncThunk('auth/login', async (userData, { rejectWithValue }) => {
    try {
        const { data } = await API.post('/auth/login', userData);
        localStorage.setItem('token', data.token);
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Network error' });
    }
});

export const register = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
    try {
        const { data } = await API.post('/auth/register', userData);
        localStorage.setItem('token', data.token);
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Network error' });
    }
});

export const uploadResume = createAsyncThunk('auth/uploadResume', async (resumeFile, { rejectWithValue }) => {
    try {
        const formData = new FormData();
        formData.append('resume', resumeFile);

        const { data } = await API.post('/resume/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Network error' });
    }
});

const initialState = {
    user: null,
    token: localStorage.getItem('token'),
    loading: false,
    hydrating: Boolean(localStorage.getItem('token')),
    error: null,
    resumeSuccess: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('token');
            state.user = null;
            state.token = null;
        },
        resetResumeSuccess: (state) => {
            state.resumeSuccess = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(hydrateUser.fulfilled, (state, action) => {
                state.hydrating = false;
                if (!state.user) state.user = { ...action.payload, token: state.token };
            })
            .addCase(hydrateUser.rejected, (state) => {
                if (state.user) { state.hydrating = false; return; }
                localStorage.removeItem('token');
                state.token = null;
                state.user = null;
                state.hydrating = false;
            })
            // Login
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.hydrating = false;
                state.user = action.payload;
                state.token = action.payload.token;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Login failed';
            })
            // Register
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.hydrating = false;
                state.user = action.payload;
                state.token = action.payload.token;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Registration failed';
            })
            // Upload Resume
            .addCase(uploadResume.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.resumeSuccess = false;
            })
            .addCase(uploadResume.fulfilled, (state, action) => {
                state.loading = false;
                state.resumeSuccess = true;
                // Update user profile with new skills and resume URL
                if (state.user) {
                    state.user.resumeURL = action.payload.resumeURL;
                    state.user.profile = action.payload.profile;
                }
            })
            .addCase(uploadResume.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Resume upload failed';
            });
    },
});

export const { logout, resetResumeSuccess } = authSlice.actions;
export default authSlice.reducer;
