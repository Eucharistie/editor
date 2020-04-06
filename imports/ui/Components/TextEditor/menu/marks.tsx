import React from 'react'
import { MarkType } from 'prosemirror-model'
import { EditorState } from 'prosemirror-state'
import {toggleMark} from 'prosemirror-commands'
import { MenuItem, MenuProps } from './menuItem'

export const MarkToggle = (props: {type: MarkType, children?: React.ReactNode} & MenuProps) => {
	const command = toggleMark(props.type)

	function toggle() {
		if (props.view) {
			const view = props.view
			command(view.state, view.dispatch)
		}
	}

	const selected = props.view ? markActive(props.view.state, props.type) : false
	// const disabled = props.view ? command(props.view.state) : true

	return <MenuItem
		selected={selected}
		onClick={toggle}
		onMouseDown={event => event.preventDefault()}>
			{props.children}
	</MenuItem>
}

function markActive(state: EditorState, type: MarkType) {
	let {from, $from, to, empty} = state.selection
	if (empty) return type.isInSet(state.storedMarks || $from.marks()) ? true : false
	else return state.doc.rangeHasMark(from, to, type)
}
