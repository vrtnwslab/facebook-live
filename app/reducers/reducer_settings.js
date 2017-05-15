export default function reducer (
  state = {
    firebaseProject: 'vrtnwslab',
    firebaseApp: 'facebooklive',
    realtime: true,
    fetched: null
  }, action) {
  switch (action.type) {
    case 'FETCH_FILE':
    case 'FETCH_DATA_FULFILLED': {
      return {
        ...state,
        fetched: true
      }
    }
    default: {
      return state
    }
  }
}
