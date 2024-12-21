import React from "react";
import ReactMarkdown from "markdown-to-jsx";
import { useMdContext } from "../context/MdContext";

// function CustomHr({ children, ...props }: { children?: React.ReactNode }) {
//     // @ts-ignore
//     const sourceText = props['data-sourcetext'];
//     // @ts-ignore
//     const sourceText2 = props['data-ee'];
//     console.log(sourceText,sourceText2)

//     // @ts-ignore
//     const originalText = props.children?.[0] || '';
//     console.log('Original text:', originalText); // 可以先看看收到什麼

//     if (sourceText === '---') {
//         return <hr />;
//     } else if (sourceText === '------') {
//         return <hr className="bkp" />;
//     }

//     // 默認樣式
//     return <hr />;
// }

function PreviewArea({ displayId, expandLevel }: { displayId: number, expandLevel: number }) {
    const { mdValue, setMdValue } = useMdContext()

    const options = {
        overrides: {
            bp: {
                component: () => {
                    return <div className=" flex items-center"><span className=" h-4 mb-3 text-gray-300" >{'>'}</span ><hr className=" bkp flex-grow " /><span className=" h-4 mb-3 text-gray-300" >{'<'}</span ></div>;
                }
            },

        }
    };

    return (
        <div className={`preview-area no-scrollbar bg-stone-100 min-w-0 lg:min-w-48 w-full h-full overflow-y-scroll   ${expandLevel > 0 ? "flex-grow flex-shrink " : " absolute left-0 " + (displayId === 2 ? "" : " opacity-0 pointer-events-none ")} `} >
            <div className="preview-area-2 p-2 ">
                <div className="border-2 page">
                    <ReactMarkdown options={options}>{mdValue.replace(
                        /^([-]{3,})$/gm,
                        (match) => match.length === 3 ? '---' : '<bp/>'
                    )}</ReactMarkdown>
                </div>
            </div>
        </ div>
    )
}

export default PreviewArea
