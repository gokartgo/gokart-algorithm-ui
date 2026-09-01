import React, { type ReactNode } from 'react'
import './Button.scss'

interface ButtonProps {
	disabled?: boolean
	class?: string
	clicked?: () => void
	children?: ReactNode
	btnType?: string
}

const button = (props: ButtonProps) => (
	<button
		disabled={props.disabled}
		className={`Button ${props.class}`}
		onClick={props.clicked}>
		{props.children}
	</button>
)

export default button
