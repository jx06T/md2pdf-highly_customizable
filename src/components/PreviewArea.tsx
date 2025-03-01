import React, { useEffect, useState } from "react";
// import ReactMarkdown from "markdown-to-jsx";
import { useMdContext } from "../context/MdContext";
import rehypeRaw from 'rehype-raw';
import rehypeKatexNotranslate from 'rehype-katex-notranslate';
import Markdown from 'react-markdown'
// import { visit } from 'unist-util-visit';
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeCallouts from 'rehype-callouts'
import 'rehype-callouts/theme/github'

import remarkGfm from 'remark-gfm'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { nord } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { monokai } from 'react-syntax-highlighter/dist/esm/styles/hljs'

import remarkExternalLinks from 'remark-external-links';

function getThemeStyle(th: string) {
    switch (th) {
        case "dark":
            return vscDarkPlus;
        case "bright":
            return vs;
        case "dracula":
            return dracula;
        case "nord":
            return nord;
        case "github":
            return github;
        case "monokai":
            return monokai;
        default:
            return vscDarkPlus;
    }
}


function PreviewArea({ width, displayId, expandLevel, initMdValue = '', only = false }: { width: number, displayId: number, expandLevel: number, initMdValue?: string, only?: boolean }) {
    let { mdValue, setMdValue } = useMdContext()
    const [rootPath, setRootPath] = useState("")
    const absoluteRegex = /^(https?:\/\/)/;

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
                        src={absoluteRegex.test(src) ? src : rootPath + src}
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
                <blockquote className="rounded-sm border-l-[0.25em] pl-4 italic my-4">
                    {children}
                </blockquote>
            );
        },
        code({ children, className, ...rest }: { children: React.ReactNode, className: string }) {
            const match = /language-(\w+)/.exec(className || '')
            const th = getComputedStyle(document.documentElement).getPropertyValue("--code-theme") || "dark"
            return match ? (
                <SyntaxHighlighter
                    {...rest}
                    PreTag="div"
                    children={String(children).replace(/\n$/, '')}
                    language={match[1]}
                    showLineNumbers={true}
                    // showInlineLineNumbers={true}
                    style={getThemeStyle(th)}
                    wrapLines={true}

                    lineNumberStyle={{ color: '#888', paddingRight: '10px' }}

                    codeTagProps={{
                        className:"codeeeee",
                        style: {
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                        },
                    }}
                />
            ) : (
                <code {...rest} className={className}>
                    {children}
                </code>
            )
        }
    }


    if (initMdValue) {
        mdValue = initMdValue;
    }

    useEffect(() => {
        const regex = /\[root-path\]:\((.*?)\)/;
        const match = mdValue.match(regex);
        if (match) {
            setRootPath(match[1]);
        }
    }, [mdValue])

    return (
        <div className={`preview-area no-scrollbar bg-stone-100 min-w-0 lg:min-w-48 w-full h-full overflow-y-scroll ${only ? " w-full" : expandLevel > 0 ? "flex-grow flex-shrink " : " absolute left-0 " + (displayId === 2 ? "" : " opacity-0 pointer-events-none ")} `} >

            <div className={`preview-area-2 p-2 relative ${only ? "w-full flex justify-center" : ""}`}>
                <div
                    style={{
                        scale: width / 850
                    }}
                    className={`border-2 page markdown-content ${only ? " only " : ""}`}
                >
                    <Markdown
                        components={components}
                        rehypePlugins={[rehypeRaw, remarkMath, rehypeKatex, rehypeKatexNotranslate, rehypeCallouts]}
                        // @ts-ignore
                        remarkPlugins={[remarkGfm, [remarkExternalLinks, { target: '_blank', rel: 'noopener noreferrer' }]]}
                    >
                        {mdValue.replace(
                            /^<<\s*(.+)$/gm,
                            (match, group1) => `<ma>${group1
                                .replace(/</g, '&lt;')
                                .replace(/>/g, '&gt;')
                                .replace(/\\/g, '&#92;')
                                .replace(/\//g, '&#47;')}</ma>`
                        ).replace(
                            /^([-]{3,})$/gm,
                            (match) => match.length === 3 ? '---' : '<bpf></bpf>'
                        ).replace(
                            /^ {2,}$/gm,
                            '<br/>\n'
                        )}
                    </Markdown>
                </div>
            </div>
        </ div>
    )
}

export default PreviewArea

// .replace(
//     /^\$\$[\n ]*(.*)[\n ]*\$\$/gm,
//     '``` math\n$1\n```'
// )