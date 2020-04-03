// Prose mirror
import {DirectEditorProps, EditorView} from "prosemirror-view"
import { ProseBase } from './base'
import {hasLineTag} from './tagger'
import styled from 'styled-components'
import { CuePoint } from '/imports/api/collections/Timeline'

interface TextViewerProps {
	onLinkTag(id: number): void,
	timeline: CuePoint[]
}

class UnstyledTextLinker extends ProseBase<TextViewerProps> {
	link(view: EditorView, pos: number, event: MouseEvent) {
		const node = view.state.doc.nodeAt(pos)
		if (node) {
			const tag = hasLineTag(node)
			if (tag) {
				event.preventDefault()
				this.props.onLinkTag(tag.attrs.id)
				return true
			}
		}
		
		return false
	}

	getConfiguration(): DirectEditorProps {
		const editor = this
		return {
			editable() {return false},
			handleClickOn: (view, pos, _i, _s, event) => editor.link(view, pos, event),
			...super.getConfiguration()
		}
	}
}

export const TextLinker = styled(UnstyledTextLinker)`
user-select: none;

.tagged:hover {
	background: #eee4c3;
	padding: 0.25em 0;
}

.tagged {
	cursor: pointer;
}
`