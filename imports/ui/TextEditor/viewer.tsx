// Prose mirror
import { DirectEditorProps } from "prosemirror-view"
import { ProseBase } from './base'
import 'styled-components'

interface TextViewerProps {}

export class TextViewer extends ProseBase<TextViewerProps> {
	getConfiguration(): DirectEditorProps {
		return {
			editable() {return false},
			...super.getConfiguration()
		}
	}
}