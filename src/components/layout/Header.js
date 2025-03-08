import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset as authReset } from '../../modules/auth/reducer';
import { reset as forumReset } from '../../modules/forums/reducer';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Avatar,
  Divider
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileAnchorEl, setMobileAnchorEl] = useState(null);
  
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCreateForum = () => {
    navigate('/forums/new');
  };
  
  const handleMobileMenu = (event) => {
    setMobileAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
    setMobileAnchorEl(null);
  };
  
  const handleLogout = () => {
    // Close menus first
    handleClose();
    
    // Perform logout actions
    dispatch(logout());
    dispatch(authReset());
    dispatch(forumReset());
    
    // Force navigation to home page
    setTimeout(() => {
      navigate('/', { replace: true });
    }, 0);
  };
  
  // Handle home navigation based on authentication status
  const handleHomeClick = () => {
    if (user) {
      // If user is logged in, go to forums page
      navigate('/forums');
    } else {
      // If user is not logged in, go to landing page
      navigate('/');
    }
  };
  
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={handleHomeClick}
          sx={{ mr: 2 }}
        >
          <HomeIcon />
        </IconButton>
        
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={handleHomeClick}
        >
          Community App
        </Typography>
        
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          
          {user ? (
            <>
              <Button 
                color="inherit" 
                variant="outlined"
                onClick={handleCreateForum}
                sx={{ mr: 2 }}
              >
                Create Forum
              </Button>
              <IconButton
                size="large"
                onClick={handleMenu}
                color="inherit"
              >
                {user.avatar ? (
                  <Avatar src={user.avatar} sx={{ width: 32, height: 32 }} />
                ) : (
                  <AccountCircleIcon />
                )}
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => { handleClose(); navigate('/profile'); }}>
                  Profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button color="inherit" onClick={() => navigate('/register')}>
                Register
              </Button>
            </>
          )}
        </Box>
        
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            onClick={handleMobileMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-mobile"
            anchorEl={mobileAnchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(mobileAnchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => { handleClose(); navigate('/forums'); }}>
              Forums
            </MenuItem>
            
            {user ? (
              <>
                <MenuItem onClick={() => { handleClose(); navigate('/profile'); }}>
                  Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  Logout
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem onClick={() => { handleClose(); navigate('/login'); }}>
                  Login
                </MenuItem>
                <MenuItem onClick={() => { handleClose(); navigate('/register'); }}>
                  Register
                </MenuItem>
              </>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 