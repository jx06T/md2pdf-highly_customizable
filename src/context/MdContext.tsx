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

    useEffect(() => {
        const initialMdValue = localStorage.getItem('mdValue');
        const notNew = localStorage.getItem('notNew');
        if (!notNew) {
            setMdValue(doc)
            localStorage.setItem('notNew', 'true')
        }
        if (initialMdValue) {
            // const parsedMdValue = JSON.parse(initialMdValue);
            setMdValue(initialMdValue)
        } else {
            localStorage.setItem('mdValue', "")
        }
    }, [])

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