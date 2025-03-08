import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  CardActions,
  Button,
  IconButton,
  Tooltip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { formatDate } from '../../../utils/helpers';

const ForumCard = ({ forum }) => {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  
  const handleViewDiscussion = () => {
    navigate(`/forums/${forum.id}`);
  };
  
  const handleEditForum = (e) => {
    e.stopPropagation(); // Prevent triggering the card click
    navigate(`/forums/edit/${forum.id}`);
  };
  
  // Check if the current user is the author of the forum
  const isAuthor = user && forum.userId === user.id;
  
  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        position: 'relative',
        cursor: 'pointer',
        '&:hover': {
          boxShadow: 6
        }
      }}
      onClick={handleViewDiscussion}
    >
      {/* Edit button - only visible to the author */}
      {isAuthor && (
        <Tooltip title="Edit forum">
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              zIndex: 1,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <IconButton
              size="small"
              color="primary"
              onClick={handleEditForum}
              sx={{
                width: 28,
                height: 28,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.1)',
                }
              }}
              aria-label="edit forum"
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Box>
        </Tooltip>
      )}
      
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          {forum.title}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Created by {forum.author || 'Anonymous'} • {formatDate(forum.createdAt)}
        </Typography>
        
        <Typography variant="body1" paragraph>
          {forum.description.length > 150 
            ? `${forum.description.substring(0, 150)}...` 
            : forum.description}
        </Typography>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 2 }}>
          {forum.tags && forum.tags.map((tag, index) => (
            <Chip key={index} label={tag} size="small" />
          ))}
        </Box>
      </CardContent>
      
      <CardActions>
        <Button size="small" color="primary" onClick={handleViewDiscussion}>
          View Discussion
        </Button>
      </CardActions>
    </Card>
  );
};

export default ForumCard; 