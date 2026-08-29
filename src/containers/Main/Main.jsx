import React, { Component } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '@/components/Card/Card'
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
            onclick={() => this.props.navigate('/sort')}
          />
          <Card
            title='Shortest Path'
            detail={'- dijkstra<br />'}
            onclick={() => this.props.navigate('/shorest-path')}
          />
        </div>
      </div>
    )
  }
}

function Main() {
  const navigate = useNavigate()
  return <Select navigate={navigate} />
}

export default Main
