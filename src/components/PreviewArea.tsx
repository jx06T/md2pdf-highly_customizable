import React, { useEffect } from "react";
// import ReactMarkdown from "markdown-to-jsx";
import { useMdContext } from "../context/MdContext";
import rehypeRaw from 'rehype-raw';
import rehypeKatexNotranslate from 'rehype-katex-notranslate';
import Markdown from 'react-markdown'
import { visit } from 'unist-util-visit';
import rehypeKatex from 'rehype-katex'
import rehypeCallouts from 'rehype-callouts'
import 'rehype-callouts/theme/github'

import remarkGfm from 'remark-gfm'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkExternalLinks from 'remark-external-links';

const components = {
    p: ({ children, ...props }: { children: React.ReactNode }) => {
        // @ts-ignore
        if (children && children.key && children.key.includes("bpf")) {
            return <span {...props} children={children} />;
        }
        return <p {...props} children={children} />;
    },
    img({ src, alt, className, ...rest }: { src: string; alt?: string; className?: string }) {
        return (
            <span className={`md-img py-4 ${className || ''}`}>
                <img
                    src={src}
                    alt={alt || 'image'}
                    className="max-w-full object-contain"
                    {...rest}
                />
            </span>
        );
    },
    bpf: () => {
        return (
            <span className="bkp flex items-center justify-center">
                <span className="h-4 text-gray-300">{'>'}</span>
                <hr className="mt-7 flex-grow h-4" />
                <span className="h-4 text-gray-300">{'<'}</span>
            </span>
        );
    },
    table: ({ children }: { children: React.ReactNode }) => {
        return (
            <div className="table-container">

                <table >
                    {children}
                </table>
            </div>
        );
    },
    ma: ({ children }: { children: React.ReactNode }) => {
        return (
            <span className=" w-full flex justify-center items-center mt-1 ">
                <span className=" !text-sm">
                    {children}
                </span>
            </span>
        );
    },
    blockquote({ children }: { children: React.ReactNode }) {
        return (
            <blockquote className="rounded-sm border-l-4 pl-4 italic my-4">
                {children}
            </blockquote>
        );
    },
    code({ children, className, ...rest }: { children: React.ReactNode, className: string }) {
        const match = /language-(\w+)/.exec(className || '')
        return match ? (
            <SyntaxHighlighter
                {...rest}
                PreTag="div"
                children={String(children).replace(/\n$/, '')}
                language={match[1]}
                showLineNumbers={true}
                style={getComputedStyle(document.documentElement).getPropertyValue("--code-theme") !== "dark" ? vs : vscDarkPlus}
                wrapLines={true}
                wrapLongLines={true}
                lineNumberStyle={{ color: '#888', paddingRight: '10px' }}
            />
        ) : (
            <code {...rest} className={className}>
                {children}
            </code>
        )
    }


}

function PreviewArea({ width, displayId, expandLevel }: { width: number, displayId: number, expandLevel: number }) {
    const { mdValue, setMdValue } = useMdContext()

    const autoPageBreak = () => {
        const container: HTMLDivElement | null = document.querySelector('.markdown-content');
        if (!container) {
            return
        }
        const contentHeight = container.offsetHeight;
        const pageHeight = 297 * 3.78; // A4 height in pixels 
        const margin = 30; // 20mm margins
        const effectiveHeight = pageHeight - (2 * margin);

        container.querySelectorAll(".page-break").forEach(e => e.remove())

        const elements = Array.from(container.children);
        let currentHeight = 0;
        let i = 0

        for (const element of elements) {
            console.log(i, element, currentHeight)
            const position = i * effectiveHeight;
            // @ts-ignore
            currentHeight += element.offsetHeight;

            if (currentHeight > position) {
                i += 1;
                const pageBreak = document.createElement('p');
                pageBreak.className = 'page-break';
                // @ts-ignore
                element.parentNode.insertBefore(pageBreak, element);
            }
        }

    }

    // useEffect(() => {
    //     const handleBeforePrint = () => {
    //         autoPageBreak()
    //     };

    //     window.addEventListener('beforeprint', handleBeforePrint);

    //     return () => {
    //         window.removeEventListener('beforeprint', handleBeforePrint);
    //     };
    // }, []);

    return (
        <div className={`preview-area no-scrollbar bg-stone-100 min-w-0 lg:min-w-48 w-full h-full overflow-y-scroll   ${expandLevel > 0 ? "flex-grow flex-shrink " : " absolute left-0 " + (displayId === 2 ? "" : " opacity-0 pointer-events-none ")} `} >

            <div className=" preview-area-2 p-2 relative ">
                <div
                    style={{
                        scale: width / 850
                    }}
                    className="border-2 page markdown-content"
                >
                    <Markdown
                        components={components}
                        rehypePlugins={[rehypeRaw, rehypeKatex, rehypeKatexNotranslate, rehypeCallouts]}
                        // @ts-ignore
                        remarkPlugins={[remarkGfm, [remarkExternalLinks, { target: '_blank', rel: 'noopener noreferrer' }]]}
                    >
                        {mdValue.replace(
                            /^\$\$[\n ]*(.*)[\n ]*\$\$/gm,
                            '``` math\n$1\n```'
                        ).replace(
                            /^<<\s*(.+)$/gm,
                            (match, group1) => `<ma>${group1
                                .replace(/</g, '&lt;')
                                .replace(/>/g, '&gt;')
                                .replace(/\\/g, '&#92;')
                                .replace(/\//g, '&#47;')}</ma>`
                        ).replace(
                            /\|[\n ]{2,3}(?!\|)/,
                            '|\n\n　\n\n'
                        ).replace(
                            /^([-]{3,})$/gm,
                            (match) => match.length === 3 ? '---' : '<bpf></bpf>'
                        ).replace(
                            /^\n$/gm,
                            '<br></br>'
                        )}
                    </Markdown>
                </div>
            </div>
        </ div>
    )
}

export default PreviewArea
