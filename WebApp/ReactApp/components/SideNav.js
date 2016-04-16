import React from 'react';
import { connect } from 'react-redux';
import { toggleSideNav, addBlogOnce } from '../actions/actions';
import FlatButton from 'material-ui/lib/flat-button';
import LeftNav from 'material-ui/lib/left-nav';
import AppBar from 'material-ui/lib/app-bar';
import MenuItem from 'material-ui/lib/menus/menu-item';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import IconButton from 'material-ui/lib/icon-button';
import { Router, Route, Link } from 'react-router';

import polyfill from 'es6-promise';
import 'isomorphic-fetch';

let SideNav = ({ dispatch, sideNav, getBlogs }) => {
  
  let handleFetchBlogs = () => {
    fetch("/api/GetBlogs/")
    .then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    })
    .then(function(json) {
      dispatch(addBlogOnce(json.Author, json.Title, json.Content, json.ID));
    });
  };
  
  if (getBlogs) { handleFetchBlogs(); }
  
  let handleOpen = () => {
    dispatch(toggleSideNav(true));
  };
 
  let handleClose = () => {
    dispatch(toggleSideNav(false));
  };

  return (
    <div>
      <FlatButton label="SideNav" secondary={true} onTouchTap={handleOpen} />

      <LeftNav
        width={200}
        openRight={true}
        open={sideNav}
        docked={false}
        onRequestChange={handleClose}
        disableSwipeToOpen={false}
        >

        <AppBar
          title="Menu"
          iconElementLeft={<IconButton onTouchTap={handleClose}><NavigationClose /></IconButton>} />
          <Link to="/twitch" > <MenuItem > Twitch </MenuItem> </Link>
          <Link to="/blog" > <MenuItem > Blog </MenuItem> </Link>
          <Link to="/" > <MenuItem > Home </MenuItem> </Link>
      </LeftNav>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    sideNav: state.sideNav,
    getBlogs: state.fetchBlogs,
  };
}

SideNav = connect(mapStateToProps)(SideNav);

export default SideNav;
