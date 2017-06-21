import React, {Component} from 'react'
import {connect} from 'react-redux'

import {
  fetchFile,
  fetchRealtime,
  fetchOnce,
  fetchPage,
  fetchLiveVideos,
  fetchVideoComments,
  createNewSession,
  setNewSessionName,
  selectSession
} from 'actions'

import Layout from 'components/Layout/layout'

let datafile = null

// uncomment for local data
// datafile = require("data/data.json");

class Data extends Component {
  constructor (props) {
    super(props)
    this.handleSelectLive = this.handleSelectLive.bind(this)
    this.handleCreateNewSession = this.handleCreateNewSession.bind(this)
    this.handleSelectSession = this.handleSelectSession.bind(this)
    this.handleSelectPage = this.handleSelectPage.bind(this)
    this.handleSetNewSessionName = this.handleSetNewSessionName.bind(this)
  }

  handleSelectLive (id) {
    const {
      dispatch
    } = this.props

    dispatch(fetchVideoComments(id))
  }

  handleSelectPage (id) {
    const {
      dispatch
    } = this.props

    dispatch(fetchPage(id))
  }

  handleSelectSession (id) {
    const {
      dispatch
    } = this.props

    dispatch(selectSession(id))
  }

  handleSetNewSessionName (name) {
    const {
      dispatch
    } = this.props

    dispatch(setNewSessionName(name))
  }

  handleCreateNewSession () {
    const {
      dispatch
    } = this.props
    const {
      firebaseProject,
      firebaseApp,
      newSessionName
    } = this.props.settings

    dispatch(createNewSession(firebaseProject, firebaseApp, newSessionName))
  }

  componentWillMount () {
    const {dispatch} = this.props
    const {
      firebaseProject,
      firebaseApp,
      realtime
    } = this.props.settings
    this.handleLogIn()
    dispatch(fetchLiveVideos())

    if (datafile) {
      dispatch(fetchFile(datafile))
    } else {
      if (realtime) {
        dispatch(fetchRealtime(firebaseProject, firebaseApp))
      } else {
        dispatch(fetchOnce(firebaseProject, firebaseApp))
      }
    }
  }

  render () {
    const {
      data,
      facebook,
      comments
    } = this.props
    const {
      fetched,
      firebase,
      facebookLiveId,
      facebookPageId,
      facebookPages
    } = this.props.settings
    const facebookLiveTitle = facebook.filter((d) => d.id === facebookLiveId)

    if (fetched < 2) {
      return <div className='loading' />
    }

    const facebookLives = facebook.map((live) => {
      return {
        title: live.title,
        id: live.id
      }
    })

    return (
      <Layout
        data={data}
        session={firebase || Object.keys(data.sessions)[0]}
        facebookPages={facebookPages}
        facebookPageId={facebookPageId}
        facebookLives={facebookLives}
        facebookLiveTitle={facebookLiveTitle[0].title}
        comments={comments}
        onSelectPage={this.handleSelectPage}
        onSelectLive={this.handleSelectLive}
        onSelectSession={this.handleSelectSession}
        onCreateNewSession={this.handleCreateNewSession}
        onSetNewSessionName={this.handleSetNewSessionName}
      />
    )
  }
}

const mapStateToProps = (store) => ({
  'data': store.data,
  'settings': store.settings,
  'facebook': store.facebook,
  'comments': store.comments
})

export default connect(mapStateToProps)(Data)
