import React, { Component } from 'react'
import {ListItem} from 'material-ui/List'

export default class ActionItem extends Component {
  constructor (props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }
  onClick () {
    const {
      title,
      content,
      onClick
    } = this.props
    onClick(title, content)
  }
  render () {
    const {
      id,
      title,
      rightIconButton,
      content
    } = this.props

    return (
      <ListItem
        key={id}
        rightIconButton={rightIconButton}
        primaryText={title}
        secondaryText={content}
        secondaryTextLines={2}
        onClick={this.onClick}
      />
    )
  }
}
