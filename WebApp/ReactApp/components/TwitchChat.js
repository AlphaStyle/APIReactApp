import React from 'react';
import { connect } from 'react-redux';
import { addChat } from '../actions/actions';
import FlatButton from 'material-ui/lib/flat-button';

let TwitchChat = ({ chat, dispatch }) => {
  var ws = new WebSocket("ws://localhost:9000/ws");

  // What happen when Websocket disconnect
  ws.onclose = function () {
    // websocket is closed.
    console.log("Websocket is closed");
  };
 
  ws.onmessage = (evt) => {dispatch(addChat(evt.data));};

  function WebSocketTest() {
    var msg = "This is a long test message to see how the page responde to long text";
    ws.send(msg);
    console.log("Sent: " + msg);
  }

  return (
    <div>
      <FlatButton label="WS Test" primary={true} onMouseDown={() => {WebSocketTest()}} />
    </div>
  );
};

TwitchChat = connect()(TwitchChat);
export default TwitchChat;
