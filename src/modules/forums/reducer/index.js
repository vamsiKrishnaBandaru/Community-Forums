import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import forumService from '../services/forumService';

const initialState = {
  forums: [],
  currentForum: {
    comments: [],
  },
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
  isCommentLoading: false,
};

// Get all forums
export const getForums = createAsyncThunk(
  'forums/getAll',
  async (_, thunkAPI) => {
    try {
      return await forumService.getForums();
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get forum by ID
export const getForumById = createAsyncThunk(
  'forums/getById',
  async (id, thunkAPI) => {
    try {
      return await forumService.getForumById(id);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create new forum
export const createForum = createAsyncThunk(
  'forums/create',
  async (forumData, thunkAPI) => {
    try {
      return await forumService.createForum(forumData);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update forum
export const updateForum = createAsyncThunk(
  'forums/update',
  async ({ id, forumData }, thunkAPI) => {
    try {
      return await forumService.updateForum(id, forumData);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete forum
export const deleteForum = createAsyncThunk(
  'forums/delete',
  async (id, thunkAPI) => {
    try {
      await forumService.deleteForum(id);
      return id;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Add comment to forum
export const addComment = createAsyncThunk(
  'forums/addComment',
  async ({ forumId, content }, thunkAPI) => {
    try {
      return await forumService.addComment(forumId, { content });
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get forum comments
export const getForumComments = createAsyncThunk(
  'forums/getComments',
  async (forumId, thunkAPI) => {
    try {
      return await forumService.getForumComments(forumId);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const forumSlice = createSlice({
  name: 'forums',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
      state.isCommentLoading = false;
    },
    clearCurrentForum: (state) => {
      state.currentForum = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getForums.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getForums.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.forums = action.payload;
      })
      .addCase(getForums.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getForumById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getForumById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentForum = action.payload;
      })
      .addCase(getForumById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createForum.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createForum.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.forums.push(action.payload);
      })
      .addCase(createForum.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateForum.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateForum.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentForum = action.payload;
        state.forums = state.forums.map((forum) =>
          forum.id === action.payload.id ? action.payload : forum
        );
      })
      .addCase(updateForum.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteForum.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteForum.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.forums = state.forums.filter((forum) => forum.id !== action.payload);
      })
      .addCase(deleteForum.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addComment.pending, (state) => {
        state.isCommentLoading = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.isCommentLoading = false;
        state.isSuccess = true;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.isCommentLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getForumComments.pending, (state) => {
        state.isCommentLoading = true;
      })
      .addCase(getForumComments.fulfilled, (state, action) => {
        state.isCommentLoading = false;
        state.isSuccess = true;
        if (state.currentForum) {
          state.currentForum.comments = action.payload;
        }
      })
      .addCase(getForumComments.rejected, (state, action) => {
        state.isCommentLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, clearCurrentForum } = forumSlice.actions;
export default forumSlice.reducer; 