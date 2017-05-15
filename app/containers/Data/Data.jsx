import React, {Component} from 'react'
import {connect} from 'react-redux'

import {
  fetchFile,
  fetchRealtime,
  fetchOnce
} from 'actions'

import Layout from 'components/Layout/layout'

let datafile = null

// uncomment for local data
// datafile = require("data/data.json");

class Data extends Component {
  componentWillMount () {
    const {dispatch} = this.props
    const {
      firebaseProject,
      firebaseApp,
      realtime
    } = this.props.settings

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
    const {data} = this.props
    const {fetched} = this.props.settings

    if (!fetched) {
      return <div className='loading' />
    }

    return (
      <Layout data={data} />
    )
  }
}

const mapStateToProps = (store) => ({
  'data': store.data,
  'settings': store.settings
})

export default connect(mapStateToProps)(Data)
