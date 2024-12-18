import React, { useEffect, useRef, useState } from 'react'
import './App.css'

import EditorArea from './components/EditorArea'
import SetArea from './components/SetArea'
import PreviewArea from './components/PreviewArea'

function App() {
  const [editorAreaW, setEditorAreaW] = useState<number>(350)
  const [editorAndSetAreaW, setEditorAndSetAreaW] = useState<number>(650)
  const [isResizing, setIsResizing] = useState<boolean>(false)
  const startXRef = useRef<number>(0)
  const movingRef = useRef<number>(-1)
  const startEWRef = useRef<number>(0)
  const startESWRef = useRef<number>(0)

  useEffect(() => {
    const onMouseMove = (e: globalThis.MouseEvent) => {
      if (isResizing) {

        if (movingRef.current == 0) {
          if (editorAndSetAreaW - (startEWRef.current + (e.clientX - startXRef.current)) < 192) {
            setEditorAndSetAreaW(Math.max(193, startEWRef.current + (e.clientX - startXRef.current)) + 193);
            console.log("!!", editorAndSetAreaW)
          }
          setEditorAreaW(Math.max(193, startEWRef.current + (e.clientX - startXRef.current)));
        } else if (movingRef.current == 1) {
          if (startESWRef.current + (e.clientX - startXRef.current) < 384) {
            return
          }
          if (startESWRef.current + (e.clientX - startXRef.current) - editorAreaW < 192) {
            setEditorAreaW(startESWRef.current + (e.clientX - startXRef.current) - 193);
          }
          setEditorAndSetAreaW(Math.min((document.documentElement.clientWidth - 193), Math.max(386, startESWRef.current + (e.clientX - startXRef.current))));
        }
      }
    };

    const onMouseUp = () => {
      setIsResizing(false);
      startEWRef.current = editorAreaW;
      startESWRef.current = editorAndSetAreaW;
      movingRef.current = -1;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    if (isResizing) {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [isResizing]);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>, target: number) => {
    setIsResizing(true);
    movingRef.current = target;
    startXRef.current = e.clientX;
    startEWRef.current = editorAreaW;
    startESWRef.current = editorAndSetAreaW;
  };

  return (
    <div className='App h-[100dvh] overflow-y-hidden flex flex-col overflow-x-hidden'>
      <header className=' sticky h-10 bg-blue-300 rounded-b-md -mb-1 z-10 text-l'>
        <h1 className=' text-left pl-3 pt-1 text-2xl'>MD2PDF</h1>
        {/* <div className=' bg-red-600 z-30 absolute h-2' style={{ width: editorAreaW }}></div> */}
      </header>

      <main className={`flex h-full flex-grow relative ${isResizing?" pointer-events-none ":" pointer-events-auto "}`}>
        <EditorArea width={editorAreaW}></EditorArea>
        <div onMouseDown={(e) => onMouseDown(e, 0)} className=' cursor-col-resize w-2 bg-red-300 resize-col flex-grow-0 flex-shrink-0'></div>
        <SetArea width={editorAndSetAreaW - editorAreaW}></SetArea>
        <div onMouseDown={(e) => onMouseDown(e, 1)} className=' cursor-col-resize w-2 bg-red-300 resize-col flex-grow-0 flex-shrink-0'></div>
        <PreviewArea></PreviewArea>
      </main>
    </div>
  )
}

export default App
