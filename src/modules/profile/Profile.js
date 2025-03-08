import React from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  Paper,
  Typography,
  Box,
  Avatar,
  Divider,
  Grid
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const Profile = () => {
  const { user } = useSelector(state => state.auth);
  
  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, options);
    } catch (error) {
      return dateString;
    }
  };
  
  if (!user) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h5">
            Please log in to view your profile
          </Typography>
        </Paper>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Avatar
            sx={{
              width: 100,
              height: 100,
              bgcolor: 'primary.main',
              fontSize: '2.5rem',
              mr: 3
            }}
          >
            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </Avatar>
          <Box>
            <Typography variant="h4" gutterBottom>
              {user.name || 'User'}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Member since {formatDate(user.createdAt)}
            </Typography>
          </Box>
        </Box>
        
        <Divider sx={{ my: 3 }} />
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PersonIcon color="primary" sx={{ mr: 2, fontSize: 28 }} />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Username
                </Typography>
                <Typography variant="body1">
                  {user.username || user.name || 'N/A'}
                </Typography>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <EmailIcon color="primary" sx={{ mr: 2, fontSize: 28 }} />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Email
                </Typography>
                <Typography variant="body1">
                  {user.email || 'N/A'}
                </Typography>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CalendarTodayIcon color="primary" sx={{ mr: 2, fontSize: 28 }} />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Joined
                </Typography>
                <Typography variant="body1">
                  {formatDate(user.createdAt)}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Profile; 