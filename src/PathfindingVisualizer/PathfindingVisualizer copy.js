import React, { PureComponent } from 'react'
import Node from './Node/Node'
import './PathfindingVisualizer.scss'

const START_ROW = 7
const START_COLUMN = 10
const END_ROW = 10
const END_COLUMN = 35

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
		const newNodes = nodes.map(node => node)
		let row = START_ROW
		let col = START_COLUMN
		let move_row = row
		let move_col = col
		for (let i = 0; i < 40; i++) {
			row = move_row
			for (let j = 0; j < i * 2 + 1; j++) {
				col = move_col
				for (let k = 0; k < 3; k++) {
					const updateNode = newNodes.map(node => node)
					if (k === 1) {
						if (j <= parseInt((i * 2 + 1) / 2)) {
							col -= j
						} else {
							col -= i * 2 - j
						}
					} else if (k === 2) {
						if (j <= parseInt((i * 2 + 1) / 2)) {
							col += j * 2
						} else {
							col += (i * 2 - j) * 2
						}
					}
					if (
						(row - 1 === END_ROW && col === END_COLUMN) ||
						(row === END_ROW && col - 1 === END_COLUMN) ||
						(row === END_ROW && col + 1 === END_COLUMN) ||
						(row + 1 === END_ROW && col === END_COLUMN)
					) {
						return
					}
					if (
						newNodes[row - 1] &&
						newNodes[row - 1][col] &&
						newNodes[row - 1][col].isVisited === false
					) {
						newNodes[row - 1][col].isVisited = true
						await new Promise((res, rej) => {
							setTimeout(() => {
								this.setState({ nodes: updateNode })
								res()
							}, 0)
						})
					}
					if (
						newNodes[row] &&
						newNodes[row][col - 1] &&
						newNodes[row][col - 1].isVisited === false
					) {
						newNodes[row][col - 1].isVisited = true
						await new Promise((res, rej) => {
							setTimeout(() => {
								this.setState({ nodes: updateNode })
								res()
							}, 0)
						})
					}
					if (
						newNodes[row] &&
						newNodes[row][col + 1] &&
						newNodes[row][col + 1].isVisited === false
					) {
						newNodes[row][col + 1].isVisited = true
						await new Promise((res, rej) => {
							setTimeout(() => {
								this.setState({ nodes: updateNode })
								res()
							}, 0)
						})
					}
					if (
						newNodes[row + 1] &&
						newNodes[row + 1][col] &&
						newNodes[row + 1][col].isVisited === false
					) {
						newNodes[row + 1][col].isVisited = true
						await new Promise((res, rej) => {
							setTimeout(() => {
								this.setState({ nodes: updateNode })
								res()
							}, 0)
						})
					}
				}
				row++
			}
			move_row--
		}
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
