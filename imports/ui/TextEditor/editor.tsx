import React from 'react'
// Prose mirror
import {EditorState} from "prosemirror-state"
import {EditorView} from "prosemirror-view"
import {schema} from './schema'
import {plugins} from './plugins'

interface TextEditorProps {
	editorStateJSON: any
	onStateChange: (state: EditorState) => void
}

export class TextEditor extends React.Component<TextEditorProps> {

	editorDomNode: React.RefObject<HTMLDivElement> = React.createRef()
	prose?: EditorView

	render() {
		return <div ref={this.editorDomNode}>This is a text editor</div>
	}

	componentDidUpdate() {
		if (this.props.editorStateJSON) {
			this.prose?.updateState(this.parseJSON())
		}
	}

	parseJSON() {
		return EditorState.fromJSON({schema, plugins}, this.props.editorStateJSON)
	}

	componentDidMount() {
		const editor = this

		const state = this.props.editorStateJSON ? this.parseJSON() : EditorState.create({schema, plugins});

		if (this.editorDomNode.current) {
			const mount = {mount: this.editorDomNode.current}
			this.prose = new EditorView(
				mount,
				{
					state,
					dispatchTransaction(transaction) {
						const view = editor.prose
						if (view) {
							const newState = view.state.apply(transaction)
							editor.props.onStateChange(newState)
						}
					}
				}
			)
			console.log(this.prose)
		} else {
			console.log('node not found')
		}
	}
}