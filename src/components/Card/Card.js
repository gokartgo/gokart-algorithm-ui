import React from 'react'
import PropTypes from 'prop-types'
import { ReactComponent as Sort } from '/assets/icon/sort.svg'
import './Card.scss'

const card = props => (
	<section className='card-container'>
		<header>
			<Sort className='card-icon' />
			<h3 className='card-title'>Sort</h3>
			<p className='card-detail'>
				- Quick Sort
				<br />- Bubble Sort
				<br />- Insert Sort
			</p>
		</header>
	</section>
)

card.propTypes = {
	btnType: PropTypes.string,
}

card.defaultProps = {
	btnType: '',
}

export default card
