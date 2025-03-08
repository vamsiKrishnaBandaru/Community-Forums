import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createForum, getForumById, updateForum, reset } from '../reducer';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  CircularProgress,
  Alert,
  Chip,
  InputAdornment,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const ForumForm = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tag: '',
    tags: []
  });
  const [formError, setFormError] = useState('');
  
  const { title, description, tag, tags } = formData;
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { currentForum, isLoading, isSuccess, isError, message } = useSelector(state => state.forumReducer);
  const { user } = useSelector(state => state.auth);
  
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    
    if (isEditMode) {
      dispatch(getForumById(id));
    }
    
    return () => {
      dispatch(reset());
    };
  }, [user, id, isEditMode, navigate, dispatch]);
  
  useEffect(() => {
    if (isEditMode && currentForum) {
      setFormData({
        title: currentForum.title || '',
        description: currentForum.description || '',
        tag: '',
        tags: currentForum.tags || []
      });
    }
  }, [isEditMode, currentForum]);
  
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };
  
  const handleAddTag = () => {
    if (tag.trim() && !tags.includes(tag.trim())) {
      setFormData((prevState) => ({
        ...prevState,
        tags: [...prevState.tags, tag.trim()],
        tag: ''
      }));
    }
  };
  
  const handleDeleteTag = (tagToDelete) => {
    setFormData((prevState) => ({
      ...prevState,
      tags: prevState.tags.filter(t => t !== tagToDelete)
    }));
  };
  
  const onSubmit = async (e) => {
    e.preventDefault();
    
    // Reset form error
    setFormError('');
    
    // Validate form
    if (!title.trim()) {
      setFormError('Title is required');
      return;
    }
    
    if (!description.trim()) {
      setFormError('Description is required');
      return;
    }
    
    const forumData = {
      title,
      description,
      tags
    };
    
    console.log('Submitting forum data:', forumData);
    
    try {
      if (isEditMode) {
        await dispatch(updateForum({ id, forumData })).unwrap();
      } else {
        await dispatch(createForum(forumData)).unwrap();
      }
      console.log('Form submission successful');
      navigate('/forums');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  
  if (isLoading && isEditMode) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {isEditMode ? 'Edit Forum' : 'Create New Forum'}
        </Typography>
        
        {formError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {formError}
          </Alert>
        )}
        
        {isError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}
        
        <Box component="form" onSubmit={onSubmit}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={title}
            onChange={onChange}
            margin="normal"
            required
            disabled={isLoading}
          />
          
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={description}
            onChange={onChange}
            margin="normal"
            multiline
            rows={4}
            required
            disabled={isLoading}
          />
          
          <TextField
            fullWidth
            label="Add Tags"
            name="tag"
            value={tag}
            onChange={onChange}
            margin="normal"
            disabled={isLoading}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton 
                    onClick={handleAddTag} 
                    edge="end"
                    disabled={isLoading}
                    color="primary"
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(25, 118, 210, 0.1)',
                      }
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddTag();
              }
            }}
          />
          
          <Box sx={{ mt: 1, mb: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                onDelete={() => handleDeleteTag(tag)}
                disabled={isLoading}
              />
            ))}
          </Box>
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 2 }}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <CircularProgress size={24} sx={{ mr: 1 }} />
                {isEditMode ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              isEditMode ? 'Update Forum' : 'Create Forum'
            )}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ForumForm; 