export default function reducer (
  state = {
    realtime: true,
    firebase: false,
    fetched: false,
    firebaseProject: 'vrtnwslab',
    firebaseApp: 'facebooklive',
    newSessionName: false
  }, action) {
  switch (action.type) {
    case 'FETCH_DATA_FULFILLED': {
      return {
        ...state,
        fetched: true
      }
    }
    case 'START_SESSION': {
      return {
        ...state,
        firebase: action.payload
      }
    }
    default: {
      return state
    }
  }
}
