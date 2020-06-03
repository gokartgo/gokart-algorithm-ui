import React, { PureComponent } from 'react'
import Node from './Node/Node'

class PathfindingVisualizer extends PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			nodes: [],
		}
	}

	componentDidMount() {
		const nodes = []
		for (let row = 0; row < 15; row++) {
			const currentRow = []
			for (let col = 0; col < 40; col++) {
				const currnetNode = {
					row,
					col,
					isStart: row === 10 && col === 5 ? true : false,
					isFinish: row === 10 && col === 35 ? true : false,
				}
				currentRow.push(currnetNode)
			}
			nodes.push(currentRow)
		}
		this.setState({ nodes })
	}

	render() {
		const { nodes } = this.state
		return (
			<div>
				{nodes.map((row, rowIndex) => {
					return (
						<div key={`row-${rowIndex}`}>
							{row.map((node, nodeIndex) => {
								const { isStart, isFinish } = node
								return (
									<Node
										key={`node-${rowIndex}-${nodeIndex}`}
										isStart={isStart}
										inFinish={isFinish}></Node>
								)
							})}
						</div>
					)
				})}
			</div>
		)
	}
}

export default PathfindingVisualizer
