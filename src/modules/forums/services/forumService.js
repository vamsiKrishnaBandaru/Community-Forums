import axiosInstance from '../../../constants/apiConstants';
import { API_ENDPOINTS } from '../../../constants/apiConstants';

// Get all forums
const getForums = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.FORUMS.BASE);
  return response.data;
};

// Get forum by ID
const getForumById = async (id) => {
  const response = await axiosInstance.get(API_ENDPOINTS.FORUMS.DETAIL(id));
  return response.data;
};

// Create new forum
const createForum = async (forumData) => {
  const response = await axiosInstance.post(API_ENDPOINTS.FORUMS.BASE, forumData);
  return response.data;
};

// Update forum
const updateForum = async (id, forumData) => {
  const response = await axiosInstance.put(API_ENDPOINTS.FORUMS.DETAIL(id), forumData);
  return response.data;
};

// Delete forum
const deleteForum = async (id) => {
  const response = await axiosInstance.delete(API_ENDPOINTS.FORUMS.DETAIL(id));
  return response.data;
};

// Add comment to forum
const addComment = async (forumId, commentData) => {
  const response = await axiosInstance.post(API_ENDPOINTS.COMMENTS.BASE(forumId), commentData);
  return response.data;
};

// Get forum comments
const getForumComments = async (forumId) => {
  const response = await axiosInstance.get(API_ENDPOINTS.COMMENTS.BASE(forumId));
  return response.data;
};

const forumService = {
  getForums,
  getForumById,
  createForum,
  updateForum,
  deleteForum,
  addComment,
  getForumComments,
};

export default forumService; 