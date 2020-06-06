import React, { PureComponent } from 'react'
import Node from './Node/Node'
import Dijkstra from '/algorithms/dijkstra'
import './PathfindingVisualizer.scss'

const START_ROW = 6
const START_COLUMN = 2
const END_ROW = 13
const END_COLUMN = 25

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
		for (let i = 0; i < shorestPath[0].length; i++) {
			// newNodes[shorestPath[i].row][shorestPath[i].col].isVisited = true
			setTimeout(() => {
				document
					.getElementById(
						`node-${shorestPath[0][i].row}-${shorestPath[0][i].col}`,
					)
					.classList.add('node-visited')
			}, 20 * i)
		}
		let start = shorestPath[0].length * 20
		for (let i = shorestPath[1].length - 2; i >= 0; i--) {
			// newNodes[shorestPath[i].row][shorestPath[i].col].isVisited = true
			setTimeout(() => {
				document.getElementById(
					`node-${shorestPath[1][i].row}-${shorestPath[1][i].col}`,
				).style.backgroundColor = 'pink'
			}, start + 20 * (shorestPath[1].length - 1 - i))
		}
		// this.setState({ nodes: newNodes })
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
							<div id={`row-${rowIndex}`}>
								{row.map((node, nodeIndex) => {
									const { isStart, isFinish, isVisited } = node
									return (
										<Node
											id={`node-${rowIndex}-${nodeIndex}`}
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
