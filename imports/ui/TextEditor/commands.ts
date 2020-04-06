import {chainCommands, exitCode} from "prosemirror-commands";
import { NodeSpec, NodeType, ResolvedPos, Node as ProseNode } from "prosemirror-model";
import { EditorState, Transaction, Selection } from "prosemirror-state";
import { findParentNode, findParentNodeOfType } from 'prosemirror-utils'

export function replaceSelectionWith(nodeSpec: NodeSpec) {
    return chainCommands(exitCode, (state, dispatch) => {
		if (dispatch)
        	dispatch(state.tr.replaceSelectionWith(nodeSpec.create()).scrollIntoView())
        return true
    })
}

export function toggleNodeAttribute(nodeType: NodeType[], attributeName: string) {
    return function(state: EditorState, dispatch: (tr: Transaction)=>void) {
		const info = findParentNodeOfType(nodeType)(state.selection)
        if (info) {
			const {pos, node} = info
        	if (node && dispatch) {
				dispatch(state.tr.setNodeMarkup(pos, null, {[attributeName]: !node.attrs[attributeName]}))
				return true
			}
		}
        return false
    }
}