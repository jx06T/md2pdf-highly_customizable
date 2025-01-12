import React, { createContext, useState, useContext, useCallback, ReactNode, useRef, useEffect } from 'react';
import { doc } from '../pages/DocsPage';
interface MdContextType {
    mdValue: string,
    setMdValue: Function,
    rootPath: string,
    setRootPath: Function
}

const MdContext = createContext<MdContextType | undefined>(undefined);

export const MdProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [mdValue, setMdValue] = useState("")
    const [rootPath, setRootPath] = useState("")
    const regex = /\[root-path\]:\((.*?)\)/;

    useEffect(() => {
        const initialMdValue = localStorage.getItem('mdValue');
        const notNew = localStorage.getItem('notNew');
        if (!notNew) {
            setMdValue(doc)
            localStorage.setItem('notNew', 'true')
        }
        
        if (initialMdValue) {
            const match = initialMdValue.match(regex);
            if (match) {
                setRootPath(match[1]);
                console.log("!!@@@",match[1])
            }

            setMdValue(initialMdValue)
        } else {
            localStorage.setItem('mdValue', "")
        }
    }, [])

    useEffect(() => {
        if (mdValue == '') {
            return
        }
        if (regex.test(mdValue)) {
            const newMdValue = mdValue.replace(regex, `[root-path]:(${rootPath})`);
            setMdValue(newMdValue);
        } else {
            const newMdValue = `[root-path]:(${rootPath})\n\n${mdValue}`;
            setMdValue(newMdValue);
        }
    }, [rootPath])

    useEffect(() => {
        if (mdValue == "") {
            return
        }
        localStorage.setItem('mdValue', mdValue)
    }, [mdValue])

    return (
        <MdContext.Provider value={{ mdValue, setMdValue, rootPath, setRootPath }}>
            {children}
        </MdContext.Provider>
    );
};

export const useMdContext = (): MdContextType => {
    const context = useContext(MdContext);
    if (context === undefined) {
        throw new Error('MdContext must be used within a StateProvider');
    }
    return context;
};