export default function reducer (
  state = {
    fetched: false,
    sessionId: false,
    user: {
      email: 'vrtnws@firebase',
      name: 'Projecten',
      img: null,
      loggedIn: false
    }
  }
  , action) {
  switch (action.type) {
    case 'FETCH_DATA_FULFILLED': {
      const sessionId = action.payload.sessions
        ? Object.keys(action.payload.sessions)[Object.keys(action.payload.sessions).length - 1]
        : false
      return {
        ...state,
        sessionId,
        fetched: true
      }
    }
    case 'SELECT_SESSION': {
      return {
        ...state,
        sessionId: action.payload
      }
    }
    case 'SET_USER':
      return {
        ...state,
        user: {
          name: action.payload.displayName,
          email: action.payload.email,
          img: action.payload.photoURL,
          loggedIn: true
        }
      }
    case 'UNSET_USER':
      return {
        ...state,
        user: {
          email: 'vrtnws@firebase',
          name: 'Projecten',
          img: null,
          loggedIn: false
        }
      }
    default: {
      return state
    }
  }
}
