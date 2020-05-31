import React, { PureComponent } from 'react'
import Node from './Node/Node'

class PathfindingVisualizer extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      nodes: []
    }
  }

  componentDidMount() {
    const nodes = [];
    for (let row = 0; row < 15; row++) {
      const currentRow = [];
      for (let col = 0; col < 40; col++) {
        currentRow.push([])
      }
      nodes.push(currentRow)
    }
    this.setState({ nodes })
  }

  render() {
    const { nodes } = this.state
    return (
      <div>
      {
        nodes.map((row, rowIndex) => {
          return <div>
            {row.map((node, nodeIndex) => <Node></Node>)}
          </div>
        })
      }
      </div>
    )
  }
}

export default PathfindingVisualizer