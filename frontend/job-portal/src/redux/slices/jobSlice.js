import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/api';
import { logout } from './authSlice';

export const getSavedJobs = createAsyncThunk('jobs/getSaved', async (_, { rejectWithValue }) => {
    try { return (await API.get('/jobs/saved')).data; }
    catch (error) { return rejectWithValue(error.response?.data || { message: 'Could not load saved jobs' }); }
});
export const saveJob = createAsyncThunk('jobs/save', async (id, { rejectWithValue }) => {
    try { return (await API.put(`/jobs/${id}/save`)).data; }
    catch (error) { return rejectWithValue(error.response?.data || { message: 'Could not save job' }); }
});
export const unsaveJob = createAsyncThunk('jobs/unsave', async (id, { rejectWithValue }) => {
    try { await API.delete(`/jobs/${id}/save`); return id; }
    catch (error) { return rejectWithValue(error.response?.data || { message: 'Could not remove saved job' }); }
});
export const getRecruiterStats = createAsyncThunk('jobs/stats', async (_, { rejectWithValue }) => {
    try { return (await API.get('/jobs/stats')).data; }
    catch (error) { return rejectWithValue(error.response?.data || { message: 'Could not load dashboard counts' }); }
});

// Create Job
export const createJob = createAsyncThunk('jobs/create', async (jobData, { rejectWithValue }) => {
    try {
        const { data } = await API.post('/jobs', jobData);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Get All Jobs
export const getJobs = createAsyncThunk('jobs/getAll', async (_, { rejectWithValue }) => {
    try {
        const { data } = await API.get('/jobs');
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Get My Jobs (Recruiter)
export const getMyJobs = createAsyncThunk('jobs/getMyJobs', async (_, { rejectWithValue }) => {
    try {
        const { data } = await API.get('/jobs/myjobs');
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Get Recommended Jobs
export const getRecommendedJobs = createAsyncThunk('jobs/getRecommended', async (_, { rejectWithValue }) => {
    try {
        const { data } = await API.get('/jobs/recommended');
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Get Single Job
export const getJobById = createAsyncThunk('jobs/getById', async (id, { rejectWithValue }) => {
    try {
        const { data } = await API.get(`/jobs/${id}`);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Delete Job
export const deleteJob = createAsyncThunk('jobs/delete', async (id, { rejectWithValue }) => {
    try {
        await API.delete(`/jobs/${id}`);
        return id;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const initialState = {
    jobs: [],
    myJobs: [],
    savedJobs: [],
    savedLoading: false,
    recruiterStats: null,
    job: null,
    loading: false,
    error: null,
    success: false
};

const jobSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        resetJobState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(logout, state => { state.savedJobs = []; })
            .addCase(getRecruiterStats.fulfilled, (state, action) => { state.recruiterStats = action.payload; })
            .addCase(getSavedJobs.pending, state => { state.savedLoading = true; })
            .addCase(getSavedJobs.fulfilled, (state, action) => { state.savedLoading = false; state.savedJobs = action.payload; })
            .addCase(getSavedJobs.rejected, (state, action) => { state.savedLoading = false; state.error = action.payload?.message; })
            .addCase(saveJob.fulfilled, (state, action) => {
                if (!state.savedJobs.some(job => job._id === action.payload._id)) state.savedJobs.push(action.payload);
            })
            .addCase(unsaveJob.fulfilled, (state, action) => {
                state.savedJobs = state.savedJobs.filter(job => job._id !== action.payload);
            })
            // Create Job
            .addCase(createJob.pending, (state) => {
                state.loading = true;
            })
            .addCase(createJob.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.myJobs.push(action.payload);
            })
            .addCase(createJob.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })
            // Get All Jobs
            .addCase(getJobs.pending, (state) => {
                state.loading = true;
            })
            .addCase(getJobs.fulfilled, (state, action) => {
                state.loading = false;
                state.jobs = action.payload;
            })
            .addCase(getJobs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })
            // Get My Jobs
            .addCase(getMyJobs.pending, (state) => {
                state.loading = true;
            })
            .addCase(getMyJobs.fulfilled, (state, action) => {
                state.loading = false;
                state.myJobs = action.payload;
            })
            .addCase(getMyJobs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })
            // Get Recommended Jobs
            .addCase(getRecommendedJobs.pending, (state) => {
                state.loading = true;
            })
            .addCase(getRecommendedJobs.fulfilled, (state, action) => {
                state.loading = false;
                state.jobs = action.payload; // Replace list with recommended ones
            })
            .addCase(getRecommendedJobs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })
            // Get Single Job
            .addCase(getJobById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getJobById.fulfilled, (state, action) => {
                state.loading = false;
                state.job = action.payload;
            })
            .addCase(getJobById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })
            // Delete Job
            .addCase(deleteJob.fulfilled, (state, action) => {
                state.loading = false;
                state.myJobs = state.myJobs.filter((job) => job._id !== action.payload);
            });
    },
});

export const { resetJobState } = jobSlice.actions;
export default jobSlice.reducer;
