import { ADD_BLOG_ONCE, FETCH_BLOGS, SIDE_NAV, EDIT_MODE, ADD_BLOG, EDIT_BLOG, DELETE_BLOG, ADD_CHAT } from '../actions/actions';

function getInit() {
  return {
    blogs: 
    [
      {
        author: '',
        title: '',
        content: '',
        id: 0,
      },
    ],
    chat:
    [
      {
        text: 'nice',
      },
    ],
    edit: false,
    sideNav: false,
    fetchBlogs: true,
  };
}
 
function blogReducer(state = getInit(), action) {
  console.log(state);
  switch (action.type) {
    case ADD_BLOG:
    fetch('/api/AddBlog/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Author: action.author,
        Title: action.title,
        Content: action.content,
        ID: action.id,
        }) 
      });
      return Object.assign({}, state,
        {
          blogs:
          [...state.blogs,
            {
              author: action.author,
              title: action.title,
              content: action.content,
              id: action.id,
            },
          ],
        }
      );
      
    case ADD_BLOG_ONCE:
    return Object.assign({}, state,
      {
        blogs:
          [
            {
              author: action.author,
              title: action.title,
              content: action.content,
              id: action.id,
            },
          ]
      }
    );

    case EDIT_BLOG:
      state.blogs[action.id].author = action.author;
      state.blogs[action.id].title = action.title;
      state.blogs[action.id].content = action.content;
      return Object.assign({}, state,
        {
          blogs:
            [
              ...state.blogs,
            ],
        }
      );

    case DELETE_BLOG:
      return Object.assign({}, state,
        {
          blogs: state.blogs.filter((_, i) => i !== action.id),
        }
      );

    case ADD_CHAT:
      return Object.assign({}, state,
        {
          chat:
          [
            ...state.chat,
            {
              text: action.text,
            },
          ],
        }
      );

    case EDIT_MODE:
      return Object.assign({}, state, { edit: action.edit });

    case SIDE_NAV:
      return Object.assign({}, state, { sideNav: action.sideNav });
      
    case FETCH_BLOGS:
      return Object.assign({}, state, { fetchBlogs: action.getBlogs });
       
    default:
      return state;
  }
}

export default blogReducer;
