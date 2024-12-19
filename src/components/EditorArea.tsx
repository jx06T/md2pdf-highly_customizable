import React, { useRef } from "react";

// import 'easymde/src/css/easymde.css';
// import 'codemirror/lib/codemirror.css'
// import MarkdownEditor from 'react-markdown-editor-smde'

// const Editor = () => {
//     const el = useRef<MarkdownEditor>(null);
//     function onSubmit() {
//         if (el.current) {
//             const md = el.current.mdValue;
//         }
//     }
//     function doReset() {
//         if (el.current) {
//             el.current.mdValue = '';
//         }
//     }
//     return (
//         <div>
//             <MarkdownEditor ref={el} />
//             <button onClick={onSubmit}>Submit</button>
//             <button onClick={doReset}>Reset</button>
//         </div>
//     )
// }

function EditorArea({ width, expandLevel }: { width: number, expandLevel: number }) {
    return (
        <div style={{ width: width }} className={`editor-area bg-black ${expandLevel > 1 ? "max-w-full-24" : (expandLevel > 0 ? "max-w-full-12" : "")} min-w-0 lg:min-w-48 flex-grow-0 flex-shrink-0`}>
            <div className=" p-1 h-full w-full">
                <textarea name="editor" id="editor" className=" w-full bg-black text-white  h-full">
                    {`tttttt\nttt\nadcewv3\nq2bg5`}
                </textarea>
            </div>
        </div>
    )
}

export default EditorArea