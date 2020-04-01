import React from 'react'
// Prose mirror
import {EditorState, Transaction} from "prosemirror-state"
import {EditorView} from "prosemirror-view"
import {schema} from './schema'
import {plugins} from './plugins'
import styled from 'styled-components'
import {normalize, validateState} from './tagger'

interface TextEditorProps {
	editorStateJSON: any
	onStateChange: (state: EditorState, lastId: number | null) => void
	editable?: boolean,
	counter: number
}

export class TextEditor extends React.Component<TextEditorProps> {

	editorDomNode: React.RefObject<HTMLDivElement> = React.createRef()
	prose?: EditorView

	render() {
		return <StyledEditor ref={this.editorDomNode}>This is a text editor</StyledEditor>
	}

	componentDidUpdate() {
		if (this.props.editorStateJSON) {
			this.prose?.updateState(this.parseJSON())
		}
	}

	parseJSON() {
		const state = EditorState.fromJSON({schema, plugins}, this.props.editorStateJSON)
		setTimeout(()=> validateState(state), 200)
		return state
	}

	componentDidMount() {
		const editor = this

		const state = this.props.editorStateJSON ? this.parseJSON() : EditorState.create({schema, plugins});
		const editable = this.props.editable ?? true

		if (this.editorDomNode.current) {
			const mount = {mount: this.editorDomNode.current}
			this.prose = new EditorView(
				mount,
				{
					state,
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
					editable: () => editable
				}
			)
			console.log(this.prose)
		} else {
			console.log('node not found')
		}
	}
}

const StyledEditor = styled.div`
.tagged {
	border: 1px solid gray;
}
`