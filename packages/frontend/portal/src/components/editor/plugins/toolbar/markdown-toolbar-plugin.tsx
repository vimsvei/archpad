"use client"

import * as React from "react"
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
} from "lexical"
import {
  $createHeadingNode,
  HeadingTagType,
} from "@lexical/rich-text"
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from "@lexical/list"
import { INSERT_HORIZONTAL_RULE_COMMAND } from "@lexical/react/LexicalHorizontalRuleNode"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Minus,
  Code,
  Link,
  Code2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

function ToolbarButton({
  onClick,
  isActive = false,
  disabled = false,
  children,
  title,
}: {
  onClick: () => void
  isActive?: boolean
  disabled?: boolean
  children: React.ReactNode
  title?: string
}) {
  return (
    <Button
      variant={isActive ? "secondary" : "ghost"}
      size="icon"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className="h-8 w-8"
    >
      {children}
    </Button>
  )
}

export function MarkdownToolbarPlugin() {
  const [editor] = useLexicalComposerContext()
  const [isBold, setIsBold] = React.useState(false)
  const [isItalic, setIsItalic] = React.useState(false)
  const [isUnderline, setIsUnderline] = React.useState(false)
  const [isStrikethrough, setIsStrikethrough] = React.useState(false)
  const [isCode, setIsCode] = React.useState(false)

  const updateToolbar = React.useCallback(() => {
    const selection = $getSelection()
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"))
      setIsItalic(selection.hasFormat("italic"))
      setIsUnderline(selection.hasFormat("underline"))
      setIsStrikethrough(selection.hasFormat("strikethrough"))
      setIsCode(selection.hasFormat("code"))
    }
  }, [])

  React.useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        updateToolbar()
      })
    })
  }, [editor, updateToolbar])

  const formatHeading = React.useCallback(
    (headingSize: HeadingTagType) => {
      editor.update(() => {
        const selection = $getSelection()
        if ($isRangeSelection(selection)) {
          const nodes = selection.getNodes()
          if (nodes.length > 0) {
            const firstNode = nodes[0]
            const headingNode = $createHeadingNode(headingSize)
            firstNode.replace(headingNode)
            headingNode.select()
          }
        }
      })
    },
    [editor]
  )


  const formatBulletList = React.useCallback(() => {
    editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
  }, [editor])

  const formatNumberedList = React.useCallback(() => {
    editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
  }, [editor])

  const insertHorizontalRule = React.useCallback(() => {
    editor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined)
  }, [editor])

  const insertLink = React.useCallback(() => {
    editor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        const selectedText = selection.getTextContent()
        const url = prompt("Enter URL:", selectedText || "https://")
        if (url) {
          const linkText = selectedText || "Link"
          // Insert markdown link syntax: [text](url)
          const markdownLink = `[${linkText}](${url})`
          selection.insertText(markdownLink)
        }
      } else if (selection) {
        // Insert link template at cursor
        selection.insertText("[Link](https://)")
      }
    })
  }, [editor])

  const insertCodeBlock = React.useCallback(() => {
    editor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection) && !selection.isCollapsed()) {
        // If text is selected, wrap it in code block
        const selectedText = selection.getTextContent()
        const codeBlockText = `\`\`\`\n${selectedText}\n\`\`\``
        selection.insertText(codeBlockText)
      } else {
        // Insert empty code block template
        const codeBlockText = "```\n\n```"
        if (selection) {
          selection.insertText(codeBlockText)
          // Move cursor inside code block
          setTimeout(() => {
            editor.update(() => {
              const newSelection = $getSelection()
              if ($isRangeSelection(newSelection)) {
                const anchor = newSelection.anchor
                if (anchor) {
                  anchor.offset = 4 // Position after ```
                }
              }
            })
          }, 0)
        }
      }
    })
  }, [editor])

  const insertQuote = React.useCallback(() => {
    editor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        const selectedText = selection.getTextContent()
        if (selectedText) {
          // Insert markdown quote syntax for selected text
          const quoteText = selectedText
            .split("\n")
            .map((line) => (line.trim() ? `> ${line}` : ">"))
            .join("\n")
          selection.insertText(quoteText)
        } else {
          // Insert empty quote at cursor
          selection.insertText("> ")
        }
      } else if (selection) {
        // Insert empty quote at cursor
        selection.insertText("> ")
      }
    })
  }, [editor])

  return (
    <div className="flex items-center gap-1 p-2 border-b bg-muted/50">
      <ToolbarButton
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")
        }}
        isActive={isBold}
        title="Bold (Ctrl+B)"
      >
        <Bold className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")
        }}
        isActive={isItalic}
        title="Italic (Ctrl+I)"
      >
        <Italic className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")
        }}
        isActive={isUnderline}
        title="Underline (Ctrl+U)"
      >
        <Underline className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")
        }}
        isActive={isStrikethrough}
        title="Strikethrough"
      >
        <Strikethrough className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code")
        }}
        isActive={isCode}
        title="Inline Code"
      >
        <Code className="h-4 w-4" />
      </ToolbarButton>

      <Separator orientation="vertical" className="h-6 mx-1" />

      <ToolbarButton
        onClick={() => formatHeading("h1")}
        title="Heading 1"
      >
        <Heading1 className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => formatHeading("h2")}
        title="Heading 2"
      >
        <Heading2 className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => formatHeading("h3")}
        title="Heading 3"
      >
        <Heading3 className="h-4 w-4" />
      </ToolbarButton>

      <Separator orientation="vertical" className="h-6 mx-1" />

      <ToolbarButton
        onClick={formatBulletList}
        title="Bullet List"
      >
        <List className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={formatNumberedList}
        title="Numbered List"
      >
        <ListOrdered className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={insertLink}
        title="Insert Link"
      >
        <Link className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={insertCodeBlock}
        title="Insert Code Block"
      >
        <Code2 className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={insertQuote}
        title="Insert Quote"
      >
        <Quote className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={insertHorizontalRule}
        title="Horizontal Rule"
      >
        <Minus className="h-4 w-4" />
      </ToolbarButton>
    </div>
  )
}
