import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getForums } from '../reducer/index';
import { Container, Typography, Grid, Box, CircularProgress, Alert } from '@mui/material';
import ForumCard from './ForumCard';

const ForumList = () => {
  const dispatch = useDispatch();
  const { forums, isLoading, isError, message } = useSelector(state => state.forumReducer);

  useEffect(() => {
    dispatch(getForums());
  }, [dispatch]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Community Forums
      </Typography>
      
      {isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}
      
      {forums.length === 0 ? (
        <Typography variant="body1">No forums available yet.</Typography>
      ) : (
        <Grid container spacing={3}>
          {forums.map(forum => (
            <Grid item xs={12} sm={6} md={4} key={forum.id}>
              <ForumCard forum={forum} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ForumList;