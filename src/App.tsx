import React, { useEffect, useRef, useState, Suspense } from 'react'
import './App.css'
import './@uiw/react-md-editor/dist/mdeditor.css'
import { MdProvider } from './context/MdContext'
import { JamChevronCircleUp, JamChevronCircleDown, TdesignLogoGithubFilled, MaterialSymbolsDocsOutlineRounded } from "./utils/Icons"
import UpperToolbar from './components/UpperToolbar'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import DocsPage from './pages/DocsPage'
// import DocsPage from './pages/DocsPage';  // 這是你為 Docs 頁面創建的組件


// 組件 Props 類型定義
interface EditorAreaProps {
  expandLevel: number
  width: number
}

interface SetAreaProps {
  displayId: number
  expandLevel: number
  width: number
}

interface PreviewAreaProps {
  width: number
  expandLevel: number
  displayId: number
  initMdValue?: string
}

// Lazy 載入組件
const EditorArea = React.lazy(() => import('./components/EditorArea') as Promise<{ default: React.ComponentType<EditorAreaProps> }>)
const SetArea = React.lazy(() => import('./components/SetArea') as Promise<{ default: React.ComponentType<SetAreaProps> }>)
const PreviewArea = React.lazy(() => import('./components/PreviewArea') as Promise<{ default: React.ComponentType<PreviewAreaProps> }>)

// Loading 組件
const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center h-full w-full">
    <div className="animate-spin full h-8 w-8 border-b-2 border-t-2 border-gray-900"></div>
  </div>
)

