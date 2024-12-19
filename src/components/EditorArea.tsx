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

function EditorArea({ showSetNotEditor, switchSetArea, width, showSetArea }: { showSetNotEditor: boolean, switchSetArea: Function, width: number, showSetArea: boolean }) {
    return (
        <div style={{ width: width }} className="editor-area bg-black max-w-full-24 min-w-0 lg:min-w-48 flex-grow-0 flex-shrink-0">
            <div className={`${showSetNotEditor ? " bg-white" : "bg-b-2-w  "} pt-2 w-full h-9 space-x-2 flex`}>
                <span onClick={() => switchSetArea(false)} className={` cursor-pointer ${showSetNotEditor ? "bg-stone-400 text-black " : "bg-black text-white "} rounded-t-md px-2 w-fit pt-1 left-point`}>Editor</span>
                {!showSetArea &&
                    <span onClick={() => switchSetArea(true)} className={` cursor-pointer ${showSetNotEditor ? "bg-blue-50 text-black " : "bg-stone-700 text-white "} rounded-t-md px-2 w-fit pt-1 left-point`}>Settings</span>
                }
            </div>
            <div className=" p-1 h-full">
                <textarea name="editor" id="editor" className=" w-full bg-black text-white  h-full">
                    {`tttttt\nttt\nadcewv3\nq2bg5`}
                </textarea>
            </div>
        </div>
    )
}

export default EditorArea