import React from 'react'
// Prose mirror
import {EditorState, Transaction} from "prosemirror-state"
import {EditorView, DirectEditorProps} from "prosemirror-view"
import {schema, Refrain} from '../lib/schema'
import {plugins as basePlugins} from '../lib/plugins'
import {validateState} from '../lib/tagger'
import styled from 'styled-components'
import {Plugin, Selection} from "prosemirror-state"
import { Node as ProseNode, Mark } from 'prosemirror-model'
import {liturgyFont} from '/imports/ui/style'

export interface ProseBaseProps {
    editorStateJSON: any

    // ClassName for styled components
    className?: string

    onChange?: (transaction: Transaction<typeof schema>) => void
}

export class ProseBase<T> extends React.Component<T & ProseBaseProps> {
    editorDomNode: React.RefObject<HTMLDivElement> = React.createRef()
    prose?: EditorView<typeof schema>

    constructor(props: T & ProseBaseProps) {
        super(props)
        console.log('creating prose base')
    }

    render() {
        return <Base className={this.props.className} ref={this.editorDomNode}>This is a text editor</Base>
    }

    plugins(): Plugin[] {
        return basePlugins
    }

    getStateConfiguration() {
        return {schema, plugins: this.plugins()}
    }

    getViewConfiguration(): DirectEditorProps<typeof schema> {
        return { 
            state: this.parseJSON(this.props.editorStateJSON)
        }
    }

    parseJSON(json: any) {
        return json ?
            EditorState.fromJSON(this.getStateConfiguration(), json) :
            EditorState.create(this.getStateConfiguration())
    }

    componentDidUpdate() {
        if (this.props.editorStateJSON) {
            const newState = this.parseJSON(this.props.editorStateJSON)
            if (this.prose && newState.doc.attrs.version > this.prose.state.doc.attrs.version) {
                if (this.prose.state.doc.content.findDiffStart(newState.doc.content) != null) {
                    const scrollTop = this.editorDomNode.current!.scrollTop
                    this.prose.updateState(newState)
                    this.editorDomNode.current!.scrollTop = scrollTop
                }
            }
        }
    }

    componentDidMount() {
        console.log('mount')
        if (this.editorDomNode.current) {
            const mount = {mount: this.editorDomNode.current}
            this.prose = new EditorView( mount, this.getViewConfiguration() )
            console.log('mounting prose base')
        }
    }
}

const Base = styled.div`
min-height: 5em;

& > *:first-child {
    margin-top: 0;
}

${Refrain}::before {
	content: 'R.';
	font-family: ${liturgyFont};
}
`