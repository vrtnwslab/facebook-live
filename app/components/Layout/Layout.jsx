import React, { Component } from 'react'
require('font-awesome-sass-loader')

export default class Layout extends Component {
  render () {
    const {
      data
    } = this.props

    return (
      <div id='app__main'>
        <header>
          <h2 className='app__title'>
            {'Data loaded'}
          </h2>
        </header>
        <section>
          <i className='fa fa-angle-left' />
          <p>
            {' dolor sit amet, consectetur adipisicing elit. Doloribus debitis beatae numquam voluptas hic, temporibus harum, eos fugit quaerat corporis quisquam et optio eaque deserunt quidem saepe dolorem non assumenda!'}
          </p>
          <img
            src='assets/images/foto.jpg'
            alt='foto'
          />
        </section>
      </div>
    )
  }
}
