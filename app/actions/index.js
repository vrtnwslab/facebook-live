import firebase from 'firebase'
import axios from 'axios'

const
  firebaseConfig = {
    databaseURL: 'https://api-project-7429617504.firebaseio.com',
    apiKey: 'AIzaSyA8p0xYVlP8PIz0KK-2hab1MC9fKJuChiA',
    authDomain: 'api-project-7429617504.firebaseapp.com'
  }

const
  fbUrl = (pageId) => `https://graph.facebook.com/v2.9/${pageId}/videos?fields=live_status,title&limit=100&access_token=1982620655304673|TsJTOsqqk1l_5tLIdUeIaX7Cf28`

const
  commentsUrl = (id) => `https://graph.facebook.com/v2.9/${id}/comments?order=reverse_chronological&limit=5&access_token=1982620655304673|TsJTOsqqk1l_5tLIdUeIaX7Cf28`

firebase
.initializeApp(firebaseConfig)

export const logIn = () => {
  return dispatch => {
    const
      provider = new firebase.auth.GoogleAuthProvider()

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        dispatch({
          type: 'SET_USER',
          payload: result.user
        })
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

export const logOut = () => {
  return dispatch => {
    firebase
        .auth()
        .signOut()
        .then(function () {
          firebase
            .app()
            .delete()
            .then(function () {
              dispatch({
                type: 'UNSET_USER'
              })
            })
        })
  }
}

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

export const fetchLiveVideos = (pageId) => ({
  payload: axios.get(fbUrl(pageId)),
  type: 'FETCH_FACEBOOK'
})

export const fetchVideoComments = (videoId, url) => ({
  payload: axios.get(url || commentsUrl(videoId)),
  type: 'FETCH_COMMENTS'
})

export const setLiveVideo = (value) => ({
  payload: value,
  type: 'SET_LIVE_VIDEO'
})

export const selectSession = (id) => ({
  payload: id,
  type: 'SELECT_SESSION'
})

export const selectFacebookPage = (id) => ({
  payload: id,
  type: 'SET_FACEBOOK_PAGE'
})

export const toggleLive = (live) => ({
  payload: live,
  type: 'TOGGLE_LIVE'
})

export const editComment = (author, question) => ({
  payload: {author, question},
  type: 'EDIT_COMMENT'
})

export const clearQuestion = () => ({
  type: 'CLEAR_QUESTION'
})

export const createNewSession = (firebaseProject, firebaseApp, name) => {
  return dispatch => {
    firebase
      .database()
      .ref(`/${firebaseProject}/${firebaseApp}/sessions`)
      .push({
        name,
        done: false,
        questions: false,
        current: false,
        list: false
      })
      .then(
        function (ref) {
          dispatch({
            type: 'SELECT_SESSION',
            payload: ref.key
          })
        }
      )
  }
}

export const createNewQuestion = (firebaseProject, firebaseApp, firebaseSession, name, question) => {
  return dispatch => {
    firebase
      .database()
      .ref(`/${firebaseProject}/${firebaseApp}/sessions/${firebaseSession}/questions`)
      .push({
        name,
        question
      })
      .then(
        function (ref) {
          dispatch({
            type: 'NEW_QUESTION',
            payload: ref.key
          })
        }
      )
  }
}
