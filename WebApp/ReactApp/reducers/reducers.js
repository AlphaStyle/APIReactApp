import { SIDE_NAV, EDIT_MODE, ADD_BLOG, EDIT_BLOG, DELETE_BLOG, ADD_CHAT } from '../actions/actions';

require('es6-promise').polyfill();
var superagentPromisePlugin = require('superagent-promise-plugin');
var request = superagentPromisePlugin.patch(require('superagent'));



function getInit() {
  return request.get('/api/GetBlogs/')
  .use(superagentPromisePlugin)
  .then(function (res) {
        return {
          blogs:
          [
            {
              author:'Code More!',
              title: 'this is stitle',
              content: 'this is content',
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
        };
    }
  )
  .catch(function (err) {
    throw(err);
  });
}
 
function blogReducer(state = getInit(), action) {
  console.log(state);
  switch (action.type) {
    case ADD_BLOG:
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

    case EDIT_BLOG:
      state.blogs[action.id].author = action.author;
      state.blogs[action.id].title = action.title;
      state.blogs[action.id].content = action.content;
      state.blogs[action.id].id = action.id;
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

    default:
      return state;
  }
}

export default blogReducer;
