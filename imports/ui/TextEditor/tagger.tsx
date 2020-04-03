import { Node as ProseNode, Mark } from 'prosemirror-model'
import {EditorState, Transaction} from "prosemirror-state"
import {schema} from './schema'

export function normalize(transaction: Transaction, countFrom: number) {
	const uniqueId = (function() {
		let counter = countFrom + 1
		return function(): number {
			return counter++
		}
	})()

	let newTransaction = transaction
	const ids = new Set<number>()

	let maxId = 0
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
		maxId = Math.max(maxId, previousId ?? 0)

		function addNewTag(newId: number) {
			newTransaction = newTransaction.addMark(pos, pos+node.nodeSize, schema.marks.taggedLine.create({id: newId}))
			ids.add(newId)
			previousId = newId
		}
	})
	return {transaction: newTransaction, lastId: maxId}
}

export function hasLineTag(textNode: ProseNode<typeof schema>) {
	return schema.marks.taggedLine.isInSet(textNode.marks)
}

function allMarksExceptTag(node: ProseNode) {
	return node.marks.filter(mark => mark.type != schema.marks.taggedLine)
}

export function validateState(state: EditorState) {
	const ids = new Set<number>()
	state.doc.descendants(function(node) {
		const tag = hasLineTag(node)
		if (tag) {
			if (ids.has(tag.attrs.id)) {
				console.log('Found duplicate tag', tag.attrs.id)
				return false
			}
			ids.add(tag.attrs.id)
		}
	})
}