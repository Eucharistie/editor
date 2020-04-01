import React from 'react'
// Prose mirror
import {EditorState} from "prosemirror-state"
import {EditorView, EditorProps, DirectEditorProps} from "prosemirror-view"
import {schema} from './schema'
import {plugins} from './plugins'
import {validateState} from './tagger'

interface ProseBaseProps {
    editorStateJSON: any

    // ClassName for styled components
    className?: string
}

export class ProseBase<T> extends React.Component<T & ProseBaseProps> {

    editorDomNode: React.RefObject<HTMLDivElement> = React.createRef()
    prose?: EditorView

    render() {
        return <div className={this.props.className} ref={this.editorDomNode}>This is a text editor</div>
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

    getConfiguration(): DirectEditorProps {
        return { state: this.parseJSON() }
    }

    componentDidMount() {

        if (this.editorDomNode.current) {
            const mount = {mount: this.editorDomNode.current}
            this.prose = new EditorView( mount, this.getConfiguration() )
        }
    }
}