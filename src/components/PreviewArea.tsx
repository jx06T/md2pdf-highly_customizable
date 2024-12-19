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

function PreviewArea() {
    return (
        <div className="preview-area bg-stone-100 min-w-0 lg:min-w-48 flex-grow w-full h-full">
            <div className=" bg-white pt-2 w-full h-9 space-x-3 flex">
                <label className=" bg-stone-100 rounded-t-md px-2 w-fit pt-1 text-black left-point ">Preview</label>
                <button className="pb-2 rounded-md w-9 h-9"><IcBaselinePrint className="text-2xl"></IcBaselinePrint></button>
                <button className="pb-2 rounded-md w-9 h-9"><MynauiShareSolid className="text-2xl"></MynauiShareSolid></button>
            </div>
            <div className=" p-2">
                <h1>Markdown-to-JSX Example</h1>
                <ReactMarkdown>{markdownContent}</ReactMarkdown>
            </div>
        </div>
    )
}

export default PreviewArea
