import React from "react";

function EditorArea({ width }: { width: number }) {
    return (
        <div style={{ width: width }} className="editor-area bg-black max-w-full-24 min-w-0 md:min-w-48 p-1 flex-grow-0 flex-shrink-0">
            <textarea name="editor" id="editor" className=" w-full bg-black text-white  h-full">
                tttttt
                ttt
                adcewv3
                q2bg5
            </textarea>
        </div>
    )
}

export default EditorArea