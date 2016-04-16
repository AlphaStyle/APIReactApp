import React from 'react';
import { connect } from 'react-redux';
import BlogCreate from './BlogCreate';
import BlogList from './BlogList';
import { addBlogOnce } from '../actions/actions';

import polyfill from 'es6-promise';
import 'isomorphic-fetch';


let BlogApp = ({ dispatch, getBlogs }) => {
  
  let handleFetchBlogs = () => {
    fetch("/api/GetBlogs/")
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then(function(json) {
      console.log(json);
      dispatch(addBlogOnce(json.Author, json.Title, json.Content, json.ID));
    });
  };
  
  if (getBlogs) {handleFetchBlogs();}
  
  return (
    <div>
      <BlogCreate />
      <BlogList/>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    getBlogs: state.fetchBlogs,
  };
}

BlogApp = connect(mapStateToProps)(BlogApp);

export default BlogApp; 