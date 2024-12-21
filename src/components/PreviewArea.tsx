import React from "react";
import ReactMarkdown from "markdown-to-jsx";
import { useMdContext } from "../context/MdContext";


function PreviewArea({ displayId, expandLevel }: { displayId: number, expandLevel: number }) {
    const { mdValue, setMdValue } = useMdContext()

    const options = {

    };

    return (
        <div className={`preview-area no-scrollbar bg-stone-100 min-w-0 lg:min-w-48 w-full h-full overflow-y-scroll   ${expandLevel > 0 ? "flex-grow flex-shrink " : " absolute left-0 " + (displayId === 2 ? "" : " opacity-0 pointer-events-none ")} `} >
            <div className=" p-2 ">
                <div className="border-2 page">
                    <ReactMarkdown options={options}>{mdValue}</ReactMarkdown>
                </div>
            </div>
        </ div>
    )
}

export default PreviewArea
