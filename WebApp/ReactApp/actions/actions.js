export const ADD_BLOG = 'ADD_BLOG';
export const EDIT_BLOG = 'EDIT_BLOG';
export const DELETE_BLOG = 'DELETE_BLOG';
export const ADD_CHAT = 'ADD_CHAT';
export const EDIT_MODE = 'EDIT_MODE';
export const SIDE_NAV = 'SIDE_NAV';
export const FETCH_BLOGS = 'FETCH_BLOGS';
export const ADD_BLOG_ONCE = 'ADD_BLOG_ONCE';

let id = 2;
export function addBlog(author, title, content) {
  return {
    type: ADD_BLOG,
    author,
    title,
    content,
    id: id++,
  };
}

export function addBlogOnce(author, title, content, id) {
  return {
    type: ADD_BLOG_ONCE,
    author,
    title,
    content,
    id,
  };
}

export function addChat(text) {
  return {
    type: ADD_CHAT,
    text,
  };
}

export function editBlog(author, title, content, id) {
  return {
    type: EDIT_BLOG,
    author,
    title,
    content,
    id,
  };
}

export function toggleEditMode(edit) {
  return {
    type: EDIT_MODE,
    edit,
  };
} 

export function toggleSideNav(sideNav) {
  return {
    type: SIDE_NAV,
    sideNav,
  };
}

export function deleteBlog(id) {
  return {
    type: DELETE_BLOG,
    id,
  };
}

export function fetchBlogs(getBlogs) {
  return {
    type: FETCH_BLOGS,
    getBlogs,
  };
}
