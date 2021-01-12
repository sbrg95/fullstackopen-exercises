import blogService from '../services/blogs';
import { setNotification } from './notificationReducer';

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_BLOG':
      return [...state, action.data];
    case 'INIT_BLOGS':
      return action.data;
    case 'LIKE_BLOG':
    case 'ADD_COMMENT':
      return state.map((blog) =>
        blog.id !== action.data.id ? blog : action.data.blog
      );
    case 'REMOVE_BLOG':
      return state.filter((blog) => blog.id !== action.data.id);
    default:
      return state;
  }
};

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      const createdBlog = await blogService.create(blogObject);
      dispatch(
        setNotification(
          `a new blog ${createdBlog.title} by ${createdBlog.author} added`,
          'success'
        )
      );
      dispatch({
        type: 'NEW_BLOG',
        data: createdBlog,
      });
    } catch (error) {
      dispatch(
        setNotification('An error occured while creating this blog!', 'error')
      );
    }
  };
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    });
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.remove(id);
      dispatch(setNotification('Blog removed successfully', 'success', 2));
      dispatch({
        type: 'REMOVE_BLOG',
        data: { id },
      });
    } catch (error) {
      dispatch(
        setNotification('An error occured while removing this blog!', 'error')
      );
    }
  };
};

export const likeBlog = (id) => {
  return async (dispatch) => {
    const oldBlog = await blogService.getOne(id);
    const newBlog = { ...oldBlog, likes: oldBlog.likes + 1 };
    const updatedBlog = await blogService.update(id, newBlog);
    dispatch({
      type: 'LIKE_BLOG',
      data: { id, blog: updatedBlog },
    });
  };
};

export const addComment = (id, comment) => {
  return async (dispatch) => {
    const blog = await blogService.comment(id, comment);
    dispatch({
      type: 'ADD_COMMENT',
      data: { id, blog },
    });
  };
};

export default blogReducer;
