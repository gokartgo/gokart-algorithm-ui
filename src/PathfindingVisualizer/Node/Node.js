import React, { Component } from 'react'
import './Node.scss'

class Node extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		const { isStart, inFinish } = this.props
		let className = 'node'
		if (isStart) {
			className += ' node-start'
		}
		if (inFinish) {
			className += ' node-finish'
		}
		return <div className={className}></div>
	}
}

export default Node

export const DEFAULT_NODE = {
	row: 0,
	col: 0,
}
