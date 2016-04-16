import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/lib/raised-button';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import BlogEdit from './BlogEdit';

let BlogList = ({ blogs, dispatch }) => {
  const style = {
    width: 500,
  };
  
  return (
    <div> 
      <ul>
        {blogs.map(function (listValue, index) {
          return (
            <Card key={index} style={style}>
              <CardHeader
                title={ "Title: " + listValue.title }
                subtitle={ "Author: " + listValue.author }
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardText expandable={false}>
                {listValue.content}
              </CardText>
              <CardActions expandable={true}>
                <BlogEdit
                  authorEdit={listValue.author}
                  titleEdit={listValue.title}
                  contentEdit={listValue.content}
                  id={index}
                />
              </CardActions>
            </Card>
          );
        })}
      </ul>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    blogs: state.blogs,
    getBlogs: state.fetchBlogs,
  };
}

BlogList = connect(mapStateToProps)(BlogList);
export default BlogList;
