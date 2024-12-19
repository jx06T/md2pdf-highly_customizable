import React from "react";
import ReactMarkdown from "markdown-to-jsx";
import { IcBaselinePrint, MynauiShareSolid } from "../utils/Icons";
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

function PreviewArea({ displayId, expandLevel }: { displayId: number, expandLevel: number }) {
    return (
        <div className={`preview-area bg-stone-100 min-w-0 lg:min-w-48 w-full h-full  ${expandLevel > 0 ? "flex-grow " : " absolute left-0 " + (displayId == 2 ? "" : " opacity-0 pointer-events-none ")} `} >
            <div className=" p-2">
                <h1>Markdown-to-JSX Example</h1>
                <ReactMarkdown>{markdownContent}</ReactMarkdown>
            </div>
        </ div>
    )
}

export default PreviewArea
