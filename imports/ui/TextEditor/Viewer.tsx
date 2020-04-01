// Prose mirror
import {DirectEditorProps} from "prosemirror-view"

import { ProseBase } from './base'
import styled from 'styled-components'

interface TextViewerProps {
	onLinkTag(id: number): void
}

class UnstyledTextLinker extends ProseBase<TextViewerProps> {
	getConfiguration(): DirectEditorProps {
		return {
			editable() {return false},
			...super.getConfiguration()
		}
	}
}

export const TextLinker = styled(UnstyledTextLinker)`
margin-top: 8px;
min-height: 5em;

@font-face {
    font-family: "Liturgy";
    src: url("/liturgy.woff2") format("woff2");
}

.tagged:hover {
	background: green
}

.tagged {
	display: block
}
`