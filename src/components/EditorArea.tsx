import React, { useRef } from "react";

import 'easymde/src/css/easymde.css';
import 'codemirror/lib/codemirror.css'
import MarkdownEditor from 'react-markdown-editor-smde'

const Editor = () => {
    const el = useRef<MarkdownEditor>(null);
    function onSubmit() {
        if (el.current) {
            const md = el.current.mdValue;
        }
    }
    function doReset() {
        if (el.current) {
            el.current.mdValue = '';
        }
    }
    return (
        <div>
            <MarkdownEditor ref={el} />
            <button onClick={onSubmit}>Submit</button>
            <button onClick={doReset}>Reset</button>
        </div>
    )
}

function EditorArea({ width }: { width: number }) {
    return (
        <div style={{ width: width }} className="editor-area bg-black max-w-full-24 min-w-0 md:min-w-48 flex-grow-0 flex-shrink-0">
            <div className=" bg-slate-700 px-2 pt-3 w-full h-10 space-x-2">
                <label className=" bg-black rounded-t-md px-2 w-fit block pt-1 text-white">EditorArea</label>
                {/* <button className=" rounded-md bg-blue-900 w-7 h-7">E</button>
                <button className=" rounded-md bg-blue-900 w-7 h-7">S</button>
                <button className=" rounded-md bg-blue-900 w-7 h-7">P</button> */}
            </div>
            <div className=" p-1">
                <textarea name="editor" id="editor" className=" w-full bg-black text-white  h-full">
                    {`tttttt\nttt\nadcewv3\nq2bg5`}
                </textarea>
            </div>
            {/* <Editor></Editor> */}
        </div>
    )
}

export default EditorArea