function App() {
  // State 定義
  const [editorAreaW, setEditorAreaW] = useState<number>(350)
  const [editorAndSetAreaW, setEditorAndSetAreaW] = useState<number>(650)
  const [isResizing, setIsResizing] = useState<boolean>(false)
  const [showH, setShowH] = useState<boolean>(true)

  // Refs 定義
  const startXRef = useRef<number>(0)
  const movingRef = useRef<number>(-1)
  const startEWRef = useRef<number>(0)
  const startESWRef = useRef<number>(0)

  // 其他 State 定義
  const [minW] = useState<number>(192)
  const [maxW, setMaxW] = useState<number>(document.documentElement.clientWidth)
  const [expandLevel, setExpandLevel] = useState<number>(2)
  const [maxExpandLevel, setMaxExpandLevel] = useState<number>(2)
  const [customExpandLevel, setCustomExpandLevel] = useState<number>(2)
  const [displayId, setDisplayId] = useState<number>(0)
  const [isInit, setIsInit] = useState<boolean>(true)


  useEffect(() => {
    const stringData = localStorage.getItem('layout');
    if (stringData) {
      const storedData = JSON.parse(stringData);
      if (storedData) {
        const { expandLevel, displayId, editorAreaW, editorAndSetAreaW, customExpandLevel, isInit } = storedData;
        setExpandLevel(expandLevel);
        setDisplayId(displayId);
        setEditorAreaW(editorAreaW);
        setEditorAndSetAreaW(editorAndSetAreaW);
        setCustomExpandLevel(customExpandLevel);
        setIsInit(false);
        return;
      }
    }
    localStorage.setItem('layout', JSON.stringify({ expandLevel, displayId, editorAreaW, editorAndSetAreaW, customExpandLevel, isInit: true }))
  }, [])

  useEffect(() => {
    if (isInit) {
      return
    }
    localStorage.setItem('layout', JSON.stringify({ expandLevel, displayId, editorAreaW, editorAndSetAreaW, customExpandLevel }))
  }, [expandLevel, displayId, editorAreaW, editorAndSetAreaW, customExpandLevel])


  // Resize 處理
  useEffect(() => {
    const handleResize = (): void => {
      const newW = document.documentElement.clientWidth
      if (newW < 640) {
        setMaxExpandLevel(0)
        setEditorAndSetAreaW(newW)
        setEditorAreaW(newW)
        setMaxW(newW)
        return
      } else if (newW < 1024) {
        setMaxExpandLevel(1)
      } else {
        setMaxExpandLevel(2)
      }
      setMaxW(newW)
    }

    window.addEventListener('resize', handleResize)
    handleResize()
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // ExpandLevel 處理
  useEffect(() => {
    if (customExpandLevel > -1) {
      const newExpandLevel = Math.min(maxExpandLevel, customExpandLevel)
      setExpandLevel(newExpandLevel)
    }
  }, [customExpandLevel, maxExpandLevel])

  // Width 調整處理
  useEffect(() => {
    if (maxW < minW + editorAndSetAreaW) {
      setEditorAndSetAreaW(maxW - minW)
    }
    if (maxW < expandLevel * minW + editorAreaW) {
      setEditorAreaW(maxW - (expandLevel * minW))
    }
  }, [maxW, editorAndSetAreaW, editorAreaW, expandLevel, minW])

  // 移動處理函數
  const handleMove = (clientX: number): void => {
    if (isResizing) {
      if (movingRef.current === 0) {
        if (editorAndSetAreaW - (startEWRef.current + (clientX - startXRef.current)) < minW && expandLevel > 1) {
          setEditorAndSetAreaW(Math.min(maxW - minW, Math.max(minW, startEWRef.current + (clientX - startXRef.current) + minW)))
        }
        setEditorAreaW(Math.min(maxW - (expandLevel * minW), Math.max(minW, startEWRef.current + (clientX - startXRef.current))))
      } else if (movingRef.current === 1) {
        if (startESWRef.current + (clientX - startXRef.current) < (2 * minW)) {
          return
        }
        if (startESWRef.current + (clientX - startXRef.current) - editorAreaW < minW) {
          setEditorAreaW(startESWRef.current + (clientX - startXRef.current) - minW)
        }
        setEditorAndSetAreaW(Math.min((maxW - minW), Math.max(386, startESWRef.current + (clientX - startXRef.current))))
      }
    }
  }

  // 滑鼠事件處理
  useEffect(() => {
    const onMouseMove = (e: MouseEvent): void => {
      if (isResizing) {
        handleMove(e.clientX)
      }
    }

    const onMouseUp = (): void => {
      setIsResizing(false)
      startEWRef.current = editorAreaW
      startESWRef.current = editorAndSetAreaW
      movingRef.current = -1
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseup", onMouseUp)
    }

    if (isResizing) {
      document.addEventListener("mousemove", onMouseMove)
      document.addEventListener("mouseup", onMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseup", onMouseUp)
    }
  }, [isResizing, editorAreaW, editorAndSetAreaW])

  // 觸控事件處理
  useEffect(() => {
    const onTouchMove = (e: TouchEvent): void => {
      if (isResizing) {
        const moveTouch = e.changedTouches[0]
        handleMove(moveTouch.clientX)
      }
    }

    const onTouchEnd = (): void => {
      setIsResizing(false)
      startEWRef.current = editorAreaW
      startESWRef.current = editorAndSetAreaW
      movingRef.current = -1
      document.removeEventListener("touchmove", onTouchMove)
      document.removeEventListener("touchend", onTouchEnd)
    }

    if (isResizing) {
      document.addEventListener('touchmove', onTouchMove)
      document.addEventListener('touchend', onTouchEnd)
    }

    return () => {
      document.removeEventListener("touchmove", onTouchMove)
      document.removeEventListener("touchend", onTouchEnd)
    }
  }, [isResizing, editorAreaW, editorAndSetAreaW])

  // 開始移動處理
  const handleMoveStart = (clientX: number): void => {
    setIsResizing(true)
    startXRef.current = clientX
    startEWRef.current = editorAreaW
    startESWRef.current = editorAndSetAreaW
  }

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>, target: number): void => {
    movingRef.current = target
    handleMoveStart(e.clientX)
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>, target: number): void => {
    movingRef.current = target
    const touch = e.changedTouches[0]
    handleMoveStart(touch.clientX)
  }

  return (
    <Router>
      <div className='app h-[100dvh] overflow-y-hidden flex flex-col overflow-x-hidden'>
        {showH && (
          <header className='header sticky h-10 bg-blue-300 rounded-b-md -mb-1 z-10 text-l flex justify-between'>
            <Link to="/">
              <div
                className='w-36 h-[70px] bg-transparent -mt-3 ml-2 pointer-events-none'
                style={{
                  backgroundImage: "url(md2pdf.png)",
                  backgroundPosition: "center",
                  backgroundSize: "contain"
                }}
              />
            </Link>
            <div className=' mr-12 text-xl pt-[1px] space-x-4 text-blue-300'>
              <a target="_blank" href='https://github.com/jx06T/md2pdf-highly_customizable' className=' bg-blue-500 px-2 py-1 rounded-b-md underline decoration-blue-300 underline-offset-1 cursor-pointer'> <TdesignLogoGithubFilled className=' inline-block mb-1 mr-1 text-blue-300' />Github</a>
              <Link to="/docs" className='bg-blue-500 px-2 py-1 rounded-b-md underline decoration-blue-300 underline-offset-1 cursor-pointer'><MaterialSymbolsDocsOutlineRounded className=' inline-block mb-1 mr-1' />Docs</Link>
            </div>
          </header>
        )}

        <button
          onClick={() => setShowH(!showH)}
          className='show-botton fixed right-2 top-2 z-30'
        >
          {showH ? (
            <JamChevronCircleUp className='text-2xl' />
          ) : (
            <JamChevronCircleDown className='text-2xl' />
          )}
        </button>

        <MdProvider>
          <Routes>
            <Route path="/" element={
              <>
                <div
                  style={{
                    scale: (expandLevel > 1 ? maxW - editorAndSetAreaW : (expandLevel > 0 ? maxW - editorAreaW : maxW)) / 850,
                    left: expandLevel > 1 ? editorAndSetAreaW : (expandLevel > 0 ? editorAreaW : 0),
                    marginLeft: expandLevel > 1 ? 24 : (expandLevel > 0 ? 16 : 8),
                    display: expandLevel > 0 ? "block" : (displayId === 2 ? "block" : "none")
                  }}
                  className="cover"
                />
                <UpperToolbar
                  setCustomExpandLevel={setCustomExpandLevel}
                  editorAndSetWidth={editorAndSetAreaW}
                  editorWidth={editorAreaW}
                  maxExpandLevel={maxExpandLevel}
                  expandLevel={expandLevel}
                  displayId={displayId}
                  setDisplayId={setDisplayId}
                />
                <main className={`main flex h-full flex-grow relative ${isResizing ? "pointer-events-none-j" : ""} overflow-y-hidden overflow-x-hidden`}>
                  <Suspense fallback={<LoadingSpinner />}>
                    <EditorArea
                      expandLevel={expandLevel}
                      width={expandLevel === 0 ? maxW : editorAreaW}
                    />
                  </Suspense>

                  {expandLevel > 0 && (
                    <div
                      onTouchStart={(e) => handleTouchStart(e, 0)}
                      onMouseDown={(e) => onMouseDown(e, 0)}
                      className='print-hide cursor-col-resize w-2 bg-stone-300 hover:bg-slate-50 resize-col flex-grow-0 flex-shrink-0'
                    />
                  )}

                  <Suspense fallback={<LoadingSpinner />}>
                    <SetArea
                      displayId={displayId}
                      expandLevel={expandLevel}
                      width={expandLevel > 1 ? editorAndSetAreaW - editorAreaW : (expandLevel > 0 ? editorAreaW : maxW)}
                    />
                  </Suspense>

                  {expandLevel > 1 && (
                    <div
                      onTouchStart={(e) => handleTouchStart(e, 1)}
                      onMouseDown={(e) => onMouseDown(e, 1)}
                      className='print-hide cursor-col-resize w-2 bg-stone-300 hover:bg-slate-50 resize-col flex-grow-0 flex-shrink-0'
                    />
                  )}

                  <Suspense fallback={<LoadingSpinner />}>
                    <PreviewArea
                      width={expandLevel > 1 ? maxW - editorAndSetAreaW : (expandLevel > 0 ? maxW - editorAreaW : maxW)}
                      expandLevel={expandLevel}
                      displayId={displayId}
                    />
                  </Suspense>
                </main>
              </>
            } />

            <Route path="/docs" element={<DocsPage maxW={maxW} />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </MdProvider>
      </div>
    </Router >
  )
}

export default App