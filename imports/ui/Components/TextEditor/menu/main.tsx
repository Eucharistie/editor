import React, {useEffect, useState} from 'react'
import { Flex, SubNav, Text } from '@primer/components'
import { EditorView } from 'prosemirror-view'
import { MarkType } from 'prosemirror-model'
import { EditorState } from 'prosemirror-state'
import styled from 'styled-components'
import {toggleMark} from 'prosemirror-commands'
import { schema } from '../lib/schema'
import { liturgyFont } from '/imports/ui/style'

export interface MenuProps {
	view?: EditorView,

}

export const EditorMenu = (props: {className?: string} & MenuProps) => {
	return <SubNav className={props.className} size='small'>
		<Flex>
			<HeaderKnob/>
			<Link selected>H2</Link>
			<Link>H3</Link>
		</Flex>
		<Flex>
			<Link>Paragraph</Link>
			<Link>Song</Link>
		</Flex>
		<Flex>
			<MarkToggle type={schema.marks.strong} view={props.view}>B</MarkToggle>
			<MarkToggle type={schema.marks.em} view={props.view}><Text fontStyle={'italic'}>i</Text></MarkToggle>
			<Link onClick={() => console.log(props.view?.state.selection.head)}><Text fontFamily={liturgyFont}>R</Text></Link>
		</Flex>
	</SubNav>
}

const MarkToggle = (props: {type: MarkType, children?: React.ReactNode} & MenuProps) => {
	const command = toggleMark(props.type)

	function toggle() {
		if (props.view) {
			const view = props.view
			command(view.state, view.dispatch)
		}
	}

	const selected = props.view ? markActive(props.view.state, props.type) : false
	// const disabled = props.view ? command(props.view.state) : true

	return <Link
		selected={selected}
		onClick={toggle}
		onMouseDown={event => event.preventDefault()}>
			{props.children}
	</Link>
}

function markActive(state: EditorState, type: MarkType) {
	let {from, $from, to, empty} = state.selection
	if (empty) return type.isInSet(state.storedMarks || $from.marks()) ? true : false
	else return state.doc.rangeHasMark(from, to, type)
}

const HeaderKnob = (props: MenuProps) => {
	return <Link>H1</Link>
}

const Link = styled(SubNav.Link)`
	background: rgba(255,255,255, 0.6);
	cursor: pointer;
	user-select: none;
	padding-left: 10px;
	padding-right: 10px;
	${(props: {disabled?: boolean}) => props.disabled && 'color: #DDD;'}
`
