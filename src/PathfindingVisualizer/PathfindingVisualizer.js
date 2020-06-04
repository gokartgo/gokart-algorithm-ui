import React, { PureComponent } from 'react'
import Node from './Node/Node'
import Dijkstra from '/algorithms/dijkstra'
import './PathfindingVisualizer.scss'

const START_ROW = 0
const START_COLUMN = 23
const END_ROW = 7
const END_COLUMN = 9

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
			for (let col = 0; col < 50; col++) {
				const currnetNode = this.createNode(row, col)
				currentRow.push(currnetNode)
			}
			nodes.push(currentRow)
		}
		this.setState({ nodes })
	}

	createNode = (row, col) => {
		return {
			row,
			col,
			isStart: row === START_ROW && col === START_COLUMN ? true : false,
			isFinish: row === END_ROW && col === END_COLUMN ? true : false,
			isVisited: false,
		}
	}

	visualizeDijkstra = async () => {
		const { nodes } = this.state
		const startNode = [START_ROW, START_COLUMN]
		const endNode = [END_ROW, END_COLUMN]
		const shorestPath = Dijkstra(nodes, startNode, endNode)
		const newNodes = nodes.map(node => node)
		for (let i = shorestPath.length - 2; i >= 0; i--) {
			newNodes[shorestPath[i].row][shorestPath[i].col].isVisited = true
		}
		this.setState({ nodes: newNodes })
	}

	render() {
		const { nodes } = this.state
		return (
			<div>
				<button
					className='button-visualize'
					onClick={() => this.visualizeDijkstra()}>
					Visualize Dijkstra's Algorithm
				</button>
				<div>
					{nodes.map((row, rowIndex) => {
						return (
							<div key={`row-${rowIndex}`}>
								{row.map((node, nodeIndex) => {
									const { isStart, isFinish, isVisited } = node
									return (
										<Node
											key={`node-${rowIndex}-${nodeIndex}`}
											isStart={isStart}
											isFinish={isFinish}
											isVisited={isVisited}></Node>
									)
								})}
							</div>
						)
					})}
				</div>
			</div>
		)
	}
}

export default PathfindingVisualizer
