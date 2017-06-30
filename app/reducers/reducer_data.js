export default function reducer (
  state = {
    name: 'Facebook Live',
    sessions: {},
    edit: {
      author: 'VRTNWS',
      question: ''
    }
  }, action) {
  switch (action.type) {
    case 'FETCH_FILE': {
      return {
        ...state,
        ...action.payload
      }
    }
    case 'FETCH_DATA_FULFILLED': {
      return {
        ...state,
        ...action.payload
      }
    }
    case 'EDIT_COMMENT': {
      return {
        ...state,
        edit: action.payload
      }
    }
    case 'CLEAR_QUESTION':
    case 'SELECT_SESSION': {
      return {
        ...state,
        edit: {
          author: 'VRTNWS',
          question: ''
        }
      }
    }
    default:
      return state
  }
}
