"use client"

import * as React from "react"
import { CodeHighlightNode, CodeNode } from "@lexical/code"
import { AutoLinkNode, LinkNode } from "@lexical/link"
import { ListItemNode, ListNode } from "@lexical/list"
import {
  $convertFromMarkdownString,
  $convertToMarkdownString,
  CHECK_LIST,
  ELEMENT_TRANSFORMERS,
  MULTILINE_ELEMENT_TRANSFORMERS,
  TEXT_FORMAT_TRANSFORMERS,
  TEXT_MATCH_TRANSFORMERS,
} from "@lexical/markdown"
import { OverflowNode } from "@lexical/overflow"
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin"
import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer"
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary"
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode"
import { HorizontalRulePlugin } from "@lexical/react/LexicalHorizontalRulePlugin"
import { ListPlugin } from "@lexical/react/LexicalListPlugin"
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { TablePlugin } from "@lexical/react/LexicalTablePlugin"
import { HeadingNode, QuoteNode } from "@lexical/rich-text"
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table"
import { EditorState, $getRoot } from "lexical"
import { ParagraphNode, TextNode } from "lexical"

import { editorTheme } from "@/components/editor/themes/editor-theme"
import { ContentEditable } from "@/components/editor/editor-ui/content-editable"
import { MarkdownToolbarPlugin } from "@/components/editor/plugins/toolbar/markdown-toolbar-plugin"

const editorConfig: InitialConfigType = {
  namespace: "MarkdownEditor",
  theme: editorTheme,
  nodes: [
    HeadingNode,
    ParagraphNode,
    TextNode,
    QuoteNode,
    ListNode,
    ListItemNode,
    LinkNode,
    OverflowNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    CodeNode,
    CodeHighlightNode,
    HorizontalRuleNode,
    AutoLinkNode,
  ],
  onError: (error: Error) => {
    console.error(error)
  },
}

type MarkdownEditorProps = {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  placeholder?: string
  showToolbar?: boolean
}

function MarkdownInitializerPlugin({
  initialMarkdown,
}: {
  initialMarkdown: string
}) {
  const [editor] = useLexicalComposerContext()
  const isInitialized = React.useRef(false)

  React.useEffect(() => {
    // Only initialize once with the initial value
    // The component will be remounted with key={item.id} when item changes
    if (!isInitialized.current) {
      isInitialized.current = true
      if (initialMarkdown) {
        editor.update(() => {
          const root = $getRoot()
          root.clear()
          $convertFromMarkdownString(
            initialMarkdown,
            [
              CHECK_LIST,
              ...ELEMENT_TRANSFORMERS,
              ...MULTILINE_ELEMENT_TRANSFORMERS,
              ...TEXT_FORMAT_TRANSFORMERS,
              ...TEXT_MATCH_TRANSFORMERS,
            ]
          )
        }, { discrete: true })
      }
    }
  }, [editor, initialMarkdown])

  return null
}

function MarkdownChangePlugin({
  onChange,
  disabled,
}: {
  onChange: (value: string) => void
  disabled: boolean
}) {
  const handleChange = React.useCallback(
    (editorState: EditorState) => {
      if (disabled) return
      
      editorState.read(() => {
        const markdown = $convertToMarkdownString([
          CHECK_LIST,
          ...ELEMENT_TRANSFORMERS,
          ...MULTILINE_ELEMENT_TRANSFORMERS,
          ...TEXT_FORMAT_TRANSFORMERS,
          ...TEXT_MATCH_TRANSFORMERS,
        ])
        onChange(markdown)
      })
    },
    [disabled, onChange]
  )

  return <OnChangePlugin onChange={handleChange} ignoreSelectionChange />
}

export function MarkdownEditor({
  value,
  onChange,
  disabled = false,
  placeholder = "Start typing...",
  showToolbar = false,
}: MarkdownEditorProps) {
  const initialConfig = React.useMemo(
    () => ({
      ...editorConfig,
      editable: !disabled,
    }),
    [disabled]
  )

  return (
    <div className="bg-background w-full h-full overflow-hidden rounded-lg border flex flex-col">
    <LexicalComposer initialConfig={initialConfig}>
        {showToolbar && <MarkdownToolbarPlugin />}
        <div className="relative flex-1 flex flex-col min-h-0">
          <div className="relative flex-1 flex flex-col min-h-0">
        <RichTextPlugin
          contentEditable={
                <div className="flex-1 flex flex-col min-h-0">
                  {/* Non-flex wrapper to avoid Chrome contentEditable + flex warning */}
                  <div className="flex-1 min-h-0 relative">
            <ContentEditable
              placeholder={placeholder}
                      className="ContentEditable__root relative block w-full h-full overflow-auto px-8 py-4 focus:outline-none"
            />
                  </div>
                </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <TablePlugin />
        <HorizontalRulePlugin />
        <CheckListPlugin />
        <ListPlugin />
            <MarkdownShortcutPlugin
              transformers={[
                CHECK_LIST,
                ...ELEMENT_TRANSFORMERS,
                ...MULTILINE_ELEMENT_TRANSFORMERS,
                ...TEXT_FORMAT_TRANSFORMERS,
                ...TEXT_MATCH_TRANSFORMERS,
              ]}
            />
        <MarkdownInitializerPlugin initialMarkdown={value} />
        <MarkdownChangePlugin onChange={onChange} disabled={disabled} />
          </div>
      </div>
    </LexicalComposer>
    </div>
  )
}
