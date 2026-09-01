import type { ReactNode } from 'react'

interface FragmentProps {
	children?: ReactNode
}

const Fragment = (props: FragmentProps): ReactNode => props.children
export default Fragment
