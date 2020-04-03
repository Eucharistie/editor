import React from 'react'
// Prose mirror
import {EditorState} from "prosemirror-state"
import {EditorView, DirectEditorProps} from "prosemirror-view"
import {schema} from './schema'
import {plugins as basePlugins} from './plugins'
import {validateState} from './tagger'
import styled from 'styled-components'
import {Plugin} from "prosemirror-state"

interface ProseBaseProps {
    editorStateJSON: any

    // ClassName for styled components
    className?: string
}

export class ProseBase<T> extends React.Component<T & ProseBaseProps> {

    editorDomNode: React.RefObject<HTMLDivElement> = React.createRef()
    prose?: EditorView

    render() {
        return <Base className={this.props.className} ref={this.editorDomNode}>This is a text editor</Base>
    }

    plugins(): Plugin[] {
        return basePlugins
    }

    componentDidUpdate() {
        if (this.props.editorStateJSON) {
            const newState = this.parseJSON()
            if (this.prose) {
                if (this.prose.state.doc.content.findDiffStart(newState.doc.content) != null) {
                    const scrollTop = this.editorDomNode.current!.scrollTop
                    this.prose.updateState(newState)
                    this.editorDomNode.current!.scrollTop = scrollTop
                }
            }
        }
    }

    parseJSON() {
        const config = {schema, plugins: this.plugins()}
        const state = this.props.editorStateJSON ? EditorState.fromJSON(
            config,
            this.props.editorStateJSON
        ) : EditorState.create(config)
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

const Base = styled.div`
min-height: 5em;

& > *:first-child {
    margin-top: 0;
}

@font-face {
    font-family: "Liturgy";
    src: url("/liturgy.woff2") format("woff2");
}
`