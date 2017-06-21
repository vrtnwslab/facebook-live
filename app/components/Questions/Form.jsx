import React, {Component} from 'react'
import {Field, reduxForm} from 'redux-form'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

const AuthorTextField = ({input}) => (
  <TextField
    hintText='Author'
    floatingLabelText='Author name'
    fullWidth
    {...input}
  />
)

const QuestionTextField = ({input, meta}) => (
  <TextField
    hintText='Question'
    floatingLabelText='Question'
    fullWidth
    multiLine
    rows={10}
    {...input}
  />
)

export class Form extends Component {
  render () {
    const {
      handleSubmit,
      onClear
    } = this.props

    return (
      <form
        onSubmit={handleSubmit}
      >
        <Field
          name='author'
          component={
            AuthorTextField
          }
          type='text'
          placeholder='author'
        />
        <Field
          name='question'
          component={
            QuestionTextField
          }
          type='text'
          placeholder='question'
          autoFocus
        />
        <RaisedButton
          primary
          label={'CREATE'}
          type='submit'
          style={{
            marginRight: '1em'
          }}
        />
        <RaisedButton
          primary
          label={'NEW'}
          type={'button'}
          onClick={onClear}
          style={{
            marginRight: '1em'
          }}
        />
      </form>
    )
  }
}

export default reduxForm({
  form: 'newQuestion'
})(Form)
