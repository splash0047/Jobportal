import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/api';

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
