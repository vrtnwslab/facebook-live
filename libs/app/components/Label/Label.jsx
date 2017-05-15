import React, { Component } from 'react'
import {colors} from 'libs/colors'
import styles from './Label.css'

export default class Label extends Component {
  render () {
    const {
      title,
      value,
      suffix,
      color,
      size
    } = this.props

    return (
      <div>
        <div className='label'>
          <h1>{'test'}</h1>
        </div>
        <div
          className={styles.label}
        >
          <div className={`content`}>
            <div
              className='title'
              style={{
                backgroundColor: color
              }}
            >
              {title}
            </div>
            <div className='value'>
              <span>
                {value}
              </span>
              <span>
                {suffix}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Label.defaultProps = {
  title: 'Vlaanderen',
  value: '80',
  suffix: '%',
  color: colors.blueRange[2],
  size: 'big'
}
