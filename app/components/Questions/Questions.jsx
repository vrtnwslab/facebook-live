import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Card, CardHeader, CardText} from 'material-ui/Card'
import * as actions from 'actions'
import Form from './Form'
import ItemList from 'components/ItemList/ItemList'

export class Questions extends Component {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleNew = this.handleNew.bind(this)
  }
  handleSubmit (values) {
    console.log(values)
    const {
      dispatch,
      settings,
      firebase
    } = this.props
    dispatch(actions.createNewQuestion(settings.firebaseProject, settings.firebaseApp, firebase.sessionId, values.author, values.question))
  }
  handleNew () {
    const {
      dispatch
    } = this.props
    dispatch(actions.clearQuestion())
  }
  render () {
    const {
      sessionId
    } = this
      .props
      .firebase
    const {
      questions
    } = this
      .props
      .data
      .sessions[sessionId] || false

    const items = questions
      ? Object.keys(questions).map((key) => ({
        title: questions[key].name,
        content: questions[key].question,
        key
      }))
      : false
    return (
      <Card
        style={{
          height: '100%'
        }}
      >
        <CardHeader
          title={'Questions'}
        />
        <CardText>
          <Form
            onSubmit={this.handleSubmit}
            onClear={this.handleNew}
            initialValues={this.props.data.edit}
            enableReinitialize
          />
          {
            items &&
            <ItemList
              items={items}
            />
          }
        </CardText>
      </Card>
    )
  }
}

const mapStateToProps = (store) => ({
  'settings': store.settings,
  'firebase': store.firebase,
  'data': store.data
})

export default connect(mapStateToProps)(Questions)
