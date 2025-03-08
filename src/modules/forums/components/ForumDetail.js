import React, { useState, useEffect, use } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getForumById, deleteForum, clearCurrentForum, addComment, getForumComments, reset } from '../reducer';
import { 
  Container, 
  Typography, 
  Paper, 
  Box, 
  Button, 
  Chip, 
  Divider, 
  CircularProgress, 
  Alert,
  TextField,
  Avatar,
  List,
  ListItem
} from '@mui/material';

const ForumDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [comment, setComment] = useState('');
  
  const { currentForum, isLoading, isError, message, isCommentLoading } = useSelector(state => state.forumReducer);
  const { user } = useSelector(state => state.auth);
  
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  // Initial load of forum details and comments
  useEffect(() => {
    dispatch(getForumById(id));
    dispatch(getForumComments(id));
    
    return () => {
      dispatch(clearCurrentForum());
    };
  }, [dispatch, id]);
  
  const handleEdit = () => {
    navigate(`/forums/edit/${id}`);
  };
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this forum?')) {
      dispatch(deleteForum(id));
      navigate('/forums');
    }
  };
  
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    
    if (!comment.trim()) {
      return;
    }
        
    // Submit the comment
    await dispatch(addComment({
      forumId: id,
      content: comment
    })).unwrap();
    dispatch(getForumComments(id));
    setComment('');
  };
  
  if (isLoading || !currentForum) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (isError) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">{message}</Alert>
      </Container>
    );
  }
  
  const isOwner = user && currentForum.creator && user.id === currentForum.creator.id;
  
  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    };
    
    return new Date(dateString).toLocaleString('en-US', options);
  };
  
  const comments = currentForum.comments || [];
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {currentForum.title}
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Created by {currentForum.creator?.name || 'Unknown'} • {formatDate(currentForum.createdAt)}
          </Typography>
          
          {isOwner && (
            <Box>
              <Button 
                variant="outlined" 
                size="small" 
                onClick={handleEdit}
                sx={{ mr: 1 }}
              >
                Edit
              </Button>
              <Button 
                variant="outlined" 
                color="error" 
                size="small" 
                onClick={handleDelete}
              >
                Delete
              </Button>
            </Box>
          )}
        </Box>
        
        {currentForum.tags && currentForum.tags.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
            {currentForum.tags.map((tag, index) => (
              <Chip key={index} label={tag} size="small" />
            ))}
          </Box>
        )}
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="body1" paragraph>
          {currentForum.description}
        </Typography>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="h6" gutterBottom>
          Comments
        </Typography>
        
        {user ? (
          <Box component="form" onSubmit={handleCommentSubmit} sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Write a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              multiline
              rows={3}
              margin="normal"
              placeholder="Share your thoughts or ask a question..."
              disabled={isCommentLoading}
            />
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              disabled={!comment.trim() || isCommentLoading}
              sx={{ mt: 1 }}
            >
              {isCommentLoading ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1 }} color="inherit" />
                  Posting...
                </>
              ) : (
                'Post Comment'
              )}
            </Button>
          </Box>
        ) : (
          <Alert severity="info" sx={{ mb: 3 }}>
            Please <Button size="small" onClick={() => navigate('/login')}>login</Button> to comment
          </Alert>
        )}
        
        <Box sx={{ maxHeight: '400px', overflow: 'auto', p: 1 }}>
          {isCommentLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress size={30} />
            </Box>
          ) : comments && comments.length > 0 ? (
            <List>
              {comments.map((comment, index) => (
                <ListItem key={comment.id || index} sx={{ display: 'block', mb: 2, p: 0 }}>
                  <Paper sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                        {comment.author?.name?.charAt(0).toUpperCase() || 'U'}
                      </Avatar>
                      <Box sx={{ width: '100%' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {comment.author?.name || 'Unknown User'}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {formatDate(comment.createdAt)}
                          </Typography>
                        </Box>
                        <Typography variant="body1" sx={{ mt: 1, whiteSpace: 'pre-wrap' }}>
                          {comment.content}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', textAlign: 'center', py: 4 }}>
              No comments yet. Be the first to comment!
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default ForumDetail;
