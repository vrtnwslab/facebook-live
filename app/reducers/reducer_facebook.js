import {keyBy} from 'lodash'
export default function reducer (
  state = {
    pages: [
      {
        id: '270994524621',
        name: 'De Redactie'
      },
      {
        id: '147624678637815',
        name: 'Ter Zake'
      }
    ],
    pageId: '270994524621',
    liveId: false,
    live: false,
    lives: false,
    comments: false,
    nextComments: false
  }, action) {
  switch (action.type) {
    case 'SET_FACEBOOK_PAGE': {
      return {
        ...state,
        pageId: action.payload
      }
    }
    case 'SET_LIVE_VIDEO': {
      return {
        ...state,
        liveId: action.payload
      }
    }
    case 'FETCH_FACEBOOK_FULFILLED': {
      const LiveVideos = action
        .payload
        .data
        .data
        .filter((video) => video.live_status === 'VOD' || 'LIVE')
      return {
        ...state,
        lives: [
          ...LiveVideos
        ],
        liveId: LiveVideos[0] ? LiveVideos[0].id : false
      }
    }
    case 'TOGGLE_LIVE': {
      return {
        ...state,
        live: action.payload,
        comments: false,
        nextComments: false
      }
    }
    case 'FETCH_COMMENTS_FULFILLED': {
      const next = action.payload.data ? action.payload.data.paging.next : false
      const comments = action
        .payload
        .data
        .data
        .map((comment) => ({
          comment: comment.message,
          author: comment.from.name,
          id: comment.id,
          time: new Date(comment.created_time)
        })
      )
      const commentsById = keyBy(comments, 'id')
      return {
        ...state,
        comments: {...state.comments, ...commentsById},
        nextComments: next
      }
    }
    default:
      return state
  }
}
