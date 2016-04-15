import React from 'react';
import { connect } from 'react-redux';
import { toggleSideNav } from '../actions/actions';
import FlatButton from 'material-ui/lib/flat-button';
import LeftNav from 'material-ui/lib/left-nav';
import AppBar from 'material-ui/lib/app-bar';
import MenuItem from 'material-ui/lib/menus/menu-item';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import IconButton from 'material-ui/lib/icon-button';
import { Router, Route, Link } from 'react-router';

let SideNav = ({ dispatch, sideNav }) => {
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
          <MenuItem > <Link to="/twitch" > Twitch </Link> </MenuItem>
          <MenuItem  > <Link to="/blog" > Blog </Link> </MenuItem>
          <MenuItem > <Link to="/" > Home </Link> </MenuItem>
      </LeftNav>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    sideNav: state.sideNav,
  };
}

SideNav = connect(mapStateToProps)(SideNav);

export default SideNav;
