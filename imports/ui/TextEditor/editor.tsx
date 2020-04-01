import React from 'react'
// Prose mirror
import {EditorState, Transaction} from "prosemirror-state"
import {EditorView} from "prosemirror-view"
import {schema} from './schema'
import {plugins} from './plugins'
import styled from 'styled-components'
import { Node as ProseNode, Mark } from 'prosemirror-model'

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

function normalize(transaction: Transaction, countFrom: number) {
	const uniqueId = (function() {
		let counter = countFrom + 1
		return function(): number {
			return counter++
		}
	})()

	let newTransaction = transaction
	const ids = new Set<number>()

	let previousNode: ProseNode|null = null
	let previousId: number|null = null
	let previousParent: ProseNode|null = null
	transaction.doc.descendants(function(node, pos, parent) {
		if (node.isText) {
			let canMerge = false
			if (previousNode?.isText && parent == previousParent) {
				const previousMarks = allMarksExceptTag(previousNode)
				const currentMarks = allMarksExceptTag(node)
				canMerge = Mark.sameSet(previousMarks, currentMarks)
			}
			if (canMerge && previousId !== null) {
				newTransaction = newTransaction.removeMark(pos, pos+node.nodeSize, schema.marks.taggedLine)
				addNewTag(previousId)
			} else {
				const tag = hasLineTag(node)
				if (tag) {
					if (ids.has(tag.attrs.id)) {
						newTransaction = newTransaction.removeMark(pos, pos+node.nodeSize, schema.marks.taggedLine)
						addNewTag(uniqueId())
					} else {
						ids.add(tag.attrs.id)
						previousId = tag.attrs.id
					}
				} else {
					addNewTag(uniqueId())
				}
			}
		} else if (node.isLeaf) {
			newTransaction = newTransaction.removeMark(pos, pos+node.nodeSize)
		}

		previousNode = node
		previousParent = parent

		function addNewTag(newId: number) {
			newTransaction = newTransaction.addMark(pos, pos+node.nodeSize, schema.marks.taggedLine.create({id: newId}))
			ids.add(newId)
			previousId = newId
		}
	})
	return {transaction: newTransaction, lastId: previousId}
}

function hasLineTag(textNode: ProseNode<typeof schema>) {
	return schema.marks.taggedLine.isInSet(textNode.marks)
}

function allMarksExceptTag(node: ProseNode) {
	return node.marks.filter(mark => mark.type != schema.marks.taggedLine)
}

function validateState(state: EditorState) {
	const ids = new Set<number>()
	state.doc.descendants(function(node) {
		const tag = hasLineTag(node)
		if (tag) {
			if (ids.has(tag.attrs.id)) {
				console.log('Found duplicate tag', tag.attrs.id)
			}
			ids.add(tag.attrs.id)
		}
	})
}