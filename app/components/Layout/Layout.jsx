import React, { Component } from 'react'
import styles from './layout.scss'
import AppBar from 'material-ui/AppBar'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'
import {grey400, darkBlack} from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconMenu from 'material-ui/IconMenu'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'

require('font-awesome-sass-loader')

export default class Layout extends Component {
  constructor (props) {
    super(props)
    this.state = {
      newSession: false
    }
    this.handleSelectPage = this.handleSelectPage.bind(this)
    this.handleSelectSession = this.handleSelectSession.bind(this)
    this.handleDropdownPost = this.handleDropdownPost.bind(this)
    this.handleSetNewSessionName = this.handleSetNewSessionName.bind(this)
    this.handleCreateNewSession = this.handleCreateNewSession.bind(this)
    this.toggleExpand = this.toggleExpand.bind(this)
  }

  handleSelectPage (event, index, value) {
    const {
      onSelectPage
    } = this.props
    onSelectPage(value)
  }

  toggleExpand () {
    this.setState({
      newSession: !this.state.newSession
    })
    this.handleSetNewSessionName(false, '')
  }

  handleSetNewSessionName (event, newValue) {
    const {
      onSetNewSessionName
    } = this.props
    onSetNewSessionName(newValue)
  }

  handleCreateNewSession (event) {
    const {
      onCreateNewSession
    } = this.props
    onCreateNewSession()
    this.setState({
      newSession: false
    })
  }

  handleSelectSession (event, index, value) {
    const {
      onSelectSession
    } = this.props
    onSelectSession(value)
  }

  handleDropdownPost (event, index, value) {
    const {
      onSelectLive
    } = this.props
    onSelectLive(value)
  }

