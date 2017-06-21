import React, { Component } from 'react'
import {CardText} from 'material-ui/Card'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'

export default class FacebookSelect extends Component {
  render () {
    const {
      pageId,
      liveId,
      onChangePage,
      onChangeLive,
      pages,
      lives
    } = this.props

    return (
      <CardText>
        <DropDownMenu
          value={pageId}
          onChange={onChangePage}
          autoWidth={false}
          style={{
            width: '100%'
          }}
        >
          {
            pages.map((page) =>
              <MenuItem
                value={page.id}
                key={page.id}
                primaryText={page.name}
              />
            )
          }
        </DropDownMenu>
        {
          lives[0] &&
          <DropDownMenu
            value={liveId}
            onChange={onChangeLive}
            style={{
              width: '100%'
            }}
          >
            {
              lives.map((live) =>
                <MenuItem
                  value={live.id}
                  key={live.id}
                  primaryText={live.title}
                />
              )
            }
          </DropDownMenu>
        }
      </CardText>
    )
  }
}
