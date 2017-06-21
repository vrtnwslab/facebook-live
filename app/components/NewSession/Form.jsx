import React, { Component } from 'react'
import {Field, reduxForm} from 'redux-form'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

const NameTextField = ({input}) => (
  <TextField
    autoFocus
    hintText='Session name'
    floatingLabelText='Create a new session'
    fullWidth
    {...input}
  />
)

export class Form extends Component {
  render () {
    const {
      handleSubmit,
      onCancel,
      pristine
    } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <Field
          name='sessionName'
          component={
            NameTextField
          }
          type='text'
          placeholder='Session Name'
        />
        <RaisedButton
          disabled={pristine}
          primary
          label={'CREATE'}
          type='submit'
          style={{
            marginRight: '1em'
          }}
        />
        <RaisedButton
          label={'CANCEL'}
          onTouchTap={onCancel}
        />
      </form>
    )
  }
}

export default reduxForm({
  form: 'newSession'
})(Form)
