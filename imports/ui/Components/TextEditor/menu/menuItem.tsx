import styled from 'styled-components'
import { SubNav } from '@primer/components'
import { EditorView } from 'prosemirror-view'

export interface MenuProps {
	view?: EditorView
}

export const MenuItem = styled(SubNav.Link)`
	background: rgba(255,255,255, 0.6);
	cursor: pointer;
	user-select: none;
	padding-left: 10px;
	padding-right: 10px;
	${(props: {disabled?: boolean}) => props.disabled && 'color: #DDD;'}
`
