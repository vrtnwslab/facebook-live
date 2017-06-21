import React, { Component } from 'react'
import {Card, CardHeader, CardText} from 'material-ui/Card'

export default class Done extends Component {
  render () {
    const {
      props
    } = this.props

    return (
      <Card
        style={{
          height: '100%'
        }}
      >
        <CardHeader
          title={'Done'}
        />
        <CardText>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, labore iure cupiditate quaerat consequatur accusantium temporibus commodi aliquid explicabo quae, doloribus magni voluptatibus aspernatur magnam dolorum reiciendis quisquam, quam laboriosam?
          </p>
        </CardText>
      </Card>
    )
  }
}
