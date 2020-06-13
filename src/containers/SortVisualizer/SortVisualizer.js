import React, { Component } from 'react'
import { Fragment, Button } from '/components'
import BubbleSort from '/algorithms/bubble_sort'
import QuickSort from '/algorithms/quick_sort'
import './SortVisualizer.scss'

class SortVisualizer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			array: [],
			timeouts: [],
		}
	}

	componentDidMount() {
		this.setArray()
	}

	randomIntFromInterval(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min)
	}

	setArray() {
		const array = []
		for (let i = 0; i < 100; i++) {
			array.push(this.randomIntFromInterval(5, 400))
		}
		this.setState({ array, timeouts: [] })
	}

	resetArray() {
		const { timeouts } = this.state
		for (let i = 0; i < timeouts.length; i++) {
			clearTimeout(timeouts[i])
		}
		for (let i = 0; i < 100; i++) {
			document.getElementById(`sort-${i}`).classList.remove('bar-select')
		}
	}

	quickSort() {
		this.resetArray()
		const { array, timeouts } = this.state
		const newArray = array.map(data => data)
		const newTimeouts = QuickSort(newArray, 0, newArray.length - 1, timeouts)
		this.setState({ timeouts: newTimeouts })
	}

	bubbleSort() {
		this.resetArray()
		const { array, timeouts } = this.state
		const newTimeouts = BubbleSort(array, timeouts)
		this.setState({ timeouts: newTimeouts })
	}

	render() {
		const { array } = this.state
		return (
			<Fragment>
				<div className='bar-container'>
					{array.map((value, idx) => {
						return (
							<div
								className='bar'
								style={{ height: `${value}px` }}
								key={`sort-${idx}`}
								id={`sort-${idx}`}
							/>
						)
					})}
				</div>
				<Button
					class=''
					clicked={() => {
						this.resetArray()
						this.setArray()
					}}>
					New Pattern
				</Button>
				<Button class='' clicked={() => this.bubbleSort()}>
					Bubble Sort
				</Button>
				<Button class='' clicked={() => this.quickSort()}>
					Quick Sort
				</Button>
			</Fragment>
		)
	}
}

export default SortVisualizer
