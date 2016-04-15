import React from 'react';
import { connect } from 'react-redux';
import CardText from 'material-ui/lib/card/card-text';
import Card from 'material-ui/lib/card/card';

let TwitchChatList = ({ chat }) => {
  const style = {
    width: 300,
  };
  return ( 
    <div>
      <ul>
      {chat.map(function (val, index) {
        return (
          <Card key={index} style={style}>
            <CardText expandable={false}>
                {val.text}
            </CardText>
          </Card>
        );
      })}
      </ul>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    chat: state.chat,
  };
};

TwitchChatList = connect(mapStateToProps)(TwitchChatList);
export default TwitchChatList;
