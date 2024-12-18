import React, { useState } from "react";

function SetArea({ width }: { width: number }) {
    const [showArea, setShowArea] = useState<boolean>(false)

    return (
        <div style={{ width: width }} className={`set-area bg-blue-50 p-1 ${showArea ? "" : "hide-j "}  flex-grow-0 flex-shrink-0 max-w-full-12 min-w-0 md:min-w-48`}>
            <input type="text" defaultValue={"dddd"} />
            <input type="text" defaultValue={"dddd"} />F
            <input type="text" defaultValue={"dddd"} />
            <input type="text" defaultValue={"dddd"} />
        </div>
    )
}

export default SetArea