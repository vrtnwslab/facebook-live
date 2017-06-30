import React, { Component } from 'react'
import {connect} from 'react-redux'
import * as actions from 'actions'
import {Card, CardHeader} from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import Toggle from 'material-ui/Toggle'
import FacebookSelect from 'components/FacebookSelect/FacebookSelect'
import ItemList from 'components/ItemList/ItemList'

export class Live extends Component {
  constructor (props) {
    super(props)
    this.handleChangePage = this.handleChangePage.bind(this)
    this.handleChangeLive = this.handleChangeLive.bind(this)
    this.handleToggleLive = this.handleToggleLive.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }
  componentWillUpdate () {
    if (this.interval) {
      clearInterval(this.interval)
    }
    const {
      dispatch
    } = this.props
    const {
      liveId,
      nextComments
    } = this.props.facebook

    if (liveId) {
      this
      .interval = setInterval(() => {
        dispatch(actions.fetchVideoComments(liveId, nextComments))
      }, 15000)
    }
  }
  handleToggleLive () {
    const {
      dispatch
    } = this.props
    const {
      liveId,
      live
    } = this.props.facebook
    dispatch(actions.toggleLive(!live))
    dispatch(actions.fetchVideoComments(liveId))
  }
  handleChangePage (event, key, value) {
    const {
      dispatch
    } = this.props
    dispatch(actions.selectFacebookPage(value))
    dispatch(actions.fetchLiveVideos(value))
  }
  handleChangeLive (event, key, value) {
    const {
      dispatch
    } = this.props
    const {
      nextComments
    } = this.props.facebook
    dispatch(actions.fetchVideoComments(value, nextComments))
    dispatch(actions.setLiveVideo(value))
  }
  handleEdit (author, question) {
    const {
      dispatch
    } = this.props
    dispatch(actions.editComment(author, question))
  }
  render () {
    const {
      pageId,
      liveId,
      lives,
      pages,
      comments,
      live
    } = this.props.facebook

    const items = comments
    ? Object.keys(comments).map((comment) => ({
      title: comments[comment].author,
      content: comments[comment].comment,
      time: comments[comment].time
    }))
    : false

    const sorted = items
    ? items.sort((a, b) => b.time - a.time)
    : false

    return (
      <Card>
        <CardHeader
          title={
            <Toggle
              toggled={live}
              label='Live'
              disabled={!liveId}
              onToggle={this.handleToggleLive}
            />
          }
        />
        <Divider />
        {
          !live &&
          <FacebookSelect
            pageId={pageId}
            liveId={liveId}
            onChangePage={this.handleChangePage}
            onChangeLive={this.handleChangeLive}
            pages={pages}
            lives={lives}
          />
        }
        {
          live &&
          items &&
          <ItemList
            items={sorted}
            onEdit={this.handleEdit}
          />
        }
      </Card>
    )
  }
}

const mapStateToProps = (store) => ({
  'settings': store.settings,
  'facebook': store.facebook
})

export default connect(mapStateToProps)(Live)
