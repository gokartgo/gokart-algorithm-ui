import React, { PureComponent } from 'react'
import { Node, Fragment } from '/components'
import { findPathGraph, travelGraph } from '/algorithms/dijkstra'
import './PathfindingVisualizer.scss'

const START_ROW = 5
const START_COLUMN = 2
const END_ROW = 8
const END_COLUMN = 45

class PathfindingVisualizer extends PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			startNode: { row: START_ROW, col: START_COLUMN },
			endNode: { row: END_ROW, col: END_COLUMN },
			nodes: [],
			isCreateBlock: false,
			selectStart: false,
			selectEnd: false,
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
		const { startNode, endNode } = this.state

		return {
			row,
			col,
			isStart: row === startNode.row && col === startNode.col ? true : false,
			isEnd: row === endNode.row && col === endNode.col ? true : false,
		}
	}

	visualizeDijkstra = async () => {
		const { nodes, startNode, endNode } = this.state
		const findPath = findPathGraph(
			nodes,
			[startNode.row, startNode.col],
			[endNode.row, endNode.col],
		)
		const travel = travelGraph(
			nodes,
			[startNode.row, startNode.col],
			[endNode.row, endNode.col],
		)
		for (let i = 0; i < findPath.length; i++) {
			setTimeout(() => {
				document
					.getElementById(`node-${findPath[i][0]}-${findPath[i][1]}`)
					.classList.add('node-visited')
			}, 20 * i)
		}
		let start = findPath.length * 20
		for (let i = travel.length - 2; i >= 0; i--) {
			setTimeout(() => {
				document.getElementById(
					`node-${travel[i][0]}-${travel[i][1]}`,
				).style.backgroundColor = 'pink'
			}, start + 100 * (travel.length - 1 - i))
		}
	}

	setWall = (nodes, rowIndex, nodeIndex) => {
		document.getElementById(
			`node-${rowIndex}-${nodeIndex}`,
		).style.backgroundColor = 'orange'
		nodes[rowIndex][nodeIndex].row = -Math.abs(nodes[rowIndex][nodeIndex].row)
		nodes[rowIndex][nodeIndex].col = -Math.abs(nodes[rowIndex][nodeIndex].col)
	}

	mouseOverBlock = (rowIndex, nodeIndex) => {
		const { nodes, isCreateBlock, startNode, endNode } = this.state
		if (
			isCreateBlock &&
			(rowIndex !== startNode.row || nodeIndex !== startNode.col) &&
			(rowIndex !== endNode.row || nodeIndex !== endNode.col)
		) {
			this.setWall(nodes, rowIndex, nodeIndex)
			this.setState({ nodes })
		}
	}

	isWall = (rowIndex, nodeIndex) => {
		const { nodes } = this.state
		return (
			nodes[rowIndex][nodeIndex].row < 0 && nodes[rowIndex][nodeIndex].col < 0
		)
	}

	clickBlock = (rowIndex, nodeIndex) => {
		const {
			nodes,
			isCreateBlock,
			startNode,
			endNode,
			selectStart,
			selectEnd,
		} = this.state

		if (
			(rowIndex !== startNode.row || nodeIndex !== startNode.col) &&
			(rowIndex !== endNode.row || nodeIndex !== endNode.col)
		) {
			if (
				!this.isWall(rowIndex, nodeIndex) &&
				selectStart &&
				(rowIndex !== endNode.row || nodeIndex !== endNode.col)
			) {
				this.setState({
					startNode: { row: rowIndex, col: nodeIndex },
					selectStart: !selectStart,
				})
			} else if (
				!this.isWall(rowIndex, nodeIndex) &&
				selectEnd &&
				(rowIndex !== startNode.row || nodeIndex !== startNode.col)
			) {
				this.setState({
					endNode: { row: rowIndex, col: nodeIndex },
					selectEnd: !selectEnd,
				})
			} else if (!selectStart && !selectEnd) {
				this.setWall(nodes, rowIndex, nodeIndex)
				this.setState({ nodes, isCreateBlock: !isCreateBlock })
			}
		} else if (
			rowIndex === startNode.row &&
			nodeIndex === startNode.col &&
			selectEnd === false
		) {
			this.setState({ selectStart: !selectStart })
		} else if (
			rowIndex === endNode.row &&
			nodeIndex === endNode.col &&
			selectStart === false
		) {
			this.setState({ selectEnd: !selectEnd })
		}
	}

	render() {
		const { nodes, startNode, endNode, selectStart, selectEnd } = this.state
		return (
			<Fragment>
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
									return (
										<Node
											id={`node-${rowIndex}-${nodeIndex}`}
											isStart={
												rowIndex === startNode.row &&
												nodeIndex === startNode.col
											}
											isEnd={
												rowIndex === endNode.row && nodeIndex === endNode.col
											}
											selectStart={selectStart}
											selectEnd={selectEnd}
											clicked={() => {
												this.clickBlock(rowIndex, nodeIndex)
											}}
											mouseOver={() => {
												this.mouseOverBlock(rowIndex, nodeIndex)
											}}></Node>
									)
								})}
							</div>
						)
					})}
				</div>
			</Fragment>
		)
	}
}

export default PathfindingVisualizer
