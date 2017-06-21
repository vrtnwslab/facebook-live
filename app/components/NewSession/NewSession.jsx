import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import * as actions from 'actions'
import {Card, CardHeader, CardText} from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import Form from './Form'
import styles from './NewSession.scss'

export class NewSession extends Component {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }
  handleSubmit (values) {
    const {
      dispatch,
      settings
    } = this.props
    dispatch(actions.createNewSession(settings.firebaseProject, settings.firebaseApp, values.sessionName))
    this.props.history.push('/session')
  }
  handleCancel () {
    this.props.history.push('/')
  }
  render () {
    return (
      <div className={styles.newSession}>
        <Card
          style={{
            width: '100%'
          }}
        >
          <CardHeader
            title={'Facebook Live Sessions'}
            subtitle={'Create a new session'}
          />
          <Divider />
          <CardText>
            <Form
              onSubmit={this.handleSubmit}
              onCancel={this.handleCancel}
            />
          </CardText>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  'settings': store.settings,
  'form': store.form
})

export default withRouter(connect(mapStateToProps)(NewSession))
