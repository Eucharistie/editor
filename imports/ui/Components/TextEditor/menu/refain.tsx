import React from 'react'
import { MarkType } from 'prosemirror-model'
import { toggleRefrain } from '../lib/plugins'
import { MenuItem, MenuProps } from './menuItem'
import { findParentNodeOfType } from '../lib/commands'
import { schema } from '../lib/schema'

export const RefrainToggle = (props: {children?: React.ReactNode} & MenuProps) => {

	function toggle() {
		if (props.view) {
			const view = props.view
			toggleRefrain(view.state, view.dispatch)
		}
	}

	let selected = false, disabled = true
	if (props.view) {
		const info = findParentNodeOfType([schema.nodes.verse, schema.nodes.paragraph])(props.view.state.selection)
		if (info) {
			const {node} = info
			if (node && node.attrs['isRefrain']) {
				selected = true
			}
			disabled = false
		}
	}

	return <MenuItem
		{...{disabled, selected}}
		onClick={toggle}
		onMouseDown={event => event.preventDefault()}>
			{props.children}
	</MenuItem>
}