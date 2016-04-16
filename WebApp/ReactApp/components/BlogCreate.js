import React from 'react';
import { connect } from 'react-redux';
import { addBlog } from '../actions/actions';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

let BlogCreate = ({ dispatch }) => {

  const style = {
    padding: "20px",
  };

  const styleWidth = {
    width: 500,
  };
  
  return (
    <div style={style}>
      <TextField style={styleWidth} id='addAuthor'
        hintText="Author"
        floatingLabelText="Author">
      </TextField>
      <br/>
      <TextField style={styleWidth} id='addTitle'
          hintText="Title"
          floatingLabelText="Title">
      </TextField>
      <br/>
      <TextField style={styleWidth} id='addContent'
        hintText="Blog Content"
        floatingLabelText="Blog Content"
        multiLine={true}
        rows={2}>
      </TextField>
      <div> 
      <RaisedButton label="Publish" primary={true}
      onMouseDown={() => {
        dispatch(addBlog(addAuthor.value, addTitle.value, addContent.value));         
        addAuthor.value = '';
        addTitle.value = '';
        addContent.value = '';
      }}/>
      </div>
    </div>
  );
};

BlogCreate = connect()(BlogCreate);

export default BlogCreate;
