import firebase from 'firebase'

const
  firebaseConfig = {
    databaseURL: 'https://api-project-7429617504.firebaseio.com',
    apiKey: 'AIzaSyA8p0xYVlP8PIz0KK-2hab1MC9fKJuChiA'
  }

firebase
.initializeApp(firebaseConfig)

export const fetchRealtime = (firebaseProject, firebaseApp) => {
  return dispatch => {
    firebase
      .database()
      .ref(`/${firebaseProject}/${firebaseApp}`)
      .on('value', function (snapshot) {
        dispatch({
          type: 'FETCH_DATA_FULFILLED',
          payload: snapshot.val()
        })
      })
  }
}

export const fetchOnce = (firebaseProject, firebaseApp) => {
  return dispatch => {
    firebase
      .database()
      .ref(`/${firebaseProject}/${firebaseApp}`)
      .once('value')
      .then(
          function (snapshot) {
            dispatch({
              type: 'FETCH_DATA_FULFILLED',
              payload: snapshot.val()
            })
          }
      )
  }
}

export const fetchFile = (data) => ({
  payload: data,
  type: 'FETCH_FILE'
})
