import React from 'react';
import SideNav from './SideNav';
import TwitchChat from './TwitchChat';

var SideNavApp = React.createClass({
  render: function () {
    return (
      <div>
        <SideNav/>
        <TwitchChat/>
        {this.props.children}
      </div>
    );
  },
});
 
export default SideNavApp;
