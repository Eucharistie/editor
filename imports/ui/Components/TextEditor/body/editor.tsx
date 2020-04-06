import React, { useState, useEffect } from 'react'

// Prose mirror
import {EditorState, Selection, Transaction} from "prosemirror-state"
import {DirectEditorProps, DecorationSet, Decoration, EditorView} from "prosemirror-view"
import { Plugin } from "prosemirror-state"

import { normalize } from '../lib/tagger'
import { ProseBase, ProseBaseProps } from './base'
import styled from 'styled-components'
import { EditorMenu } from "../menu/main"

interface TextEditorProps {
	onStateChange: (state: EditorState, lastId: number | null) => void
	counter: number,
	menu: {
		update(view: EditorView, previousState: EditorState): void
		destroy(): void
	}
}

class EditorBody extends ProseBase<TextEditorProps> {
	plugins() {
		const editor = this
		return [
			placeholderPlugin("Voeg tekst toe"),
			new Plugin({
				view(viewer) {
					editor.props.menu.update(viewer, viewer.state)
					return editor.props.menu
				}
			}),
			...super.plugins(),
		]
	}

	getViewConfiguration(): DirectEditorProps {
		const editor = this
		return {
			dispatchTransaction(transaction) {
				const view = editor.prose
				if (view) {
					if (transaction.docChanged) {
						const normalisation = normalize(transaction, editor.props.counter)
						const newState = view.state.apply(normalisation.transaction)
						view.updateState(newState)
						window.clearTimeout(editor.updateTimer)
						editor.updateTimer = window.setTimeout(() => {
							newState.doc.attrs.version +=1
							editor.props.onStateChange(newState, normalisation.lastId)
						}, 500)
					} else {
						view.updateState(view.state.apply(transaction))
					}
				}
			},
			...super.getViewConfiguration(),
		}
	}
}

export const TextEditor = (props: ProseBaseProps & TextEditorProps) => {
	const [view, setView] = useState(undefined as EditorView|undefined)
	const [selection, setSelection] = useState([0, 0])

	return <>
		<TranslucentEditorMenu view={view} selection={selection}/>
		<EditorBody {...props} menu={{update(view) {setView(view), setSelection([view.state.selection.from, view.state.selection.to])}, destroy() {setView(undefined)}}} />
	</>
}

const TranslucentEditorMenu = styled(EditorMenu)`
	background: rgba(255,255,255, 0.8);
	backdrop-filter: blur(5px);
	position: sticky;
	top: 0;
	padding: 4px 0;
`

function placeholderPlugin(placeholder: string) {
	return new Plugin({
		props: {
			decorations(state) {
				let doc = state.doc
				if (doc.childCount == 1 && doc.firstChild?.isTextblock && doc.firstChild.content.size == 0)
				return DecorationSet.create(doc, [Decoration.widget(1, document.createTextNode(placeholder))])
			}
		}
	})
}