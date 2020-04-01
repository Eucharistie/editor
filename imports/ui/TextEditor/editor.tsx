// Prose mirror
import {EditorState} from "prosemirror-state"
import {DirectEditorProps} from "prosemirror-view"

import {normalize} from './tagger'
import { ProseBase } from './base'
import styled from 'styled-components'

interface TextEditorProps {
	onStateChange: (state: EditorState, lastId: number | null) => void
	counter: number
}

class UnstyledTextEditor extends ProseBase<TextEditorProps> {
	getConfiguration(): DirectEditorProps {
		const editor = this
		return {
			dispatchTransaction(transaction) {
				const view = editor.prose
				if (view) {
					if (transaction.docChanged) {
						const normalisation = normalize(transaction, editor.props.counter)
						const newState = view.state.apply(normalisation.transaction)
						editor.props.onStateChange(newState, normalisation.lastId)
					} else {
						view.updateState(view.state.apply(transaction))
					}
				}
			},
			...super.getConfiguration()
		}
	}
}

export const TextEditor = styled(UnstyledTextEditor)`
margin-top: 8px;
min-height: 5em;

@font-face {
    font-family: "Liturgy";
    src: url("/liturgy.woff2") format("woff2");
}

.tagged:hover {
	background: #eee4c3
}

.tagged {
	//display: inline-block
}
`