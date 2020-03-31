import React from 'react'
// Prose mirror
import {EditorState, Transaction} from "prosemirror-state"
import {EditorView} from "prosemirror-view"
import {schema} from './schema'
import {plugins} from './plugins'
import styled from 'styled-components'
import { Node as ProseNode, Schema } from 'prosemirror-model'

interface TextEditorProps {
	editorStateJSON: any
	onStateChange: (state: EditorState) => void
	editable?: boolean
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
		return EditorState.fromJSON({schema, plugins}, this.props.editorStateJSON)
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
								const newState = view.state.apply(normalize(transaction))
								editor.props.onStateChange(newState)
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


const uniqueId = (function() {
	let counter = 0
	return function(): number {
		return counter++
	}
})()

function normalize(transaction: Transaction) {
	// normChildren(transaction.doc)
	// console.log(transaction.doc)
	let position = -1
	let lineStart = position
	let lineEnd = position
	let lineId: number|null = null

	let newTransaction = transaction
	let ids = new Set<number>()
	normChildren(transaction.doc)
	return newTransaction

	function normChildren(node: ProseNode) {
		position += 1;
		// @ts-ignore
		const children = node.content.content as! ProseNode[]
		lineStart = position
		lineEnd = position
		for (let cursor = 0; cursor<children.length; cursor++) {
			const node = children[cursor]
			if (node.isText) {
				position += node.nodeSize
				lineEnd = position
				if (lineId == null) {
					const lineTag = hasLineTag(node)
					if (lineTag && !ids.has(lineTag.attrs.id)) lineId = lineTag.attrs.id
				}
			} else {
				if (lineEnd > lineStart) { mark() }
				if (node.isLeaf) {
					position += 1
					lineStart = lineEnd = position
				}
				else normChildren(node)
			}
		}
		if (lineEnd > lineStart) { mark() }
		position += 1
	}

	function mark() {
		newTransaction = transaction.removeMark(lineStart, lineEnd+1, schema.marks.taggedLine)
		let newId = lineId ?? uniqueId()
		lineId = null
		newTransaction = transaction.addMark(
			lineStart, lineEnd,
			schema.marks.taggedLine.create({id: newId})
		)
		ids.add(newId)
		lineStart = lineEnd = position
	}
}

function hasLineTag(textNode: ProseNode<typeof schema>) {
	return schema.marks.taggedLine.isInSet(textNode.marks)
}