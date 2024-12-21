import React, { useState } from "react";

import MDEditor, { commands } from '@uiw/react-md-editor';



function EditorArea({ width, expandLevel }: { width: number, expandLevel: number }) {
    const [mdValue, setMdValue] = useState("")
    const handleChange = (val?: string) => {
        if (val !== undefined) {
            setMdValue(val);
        }
    };
    return (
        <div style={{ width: width }} className={`editor-area bg-black ${expandLevel > 1 ? "max-w-full-24" : (expandLevel > 0 ? "max-w-full-12" : "")} min-w-0 lg:min-w-48 flex-grow-0 flex-shrink-0`}>
            <div className=" p-1 h-full w-full">
                {/* <textarea name="editor" id="editor" className=" w-full bg-black text-white  h-full">
                    {`tttttt\nttt\nadcewv3\nq2bg5`}
                </textarea> */}
                <MDEditor
                    value={mdValue}
                    onChange={handleChange}
                    preview="edit"
                    visibleDragbar={false}
                    height="100%"
                    // commands={[
                    //     commands.bold,  // 粗體
                    //     commands.italic,  // 斜體
                    //     commands.strikethrough,  // 刪除線
                    //     commands.hr,  // 分隔線
                    //     commands.title,  // 標題
                    //     commands.divider,  // 分隔符號
                    //     commands.link,  // 連結
                    //     commands.quote,  // 引用
                    //     commands.code  // 程式碼
                    // ]}
                    extraCommands={[
                    ]}
                />
            </div>
        </div>
    )
}

export default EditorArea