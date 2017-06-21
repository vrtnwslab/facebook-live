import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import AppBar from 'material-ui/AppBar'
import MenuItem from 'material-ui/MenuItem'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import styles from './Header.scss'

export default class Header extends Component {
  render () {
    return (
      <div className={styles.header}>
        <AppBar
          title={'Facebook Live'}
          showMenuIconButton={false}
          iconElementRight={
            <IconMenu
              iconButtonElement={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <Link to='/'><MenuItem primaryText={'Home'} /></Link>
            </IconMenu>
          }
        />
      </div>
    )
  }
}
