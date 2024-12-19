import React, { useState } from "react";

function SetArea({ showSetNotEditor, width, showSetArea }: { showSetNotEditor: boolean, width: number, showSetArea: boolean }) {

    return (
        <div style={{ width: width }} className={`set-area bg-blue-50 ${showSetNotEditor ? "" : "hide-j-2"} ${showSetArea ? "" : "hide-j "}  flex-grow-0 flex-shrink-0 max-w-full-12 min-w-0 lg:min-w-48`}>
            {showSetArea &&
                <div className=" bg-white pt-2 w-full h-9 space-x-2 flex">
                    <label className=" bg-blue-50 rounded-t-md px-2 w-fit pt-1 text-black left-point ">Settings</label>
                </div>
            }
            <div className=" p-2 h-full bg-blue-50">
                <input type="text" defaultValue={"dddd"} />
                <input type="text" defaultValue={"dddd"} />F
                <input type="text" defaultValue={"dddd"} />
                <input type="text" defaultValue={"dddd"} />
            </div>
        </div>
    )
}

export default SetArea