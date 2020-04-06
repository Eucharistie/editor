// Prose mirror
import {EditorState} from "prosemirror-state"
import {DirectEditorProps, DecorationSet, Decoration} from "prosemirror-view"

import { normalize } from './tagger'
import { ProseBase } from './base'
import styled from 'styled-components'
import { Plugin } from "prosemirror-state"
import 'prosemirror-menu/style/menu.css'
import {menuBar} from './plugins'

interface TextEditorProps {
	onStateChange: (state: EditorState, lastId: number | null) => void
	counter: number
}

class UnstyledTextEditor extends ProseBase<TextEditorProps> {
	plugins() {
		return [
			placeholderPlugin("Voeg tekst toe"),
			menuBar,
			...super.plugins(),
		]
	}

	getConfiguration(): DirectEditorProps {
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
							editor.props.onStateChange(newState, normalisation.lastId)
						}, 500)
					} else {
						view.updateState(view.state.apply(transaction))
					}
				}
			},
			...super.getConfiguration()
		}
	}
}

export const TextEditor = styled(UnstyledTextEditor)``

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