// Prose mirror
import {DirectEditorProps, EditorView} from "prosemirror-view"
import { ProseBase } from './base'
import {hasLineTag} from '../lib/tagger'
import styled from 'styled-components'
import { CuePoint } from '/imports/api/collections/Timeline'

interface TextLinkerProps {
	onLinkTag(id: number): void,
	timeline: CuePoint[]
}

class UnstyledTextLinker extends ProseBase<TextLinkerProps> {
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

	getViewConfiguration(): DirectEditorProps {
		const editor = this
		return {
			editable() {return false},
			handleClickOn: (view, pos, _i, _s, event) => editor.link(view, pos, event),
			...super.getViewConfiguration()
		}
	}
}

export const TextLinker = styled(UnstyledTextLinker)`
	user-select: none;

	.tagged:hover {
		background: rgb(199, 223, 241);
		padding: 5px 0;
		border-radius: 5px;
	}

	.tagged {
		cursor: pointer;
	}
`