  render () {
    const {
      data,
      session,
      facebookPages,
      facebookPageId,
      facebookLives,
      comments
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
      <div id='app__main' className={styles.main}>
        <AppBar
          title={data.name}
          showMenuIconButton={false}
        >
          <DropDownMenu
            value={session}
            onChange={this.handleSelectSession}
            autoWidth={false}
            style={{
              width: '77%'
            }}
          >
            {
              Object.keys(data.sessions).map((key) =>
                <MenuItem
                  key={key}
                  value={key}
                  primaryText={data.sessions[key].name}
                />
              )
            }
          </DropDownMenu>
        </AppBar>
        <section className={styles.section}>
          <div className={styles.live}>
            <Card>
              <CardHeader
                title='Connect'
                actAsExpander
                showExpandableButton
              />
              <CardText expandable>
                <DropDownMenu
                  value={facebookPageId}
                  onChange={this.handleSelectPage}
                  autoWidth={false}
                  style={{
                    width: '100%'
                  }}
                >
                  {
                    facebookPages.map((page) =>
                      <MenuItem
                        key={page.id}
                        value={page.id}
                        primaryText={page.name}
                       />
                     )
                   }
                </DropDownMenu>
                <DropDownMenu
                  value={facebookLives[0].id}
                  onChange={this.handleDropdownPost}
                  style={{
                    width: '100%'
                  }}
                >
                  {
                    facebookLives.map((d) =>
                      <MenuItem
                        key={d.id}
                        value={d.id}
                        primaryText={d.title}
                      />
                    )
                  }
                </DropDownMenu>
              </CardText>
            </Card>
            <Card
              style={{
                height: '100%'
              }}
            >
              <CardText>

                <List>
                  {
                    comments.map((comment, i) =>
                      <ListItem
                        key={i}
                        rightIconButton={rightIconMenu}
                        primaryText={comment.name}
                        secondaryText={
                          <p>
                            <span style={{color: darkBlack}}>
                              {comment.author}
                            </span><br />
                            {comment.comment}
                          </p>
                        }
                        secondaryTextLines={2}
                      />
                    )
                  }
                </List>
              </CardText>
            </Card>
          </div>
          <div className={styles.questions}>
            <Card
              onExpandChange={this.toggleExpand}
              expanded={this.state.newSession}
            >
              <CardHeader
                title='New Session'
                actAsExpander
                showExpandableButton
              />
              <CardText
                expandable
              >
                <TextField
                  hintText='session name'
                  floatingLabelText='Start new session'
                  fullWidth
                  onChange={this.handleSetNewSessionName}
                  autoFocus
                />
                <CardActions>
                  <FlatButton
                    label='CREATE'
                    onTouchTap={this.handleCreateNewSession}
                  />
                </CardActions>
              </CardText>
            </Card>
            <Card
              style={{height: '100%'}}
            >
              <CardText>

                <div className={styles.current}>
                  <h3>{'Current'}</h3>
                  <ul>
                    <li>{'post'}</li>
                  </ul>
                </div>
                <div className={styles.next}>
                  <h3>{'Next'}</h3>
                  <List>
                    <ListItem
                      leftAvatar={<Avatar src='http://placehold.it/200x200' />}
                      rightIconButton={rightIconMenu}
                      primaryText='Brendan Lim'
                      secondaryText={
                        <p>
                          <span style={{color: darkBlack}}>Brunch this weekend?</span><br />
                            I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
                          </p>
                        }
                      secondaryTextLines={2}
                      />
                    <Divider inset />
                    <ListItem
                      leftAvatar={<Avatar src='http://placehold.it/200x200' />}
                      rightIconButton={rightIconMenu}
                      primaryText='me, Scott, Jennifer'
                      secondaryText={
                        <p>
                          <span style={{color: darkBlack}}>Summer BBQ</span><br />
                            Wish I could come, but I&apos;m out of town this weekend.
                          </p>
                        }
                      secondaryTextLines={2}
                      />
                    <Divider inset />
                    <ListItem
                      leftAvatar={<Avatar src='http://placehold.it/200x200' />}
                      rightIconButton={rightIconMenu}
                      primaryText='Grace Ng'
                      secondaryText={
                        <p>
                          <span style={{color: darkBlack}}>Oui oui</span><br />
                            Do you have any Paris recs? Have you ever been?
                          </p>
                        }
                      secondaryTextLines={2}
                      />
                    <Divider inset />
                    <ListItem
                      leftAvatar={<Avatar src='http://placehold.it/200x200' />}
                      rightIconButton={rightIconMenu}
                      primaryText='Kerem Suer'
                      secondaryText={
                        <p>
                          <span style={{color: darkBlack}}>Birthday gift</span><br />
                            Do you have any ideas what we can get Heidi for her birthday? How about a pony?
                          </p>
                        }
                      secondaryTextLines={2}
                      />
                    <Divider inset />
                    <ListItem
                      leftAvatar={<Avatar src='http://placehold.it/200x200' />}
                      rightIconButton={rightIconMenu}
                      primaryText='Raquel Parrado'
                      secondaryText={
                        <p>
                          <span style={{color: darkBlack}}>Recipe to try</span><br />
                            We should eat this: grated squash. Corn and tomatillo tacos.
                          </p>
                        }
                      secondaryTextLines={2}
                      />
                  </List>
                </div>
              </CardText>
            </Card>
          </div>
          <div className={styles.done}>
            <Card
              style={{height: '100%'}}
            >
              <CardHeader
                title={'Done'}
              />
              <CardText>
                <List>
                  <ListItem
                    leftAvatar={<Avatar src='http://placehold.it/200x200' />}
                    rightIconButton={rightIconMenu}
                    primaryText='Brendan Lim'
                    secondaryText={
                      <p>
                        <span style={{color: darkBlack}}>Brunch this weekend?</span><br />
                            I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
                          </p>
                        }
                    secondaryTextLines={2}
                      />
                  <Divider inset />
                  <ListItem
                    leftAvatar={<Avatar src='http://placehold.it/200x200' />}
                    rightIconButton={rightIconMenu}
                    primaryText='me, Scott, Jennifer'
                    secondaryText={
                      <p>
                        <span style={{color: darkBlack}}>Summer BBQ</span><br />
                            Wish I could come, but I&apos;m out of town this weekend.
                          </p>
                        }
                    secondaryTextLines={2}
                      />
                  <Divider inset />
                  <ListItem
                    leftAvatar={<Avatar src='http://placehold.it/200x200' />}
                    rightIconButton={rightIconMenu}
                    primaryText='Grace Ng'
                    secondaryText={
                      <p>
                        <span style={{color: darkBlack}}>Oui oui</span><br />
                            Do you have any Paris recs? Have you ever been?
                          </p>
                        }
                    secondaryTextLines={2}
                      />
                  <Divider inset />
                  <ListItem
                    leftAvatar={<Avatar src='http://placehold.it/200x200' />}
                    rightIconButton={rightIconMenu}
                    primaryText='Kerem Suer'
                    secondaryText={
                      <p>
                        <span style={{color: darkBlack}}>Birthday gift</span><br />
                            Do you have any ideas what we can get Heidi for her birthday? How about a pony?
                          </p>
                        }
                    secondaryTextLines={2}
                      />
                  <Divider inset />
                  <ListItem
                    leftAvatar={<Avatar src='http://placehold.it/200x200' />}
                    rightIconButton={rightIconMenu}
                    primaryText='Raquel Parrado'
                    secondaryText={
                      <p>
                        <span style={{color: darkBlack}}>Recipe to try</span><br />
                            We should eat this: grated squash. Corn and tomatillo tacos.
                          </p>
                        }
                    secondaryTextLines={2}
                      />
                </List>
              </CardText>
            </Card>
          </div>
        </section>
      </div>
    )
  }
}
