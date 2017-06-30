import React, { Component } from 'react'
import Live from 'components/Live/Live'
import Questions from 'components/Questions/Questions'
import Done from 'components/Done/Done'
import styles from './Session.scss'

export default class Session extends Component {
  render () {
    const {
      session
    } = this.props

    return (
      <div className={styles.session}>
        <div className={styles.live}>
          <Live />
        </div>
        <div className={styles.questions}>
          <Questions />
        </div>
        <div className={styles.done}>
          <Done />
        </div>
      </div>
    )
  }
}
