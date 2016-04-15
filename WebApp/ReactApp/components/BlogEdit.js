import React from 'react';
import { connect } from 'react-redux';
import { toggleEditMode, deleteBlog, editBlog } from '../actions/actions';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';

let BlogEdit = ({ dispatch, editState, id, authorEdit, titleEdit, contentEdit }) => {
  let handleOpen = () => {
    dispatch(toggleEditMode(true));
  };

  let handleClose = () => {
    dispatch(toggleEditMode(false));
  }; 

  let handleDelete = () => {
    dispatch(deleteBlog(id));
    handleClose();
  };

  let handleSave = () => {
    dispatch(editBlog(editAuthor.value, editTitle.value, editContent.value, id));
    handleClose();
  };

  return (
    <div>
      <FlatButton label="Options" secondary={true} onTouchTap={handleOpen}/>
      <Dialog
        title="Edit Blog Content"
        modal={false}
        actions={[
          <FlatButton
            label="Save"
            primary={true}
            keyboardFocused={false}
            onTouchTap={handleSave}
          />,
          <FlatButton
            label="Delete"
            secondary={true}
            onTouchTap={handleDelete}
          />,
          <FlatButton
            label="Cancel"
            default={true}
            keyboardFocused={true}
            onTouchTap={handleClose}
          />,
        ]}
        open={editState}
        onRequestClose={handleClose}
        >

        <TextField id='editAuthor'
          hintText="Author"
          floatingLabelText="Author"
          defaultValue={authorEdit}>
        </TextField>
        <br/>
        <TextField id='editTitle'
            hintText="Title"
            floatingLabelText="Title"
            defaultValue={titleEdit}>
        </TextField>
        <br/>
        <TextField id='editContent'
          hintText="Blog Content"
          floatingLabelText="Blog Content"
          multiLine={true}
          rows={2}
          defaultValue={contentEdit}>
        </TextField>
      </Dialog>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    editState: state.edit,
  };
}

BlogEdit = connect(mapStateToProps)(BlogEdit);

export default BlogEdit;
