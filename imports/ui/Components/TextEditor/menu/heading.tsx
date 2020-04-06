import React from 'react'
import { setBlockType } from 'prosemirror-commands'
import { MenuItem, MenuProps } from './menuItem'
import { schema } from '../lib/schema'

export const HeadingToggle = (props: {level: number, children?: React.ReactNode} & MenuProps) => {
	const type = schema.nodes.heading
	const attributes =  {level: props.level}
	const command = setBlockType(type, attributes)

	function toggle() {
		if (props.view) {
			const view = props.view
			command(view.state, view.dispatch)
		}
	}

	let selected = false, disabled = true
	if (props.view) {
		disabled = false
		const {$from, to} = props.view.state.selection
		selected = to <= $from.end() && $from.parent.hasMarkup(type, attributes)
	}

	return <MenuItem
		{...{disabled, selected}}
		onClick={toggle}
		onMouseDown={event => event.preventDefault()}>
			H{props.level}
	</MenuItem>
}