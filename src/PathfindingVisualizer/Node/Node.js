import React, { Component } from 'react'
import './Node.scss'

class Node extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		const { isStart, isFinish, isVisited, id, clicked, mouseOver } = this.props
		let className = 'node'
		if (isStart) {
			className += ' node-start'
		}
		if (isFinish) {
			className += ' node-finish'
		}
		if (isVisited && !isStart && !isFinish) {
			className += ' node-visited'
		}
		return (
			<div
				id={id}
				className={className}
				onClick={() => clicked()}
				onMouseOver={() => mouseOver()}></div>
		)
	}
}

export default Node

export const DEFAULT_NODE = {
	row: 0,
	col: 0,
}
