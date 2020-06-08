import React, { Component } from 'react'
import Card from '/components/Card/Card'
import './Main.scss'

class Select extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		return (
			<div className='main-container'>
				<Card />
				<Card />
			</div>
		)
	}
}

export default Select
