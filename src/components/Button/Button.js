import React from 'react'
import PropTypes from 'prop-types'
import './Button.scss'

const button = props => (
	<button
		disabled={props.disabled}
		className={`Button ${props.class}`}
		onClick={props.clicked}>
		{props.children}
	</button>
)

button.propTypes = {
	btnType: PropTypes.string,
}

button.defaultProps = {
	btnType: '',
}

export default button
