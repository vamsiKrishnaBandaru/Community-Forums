import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Card,
  CardContent,
  Stack,
} from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';
import GroupIcon from '@mui/icons-material/Group';
import SecurityIcon from '@mui/icons-material/Security';

// SVG pattern background
const svgBackground = `
<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1"/>
    </pattern>
    <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
      <rect width="80" height="80" fill="url(#smallGrid)"/>
      <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(255, 255, 255, 0.2)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#grid)" />
</svg>
`;

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  
  // If user is already logged in, redirect to forums
  React.useEffect(() => {
    if (user) {
      navigate('/forums');
    }
  }, [user, navigate]);
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Hero Section */}
      <Box 
        sx={{ 
          bgcolor: 'primary.main', 
          color: 'white',
          py: 8,
          backgroundImage: `linear-gradient(135deg, #1976d2 0%, #0d47a1 100%)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url("data:image/svg+xml;charset=utf8,${encodeURIComponent(svgBackground)}")`,
            opacity: 0.4,
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
                Community Forums
              </Typography>
              <Typography variant="h5" paragraph sx={{ mb: 4 }}>
                Join our vibrant community to discuss ideas, share knowledge, and connect with like-minded individuals.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button 
                  variant="contained" 
                  size="large" 
                  color="secondary"
                  onClick={() => navigate('/login')}
                  sx={{ 
                    px: 4, 
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 'bold'
                  }}
                >
                  Sign In
                </Button>
                <Button 
                  variant="outlined" 
                  size="large"
                  onClick={() => navigate('/register')}
                  sx={{ 
                    px: 4, 
                    py: 1.5,
                    fontSize: '1.1rem',
                    color: 'white',
                    borderColor: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                >
                  Register
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={5}>
              <Paper 
                elevation={6}
                sx={{ 
                  p: 3, 
                  borderRadius: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  display: { xs: 'none', md: 'block' }
                }}
              >
                <Typography variant="h6" color="text.primary" gutterBottom>
                  What our community offers:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <ForumIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body1" color="text.secondary">
                    Engage in meaningful discussions
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <GroupIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body1" color="text.secondary">
                    Connect with experts and enthusiasts
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <SecurityIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body1" color="text.secondary">
                    Safe and moderated environment
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
          Why Join Our Community?
        </Typography>
        <Typography variant="h6" color="text.secondary" textAlign="center" paragraph sx={{ mb: 6 }}>
          Discover the benefits of being part of our growing network
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ 
                height: 140, 
                bgcolor: 'primary.light', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                <ForumIcon sx={{ fontSize: 60, color: 'white' }} />
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h3">
                  Diverse Topics
                </Typography>
                <Typography>
                  Explore a wide range of topics from technology and science to arts and culture.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ 
                height: 140, 
                bgcolor: 'secondary.light', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                <GroupIcon sx={{ fontSize: 60, color: 'white' }} />
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h3">
                  Supportive Community
                </Typography>
                <Typography>
                  Get help, share insights, and collaborate with a friendly and supportive community.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ 
                height: 140, 
                bgcolor: 'info.light', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                <SecurityIcon sx={{ fontSize: 60, color: 'white' }} />
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h3">
                  Continuous Learning
                </Typography>
                <Typography>
                  Expand your knowledge and skills through discussions with experts and peers.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      
      {/* Call to Action */}
      <Box sx={{ bgcolor: 'secondary.light', py: 6 }}>
        <Container maxWidth="md">
          <Typography variant="h4" align="center" color="text.primary" gutterBottom>
            Ready to join the conversation?
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" paragraph>
            Create an account today and become part of our growing community.
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              onClick={() => navigate('/register')}
              sx={{ mx: 1, px: 4 }}
            >
              Register Now
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage; 