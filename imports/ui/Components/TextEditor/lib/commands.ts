import {chainCommands, exitCode} from "prosemirror-commands";
import { NodeSpec, NodeType, ResolvedPos, Node as ProseNode } from "prosemirror-model";
import { EditorState, Transaction, Selection } from "prosemirror-state";

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

const findParentNodeClosestToPos = ($pos: ResolvedPos, predicate: (node: ProseNode)=>boolean) => {
	for (let i = $pos.depth; i > 0; i--) {
		const node = $pos.node(i);
		if (predicate(node)) {
		return {
			pos: i > 0 ? $pos.before(i) : 0,
			start: $pos.start(i),
			depth: i,
			node
		};
		}
	}
};

const findParentNode = (predicate: (node: ProseNode) => boolean) => ({ $from }: {$from: ResolvedPos}) =>
  findParentNodeClosestToPos($from, predicate);

export const findParentNodeOfType = (nodeType: NodeType|NodeType[]) => (selection: Selection) => {
	return findParentNode(node => equalNodeType(nodeType, node))(selection);
};

const equalNodeType = (nodeType: NodeType|NodeType[], node: ProseNode) => {
	return (
		(Array.isArray(nodeType) && nodeType.indexOf(node.type) > -1) ||
		node.type === nodeType
	);
};