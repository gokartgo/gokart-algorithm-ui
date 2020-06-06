import React, { PureComponent } from 'react'
import Node from './Node/Node'
import Dijkstra, { findPathGraph, travelGraph } from '/algorithms/dijkstra'
import './PathfindingVisualizer.scss'

const START_ROW = 2
const START_COLUMN = 2
const END_ROW = 8
const END_COLUMN = 8

class PathfindingVisualizer extends PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			nodes: [],
		}
	}

	componentDidMount() {
		const nodes = []
		for (let row = 0; row < 10; row++) {
			const currentRow = []
			for (let col = 0; col < 10; col++) {
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
		const findPath = findPathGraph(nodes, startNode, endNode)
		const travel = travelGraph(nodes, startNode, endNode)
		for (let i = 0; i < findPath.length; i++) {
			setTimeout(() => {
				document
					.getElementById(`node-${findPath[i][0]}-${findPath[i][1]}`)
					.classList.add('node-visited')
			}, 20 * i)
		}
		let start = findPath.length * 20
		for (let i = travel.length - 2; i >= 0; i--) {
			// newNodes[shorestPath[i].row][shorestPath[i].col].isVisited = true
			setTimeout(() => {
				document.getElementById(
					`node-${travel[i][0]}-${travel[i][1]}`,
				).style.backgroundColor = 'pink'
			}, start + 20 * (travel.length - 1 - i))
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
