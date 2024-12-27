import React from "react";
import ReactMarkdown from "markdown-to-jsx";
import { useMdContext } from "../context/MdContext";

function PreviewArea({ width, displayId, expandLevel }: { width: number, displayId: number, expandLevel: number }) {
    const { mdValue, setMdValue } = useMdContext()

    const options = {
        overrides: {
            bp: {
                component: () => {
                    return <div className=" bkp flex items-center"><span className=" h-4 mb-3 text-gray-300" >{'>'}</span ><hr className="flex-grow " /><span className=" h-4 mb-3 text-gray-300" >{'<'}</span ></div>;
                }
            },
            img: {
                component: ({ src, alt }: { src: string, alt: string }) => {
                    return (
                        <div className=" md-img  my-4">
                            <img src={src} alt={alt || 'image'} className="max-w-full max-h-96 object-contain" />
                        </div>
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
            <div className="preview-area-2 p-2 relative ">
                <div
                    style={{
                        scale: width / 850
                    }}
                    className="border-2 page"
                >
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
