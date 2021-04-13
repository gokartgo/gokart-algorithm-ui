import React, { Component } from 'react'
import Card from '/components/Card/Card'
import './Main.scss'

class Select extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className='main-container'>
        <h2>Gokart Algorithm</h2>
        <div className='main-card-container'>
          <Card
            title='Sort'
            detail={'- Quick Sort<br />- Bubble Sort<br />- Merge Sort'}
            onclick={() => this.props.history.push('/sort')}
          />
          <Card
            title='Shortest Path'
            detail={'- dijkstra<br />'}
            onclick={() => this.props.history.push('/shorest-path')}
          />
        </div>
      </div>
    )
  }
}

export default Select
