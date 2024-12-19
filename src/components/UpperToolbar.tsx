import React from "react";
import { IcBaselinePrint, MynauiShareSolid } from "../utils/Icons";

function UpperToolbar({ editorWidth, editorAndSetWidth, displayId, setDisplayId, expandLevel }: { editorAndSetWidth: number, editorWidth: number, displayId: number, setDisplayId: Function, expandLevel: number }) {
  return (
    <div className=" flex w-full h-9">
      <div style={{ width: expandLevel > 1 ? editorWidth : "fit-content" }} className={`${displayId ? " bg-white" : "bg-b-2-w  "} pt-2 flex flex-shrink-0 flex-grow-0 `}>
        <span onClick={expandLevel > 1 ? () => { } : () => setDisplayId(0)} className={` cursor-pointer ${displayId == 0 || expandLevel > 1 ? "bg-black text-white " : "bg-stone-400 text-black "} rounded-t-md px-2 w-fit pt-1 left-point`}>Editor</span>
      </div>

      <div style={{ width: expandLevel > 0 ? (expandLevel > 1 ? (editorAndSetWidth - editorWidth) : editorWidth) : "fit-content" }} className={` bg-white pt-2 flex  flex-shrink-0 flex-grow-0 ${expandLevel > 1 ? "mr-2 " : (expandLevel > 0 ? "-mr-[4.5rem] " : "")} `}>
        <span onClick={expandLevel > 1 ? () => { } : () => setDisplayId(1)} className={` cursor-pointer ${displayId == 1 || expandLevel > 1 ? "bg-blue-50" : " bg-stone-400"} text-black rounded-t-md px-2 w-fit pt-1 left-point`}>Settings</span>
      </div>

      <div className=" bg-white pt-2 w-full h-9 space-x-3 flex">
        <label onClick={expandLevel > 0 ? () => { } : () => setDisplayId(2)} className={` ${displayId == 2 || expandLevel > 0 ? "bg-slate-100" : " bg-stone-400"} cursor-pointer bg-stone-100 rounded-t-md px-2 w-fit pt-1 text-black left-point `}>Preview</label>
        <button className="pb-2 rounded-md w-9 h-9"><IcBaselinePrint className="text-2xl"></IcBaselinePrint></button>
        <button className="pb-2 rounded-md w-9 h-9"><MynauiShareSolid className="text-2xl"></MynauiShareSolid></button>
      </div>
    </div >
  )
}

export default UpperToolbar