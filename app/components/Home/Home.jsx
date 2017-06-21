import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect, withRouter} from 'react-router-dom'
import * as actions from 'actions'
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import RaisedButton from 'material-ui/RaisedButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Divider from 'material-ui/Divider'
import styles from './Home.scss'

export class Home extends Component {
  constructor (props) {
    super(props)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleLoad = this.handleLoad.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleLogIn = this.handleLogIn.bind(this)
  }
  componentWillMount () {
    const {dispatch} = this.props
    const {
      firebaseProject,
      firebaseApp,
      realtime
    } = this.props.settings
    const {
      fetched,
      user
    } = this.props.firebase
    if (!user.loggedIn) { this.handleLogIn() }
    if (realtime && !fetched) {
      dispatch(actions.fetchRealtime(firebaseProject, firebaseApp))
    } else if (!fetched) {
      dispatch(actions.fetchOnce(firebaseProject, firebaseApp))
    }
  }
  handleLogIn () {
    const
      {
        dispatch
      } = this.props
    dispatch(actions.logIn())
  }
  handleSelect (event, key, value) {
    const {
      dispatch
    } = this.props
    dispatch(actions.selectSession(value))
  }

  handleAdd () {
    this.props.history.push('/new')
  }

  handleLoad () {
    this.props.history.push('/session')
  }

  render () {
    const {
      data
    } = this.props
    const {
      sessionId,
      fetched
    } = this.props.firebase
    return (
      fetched
      ? <div className={styles.home}>
        <Card
          style={{
            width: '100%'
          }}
        >
          <CardHeader
            title={'Facebook Live Sessions'}
            subtitle={'Choose an existing session or create a new one'}
        />
          <Divider />
          {
            // load sessions only when they exist
            sessionId &&
            <CardText>
              <div className={styles.cardText}>
                <div className={styles.dropDown}>
                  <DropDownMenu
                    value={sessionId}
                    onChange={this.handleSelect}
                    autoWidth={false}
                    style={{
                      width: '100%'
                    }}
                  >
                    {
                      Object.keys(data.sessions).reverse().map((key) =>
                        <MenuItem
                          key={key}
                          value={key}
                          primaryText={data.sessions[key].name}
                        />
                      )
                    }
                  </DropDownMenu>
                </div>
                <div className={styles.button}>
                  <RaisedButton
                    primary
                    label={'GO!'}
                    onTouchTap={this.handleLoad}
                  />
                </div>
              </div>
            </CardText>
          }
          {
            // Redirect to /new if there are no sessions created yet
            !sessionId &&
            <Redirect to='/new' />
          }
          <CardActions>
            <FloatingActionButton
              secondary
              onTouchTap={this.handleAdd}
            >
              <ContentAdd />
            </FloatingActionButton>
          </CardActions>
        </Card>
      </div>
      : <div />
    )
  }
}

const mapStateToProps = (store) => ({
  'data': store.data,
  'settings': store.settings,
  'firebase': store.firebase
})

export default withRouter(connect(mapStateToProps)(Home))
