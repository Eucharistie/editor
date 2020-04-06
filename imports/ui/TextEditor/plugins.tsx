import { inputRules, smartQuotes, undoInputRule} from "prosemirror-inputrules";
import { keymap } from "prosemirror-keymap";
import { history, redo, undo} from "prosemirror-history";
import {
    baseKeymap,
    joinDown,
    joinUp,
    toggleMark
} from "prosemirror-commands";
import { dropCursor} from "prosemirror-dropcursor";
import { gapCursor} from "prosemirror-gapcursor";
import { mac, schema} from './schema'
import { EditorState, Transaction } from "prosemirror-state";
import { toggleNodeAttribute } from './commands'


function insertHardBreak(state: EditorState, dispatch?: (tr: Transaction) => boolean) {
    if (dispatch) {
        dispatch(state.tr
            .replaceSelectionWith(schema.nodes.hard_break.create())
        )
    }
}

const macCommands = !mac ? {} : {
	"Ctrl-Enter": insertHardBreak
}

export const plugins = [
    inputRules({ rules: smartQuotes }),
    keymap({
        "Mod-z": undo,
        "Shift-Mod-z": redo,
        "Backspace": undoInputRule,
        "Alt-ArrowUp": joinUp,
        "Alt-ArrowDown": joinDown,
        "Mod-b": toggleMark(schema.marks.strong),
        "Mod-B": toggleMark(schema.marks.strong),
        "Mod-i": toggleMark(schema.marks.em),
        "Mod-I": toggleMark(schema.marks.em),
        "Mod-Enter":   insertHardBreak,
        "Shift-Enter": insertHardBreak,
        "Ctrl-Alt-n": insertHardBreak,
        ...macCommands,
        "Ctrl-r": toggleNodeAttribute([
            schema.nodes.verse,
            schema.nodes.paragraph
        ], 'isRefrain')
    }),
    keymap(baseKeymap),
    dropCursor(),
    gapCursor(),
    history()
]
