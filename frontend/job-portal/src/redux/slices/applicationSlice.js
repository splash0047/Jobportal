import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/api';

// Apply for Job
export const applyForJob = createAsyncThunk('applications/apply', async ({ jobId, resumeURL }, { rejectWithValue }) => {
    try {
        const { data } = await API.post('/applications', { jobId, resumeURL });
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Get My Applications (Candidate)
export const getMyApplications = createAsyncThunk('applications/getMy', async (_, { rejectWithValue }) => {
    try {
        const { data } = await API.get('/applications/my');
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Get Job Applications (Recruiter)
export const getJobApplications = createAsyncThunk('applications/getByJob', async (jobId, { rejectWithValue }) => {
    try {
        const { data } = await API.get(`/applications/job/${jobId}`);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Update Application Status
export const updateApplicationStatus = createAsyncThunk('applications/updateStatus', async ({ id, status }, { rejectWithValue }) => {
    try {
        const { data } = await API.put(`/applications/${id}/status`, { status });
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const initialState = {
    myApplications: [],
    jobApplications: [],
    loading: false,
    error: null,
    success: false
};

const applicationSlice = createSlice({
    name: 'applications',
    initialState,
    reducers: {
        resetApplicationState: (state) => {
            state.success = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Apply
            .addCase(applyForJob.pending, (state) => {
                state.loading = true;
            })
            .addCase(applyForJob.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.myApplications.push(action.payload);
            })
            .addCase(applyForJob.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })
            // Get My Applications
            .addCase(getMyApplications.fulfilled, (state, action) => {
                state.loading = false;
                state.myApplications = action.payload;
            })
            // Get Job Applications
            .addCase(getJobApplications.pending, (state) => {
                state.loading = true;
            })
            .addCase(getJobApplications.fulfilled, (state, action) => {
                state.loading = false;
                state.jobApplications = action.payload;
            })
            // Update Status
            .addCase(updateApplicationStatus.fulfilled, (state, action) => {
                state.loading = false;
                // Update in jobApplications list
                const index = state.jobApplications.findIndex(app => app._id === action.payload._id);
                if (index !== -1) {
                    state.jobApplications[index] = action.payload;
                }
            });
    },
});

export const { resetApplicationState } = applicationSlice.actions;
export default applicationSlice.reducer;
