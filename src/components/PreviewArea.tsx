import React from "react";
import ReactMarkdown from "markdown-to-jsx";
const markdownContent = `
# Hello, Markdown-to-JSX!

This is a simple example of **Markdown** rendered in React.

- Item 1
- Item 2
- Item 3
::: note
ddd
:::
`;
function PreviewArea() {
    return (
        <div className="preview-area bg-stone-200 min-w-0 md:min-w-48 flex-grow w-full h-full p-1">
            <h1>Markdown-to-JSX Example</h1>
            <ReactMarkdown>{markdownContent}</ReactMarkdown>

        </div>
    )
}

export default PreviewArea
