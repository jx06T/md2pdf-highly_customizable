import React, { useEffect, useRef, useState } from "react";

import { directivesPlugin, GenericDirectiveEditor, MDXEditor, headingsPlugin, listsPlugin, quotePlugin, thematicBreakPlugin } from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css';
import { type MDXEditorMethods, type MDXEditorProps, type DirectiveDescriptor } from '@mdxeditor/editor'


const CalloutDirectiveDescriptor: DirectiveDescriptor = {
    name: 'callout',
    testNode(node) {
        return node.name === 'callout'
    },
    // set some attribute names to have the editor display a property editor popup.
    attributes: [],
    // used by the generic editor to determine whether or not to render a nested editor.
    hasChildren: true,
    Editor: GenericDirectiveEditor
}

function EditorArea({ width, expandLevel }: { width: number, expandLevel: number }) {
    const ref = React.useRef<MDXEditorMethods>(null)

    const [markdown, setMarkdown] = React.useState('# Initial Content');

    const preSetMarkdown = (md: string) => {
       const newMd = md.replaceAll('\\#', '#')
        setMarkdown(newMd)
        ref.current!.setMarkdown(newMd);
        console.log(md,"\n---------------------\n",newMd)
    }
    return (
        <div style={{ width: width }} className={`editor-area bg-black ${expandLevel > 1 ? "max-w-full-24" : (expandLevel > 0 ? "max-w-full-12" : "")} min-w-0 lg:min-w-48 flex-grow-0 flex-shrink-0`}>
            <div className=" p-1 h-full w-full">
                {/* <textarea name="editor" id="editor" className=" w-full bg-black text-white  h-full">
                    {`tttttt\nttt\nadcewv3\nq2bg5`}
                </textarea> */}

                <MDXEditor ref={ref} onChange={preSetMarkdown} markdown={markdown} plugins={[headingsPlugin(), listsPlugin(), quotePlugin(), thematicBreakPlugin()]} />


            </div>
        </div>
    )
}

export default EditorArea