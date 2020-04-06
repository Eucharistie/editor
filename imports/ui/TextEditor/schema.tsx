import {Schema} from 'prosemirror-model'
import { Node as ProseNode } from 'prosemirror-model'
import styled, {StyledComponent} from "styled-components"

export const mac = typeof navigator != "undefined" ? /Mac/.test(navigator.platform) : false;

export const boldAndItalic = {
    // :: MarkSpec An emphasis mark. Rendered as an `<em>` element.
    // Has parse rules that also match `<i>` and `font-style: italic`.
    em: {
        parseDOM: [{tag: "i"}, {tag: "em"}, {style: "font-style=italic"}],
        toDOM() {
            return ["em", 0]
        }
    },

    // :: MarkSpec A strong mark. Rendered as `<strong>`, parse rules
    // also match `<b>` and `font-weight: bold`.
    strong: {
        parseDOM: [{tag: "strong"},
            // This works around a Google Docs misbehavior where
            // pasted content will be inexplicably wrapped in `<b>`
            // tags with a font-weight normal.
            {
                tag: "b",
                getAttrs: (node: HTMLElement) => node.style.fontWeight != "normal" && null
            },
            {
                style: "font-weight",
                getAttrs: (value: string) => /^(bold(er)?|[5-9]\d{2,})$/.test(value) && null
            }],
        toDOM() {
            return ["strong", 0]
        }
    }
}

const taggedLine = {
    attrs: {id: -1},
    parseDOM: [
        {
            tag: 'span',
            getAttrs(content: string | HTMLElement) {
                if (content instanceof HTMLElement && content.classList.contains('tagged')) {
                    const start = content.className.indexOf('tag-')
                    const next = content.className.indexOf(' ', start)
                    const end = next == -1 ? content.className.length : next;
                    const id = parseInt(content.className.substr(start + 4, end))
                    return {id}
                }
                return false
            }
        }
    ],
    toDOM(node: ProseNode) {
        return ['span', {class: `tagged tag-${node.attrs.id}`}]
    }
}

export const songElements = {
    song: {
        content: 'verse*',
        attrs: {order: {default: 1}},
        parseDOM: [{tag: "ol", getAttrs(dom: HTMLElement) {
            return {order: parseInt(dom.getAttribute("start") ?? '1')}
        }}],
        toDOM(node: ProseNode) {
            return node.attrs.order == 1 ? ["ol", 0] : ["ol", {start: node.attrs.order}, 0]
        }
    },
    verse: {
        defining: true,
        content: '(text|hard_break)*',
        attrs: {isRefrain: {default: false}},
        toDOM: (node: ProseNode) => ['li', {class: node.attrs.isRefrain ? RefrainClassName : ''}, 0],
        parseDOM: [{
            tag: 'li',
            getAttrs(dom: HTMLElement) {
                if (dom.classList.contains(RefrainClassName)) {
                    return {isRefrain: true}
                }
            }
        }]
    }
}

export const hard_break = {
    inline: true,
    selectable: false,
    parseDOM: [{tag: "br"}],
    toDOM() {
        return ["br"]
    }
}

export const heading = {
    attrs: {level: {default: 1}},
    group: "block",
    defining: true,
    parseDOM: [{tag: "h1", attrs: {level: 1}},
                {tag: "h2", attrs: {level: 2}},
                {tag: "h3", attrs: {level: 3}},
                {tag: "h4", attrs: {level: 4}},
                {tag: "h5", attrs: {level: 5}},
                {tag: "h6", attrs: {level: 6}}],
    toDOM(node: ProseNode) { return ["h" + node.attrs.level, 0] }
}

export const schema = new Schema({
    nodes: {
        doc: {content: '(paragraph|heading|song)+'},
        paragraph: {
            content: "(text|hard_break)*",
            attrs: {isRefrain: {default: false}},
            toDOM: (node: ProseNode) => ['p', {class: node.attrs.isRefrain ? RefrainClassName : ''}, 0],
            parseDOM: [{
                tag: 'p',
                // @ts-ignore
                getAttrs(dom: HTMLElement) {
                    if (dom.classList.contains(RefrainClassName)) {
                        return {isRefrain: true}
                    }
                }
            }]
        },
        text: {},
        // @ts-ignore
        hard_break,
        // @ts-ignore
        heading: {
            ...heading,
            content: 'text*'
        },
        ...songElements
    },
    // @ts-ignore
    marks: {
        ...boldAndItalic,
        //@ts-ignore
        taggedLine
    }
})

export const Refrain = styled.span`` as StyledComponent<"span", any, {}, never> & {styledComponentId: string}

const RefrainClassName = Refrain.styledComponentId