import React, { useEffect, useRef, useState } from "react";
import SimpleMDE from 'simplemde';
import 'simplemde/dist/simplemde.min.css';

const MarkdownEditor = ({ initialValue = '', onChange = () => { } }) => {
    const editorRef = useRef<HTMLTextAreaElement>(null);
    const [simplemde, setSimplemde] = useState<SimpleMDE | null>(null);

    useEffect(() => {
        // 初始化 SimpleMDE
        if (simplemde) return;

        const smde = new SimpleMDE({
            element: editorRef.current!,
            initialValue: initialValue,
            spellChecker: true,
            autofocus: true,
            toolbar: [
                'bold',
                'italic',
                'heading',
                '|',
                'quote',
                'unordered-list',
                'ordered-list',
                '|',
                'link',
                'image',
                '|',
                'preview',
                'guide'
            ]
        });

        // 監聽變更事件
        smde.codemirror.on('change', () => {
            // @ts-ignore
            onChange(smde.value());
        });
        console.log("!!!")

        setSimplemde(smde);

        // 清理函數
        return () => {
            if (simplemde) {
                // @ts-ignore
                simplemde.toTextArea();
                smde.codemirror.off('change');
                setSimplemde(null);
            }
        };
    }, [initialValue, onChange, simplemde]);

    return <textarea ref={editorRef} />;
};

function EditorArea({ width, expandLevel }: { width: number, expandLevel: number }) {
    return (
        <div style={{ width: width }} className={`editor-area bg-black ${expandLevel > 1 ? "max-w-full-24" : (expandLevel > 0 ? "max-w-full-12" : "")} min-w-0 lg:min-w-48 flex-grow-0 flex-shrink-0`}>
            <div className=" p-1 h-full w-full">
                <MarkdownEditor></MarkdownEditor>
            </div>
        </div>
    )
}

export default EditorArea