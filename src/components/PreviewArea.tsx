import React, { useEffect } from "react";
import ReactMarkdown from "markdown-to-jsx";
import { useMdContext } from "../context/MdContext";

// function autoPageBreak() {
//     const container = document.querySelector('.markdown-content');
//     // @ts-ignore
//     const contentHeight = container.offsetHeight;
//     const pageHeight = 297 * 3.78; // A4 height in pixels (約等於 297mm)
//     const margin = 20 * 3.78; // 20mm margins
//     const effectiveHeight = pageHeight - (2 * margin);

//     // 計算需要的頁數
//     const pageCount = Math.ceil(contentHeight / effectiveHeight);

//     // 插入分頁符
//     for (let i = 1; i < pageCount; i++) {
//         const breakPoint = i * effectiveHeight;
//         insertPageBreak(container, breakPoint);
//     }
// }

// // @ts-ignore
// function insertPageBreak(container, position) {

//     if (container.children.length < 2) {
//         return
//     }
//     const elements = Array.from(container.firstchild.children);

//     let currentHeight = 0;

//     for (const element of elements) {
//         // @ts-ignore
//         currentHeight += element.offsetHeight;
//         if (currentHeight > position) {
//             const pageBreak = document.createElement('div');
//             pageBreak.className = 'page-break';
//             // @ts-ignore
//             element.parentNode.insertBefore(pageBreak, element);
//             break;
//         }
//     }
// }

function PreviewArea({ width, displayId, expandLevel }: { width: number, displayId: number, expandLevel: number }) {
    const { mdValue, setMdValue } = useMdContext()

    const options = {
        overrides: {
            bp: {
                component: () => {
                    return <span className=" bkp flex items-center justify-center"><span className=" h-4 text-gray-300" >{'>'}</span ><hr className=" mt-7 flex-grow h-4 " /><span className=" h-4  text-gray-300" >{'<'}</span ></span>;
                }
            },
            img: {
                component: ({ src, alt }: { src: string, alt: string }) => {
                    return (
                        <span className=" md-img  py-4 ">
                            <img src={src} alt={alt || 'image'} className="max-w-full object-contain" />
                        </span>
                    );
                }
            },
            blockquote: {
                component: ({ children }: { children: React.ReactNode }) => {
                    return (
                        <blockquote className=" rounded-sm border-l-4 pl-4 italic my-4 ">
                            {children}
                        </blockquote>
                    );
                }
            }

        }

    };

    return (
        <div className={`preview-area no-scrollbar bg-stone-100 min-w-0 lg:min-w-48 w-full h-full overflow-y-scroll   ${expandLevel > 0 ? "flex-grow flex-shrink " : " absolute left-0 " + (displayId === 2 ? "" : " opacity-0 pointer-events-none ")} `} >

            <div
                style={{
                    scale: width / 850
                }}
                className=" cover"
            >
            </div>
            <div className=" preview-area-2 p-2 relative ">
                <div
                    style={{
                        scale: width / 850
                    }}
                    className="border-2 page markdown-content"
                >
                    <ReactMarkdown options={options}>
                        {mdValue.replace(
                            /^([-]{3,})$/gm,
                            (match) => match.length === 3 ? '---' : '<bp/>'
                        ).replace(/^\n$/gm, '<br/>')}
                    </ReactMarkdown>
                </div>
            </div>
        </ div>
    )
}

export default PreviewArea
