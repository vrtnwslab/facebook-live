import React, { Component } from 'react'
import {CardText} from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List'
import {grey400} from 'material-ui/styles/colors'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import MenuItem from 'material-ui/MenuItem'
import ActionItem from 'components/ActionItem/ActionItem'
import LazyLoad from 'react-lazyload'
import { forceCheck } from 'react-lazyload'
import styles from './ItemList.scss'

export default class ItemList extends Component {
  componentWillUpdate () {
    forceCheck()
  }

  render () {
    const {
      items,
      onEdit
    } = this.props

    const iconButtonElement = (
      <IconButton
        touch
        tooltip='more'
        tooltipPosition='bottom-left'
      >
        <MoreVertIcon color={grey400} />
      </IconButton>
    )

    const rightIconMenu = (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem>Reply</MenuItem>
        <MenuItem>Forward</MenuItem>
        <MenuItem>Delete</MenuItem>
      </IconMenu>
    )

    return (
      <CardText>
        <List>
          <div
            className={styles.listContainer}
            onScroll={forceCheck}
          >
            {
              !onEdit &&
              items.map((item, i) =>
                <LazyLoad
                  key={item.key || i}
                  height={88}
                  offset={100}
                  overflow
                >
                  <ListItem
                    rightIconButton={rightIconMenu}
                    primaryText={item.title}
                    secondaryText={item.content}
                    secondaryTextLines={2}
                  />
                </LazyLoad>
              )
            }
            {
              onEdit &&
              items.map((item, i) =>
                <LazyLoad
                  key={item.key || i}
                  height={88}
                  offset={100}
                >
                  <ActionItem
                    id={item.key || i}
                    rightIconButton={rightIconMenu}
                    title={item.title}
                    content={item.content}
                    onClick={onEdit}
                  />
                </LazyLoad>
              )
            }
          </div>
        </List>
      </CardText>
    )
  }
}
