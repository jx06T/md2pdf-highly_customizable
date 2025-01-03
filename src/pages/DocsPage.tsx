import React, { Suspense } from 'react'

const PreviewArea = React.lazy(() => import('../components/PreviewArea') as Promise<{ default: React.ComponentType<PreviewAreaProps> }>)
const SetArea = React.lazy(() => import('../components/SetArea') as Promise<{ default: React.ComponentType<SetAreaProps> }>)

interface PreviewAreaProps {
    width: number
    expandLevel: number
    displayId: number
    initMdValue?: string
    only?: boolean
}

interface SetAreaProps {
    displayId: number
    expandLevel: number
    width: number
}

const LoadingSpinner: React.FC = () => (
    <div className="flex items-center justify-center h-full w-full">
        <div className="animate-spin full h-8 w-8 border-b-2 border-t-2 border-gray-900"></div>
    </div>
)

const doc = `
# md2pdf - Docs 
###### *version-V1.2.0*

---

## 上方導覽列
> 此處有 **Github 儲存庫連結**以及**說明文檔**，而右側按鈕可收合或開啟，點擊左側圖標可返回首頁。

## 分頁區
> 此區在**移動裝置預設收合**，展開狀態的分頁可以透過其右側箭頭收合，同理向右箭頭能展開收合的分頁，拖動展開的分頁中間之分隔線可調整頁面布局。

### 分頁區 - 右方按鈕
  - 列印文件：將文件轉為 **PDF** 建議在**電腦**上使用此功能，避免文字重影或其他錯誤
  - 複製純文字格式：將左側編輯器內容直接**複製到剪貼簿**

### 分頁區 - 編輯區
- 上方有一些 **markdown 語法** 的基本快速操作按鈕
- 下方為編輯區，來自 **uiwjs** 的 [**react-md-editor**](https://github.com/uiwjs/react-md-editor) 
- 支援常見快捷鍵，例如 **粗體**、_斜體_ 等等

### 分頁區 - 文件樣式設定區
- **頁面設置**
    - 字型：設定**字型大小、字型樣式、裝飾顏色、字型顏色及行高**等屬性。
    - 佈局：包括**頁面背景色、文件名、頁面邊界**等。
- **標題樣式**
    - H1 到 H6：設定標題各層級的**字型大小、字重、邊距、顏色及下劃線顏色**等。
- **列表樣式**
    - 有序列表：設定各層級的**縮排**及**符號樣式**。
    - 無序列表：設定各層級的**縮排**及**符號樣式**。
    - 任務列表：設定任務清單的**縮排**。
- **圖片樣式**
    - 設定圖片的**圓角、對齊方式、邊距**等屬性。
- **引用樣式**
    - 設定引用塊的**背景色、邊距、縮排**等屬性。
- **代碼樣式**
    - 行內代碼：設定行內代碼的**背景顏色**。
    - 代碼區塊：設定代碼區塊的**背景顏色、上下邊距、語法高亮主題等**屬性。
- **表格樣式**
    - 設定表格**標題顏色、表格行顏色、邊框顏色、文字對齊方式**等屬性。
### 分頁區 - 預覽區域
- 淺藍色框代表 **A4** 紙張範圍
>

## 注意事項
1. 頁面設置中部分字體在移動裝置無法正確列印，列印設定請見下方說明
2. 頁面設置上下邊界要以列印時顯示的為準，將下邊界設定過小會導致頁碼無法正確列印
3. 頁面設置中所指的裝飾符號包含超連結下底線以及列表符號，可設定顏色
4. 標題設定之 **lighter** 或 **bolder** 選項並非所有字體都支援
5. 為方便排版，此工具支援的額外擴充語法請見下方說明
6. 程式碼區塊請確實填寫語言以利開啟語法高亮，並在列印開啟背景顏色

## 支援語法

| 語法| 支援狀態 |
|--------|--------|
| 圖片崁入 | Ｖ|
| 程式碼區塊 | Ｖ|
| 引用方塊 | Ｖ|
| Callout| Ｖ|
| 核選方塊列表 | Ｖ|
| 依賴 Katex 的 LaTeX 語法| Ｖ|
| 列印換頁符號 | *Ｖ**|
| 圖片註解 | *Ｖ**|
| 連續換行 | *Ｖ**

<< 標註*者為擴充語法
  
## 部分語法範例
### Katex 
- 語法：
\`\`\` md
<!-- 多行區塊 -->
$$
\\lim_{x \\to \\infty} \\int_0^\\infty \\frac{x^2 e^{-x^2}}{1 + e^{-x}} \\, dx
$$

<!-- 單行公式 -->
海龍公式中，三角形面積 $ A = \\sqrt{s(s - a)(s - b)(s - c)} $
\`\`\`

- 說明：行內公式用一個 \`$\` 標註，用 \`$$\` 則可開啟 LaTeX 區塊

- 效果：
  
<!-- 多行區塊 -->
$$
\\lim_{x \\to \\infty} \\int_0^\\infty \\frac{x^2 e^{-x^2}}{1 + e^{-x}} \\, dx
$$
  
<!-- 單行公式 -->
海龍公式中，三角形面積 $ A = \\sqrt{s(s - a)(s - b)(s - c)} $
  
### Callout
- 語法：
\`\`\` md
> [!note]
> 內容
>
> 內容
>
\`\`\`

- 說明：在引用符號 \`>\` 的右方使用 \`[!類型]\`標註 Callout 類型即可使用，可用類型有：**note、warning、caution、tip、info、danger、important、check** 等

- 效果：
> [!note]
> 內容
>
> 內容
>

  
## 擴充語法
### 列印換頁符號
- 語法：
\`\`\` md
 ------
\`\`\`
- 說明：一般的分隔線 \`---\` 在列印時不會在該處強制分頁。透過 \`------\` 可做到在該處強制分頁
- 效果：
------
  
### 圖片註解
- 語法：
\`\`\` md
 << 註解文字
\`\`\`

- 說明：能在圖片或任何地方新增置中的註解，適合用在圖片表格標號等等
- 效果：
<< 註解文字
  
### 連續換行
- 語法說明：透過有僅有二個以上空白字符的行換行

- 效果：

第一段  
  
  
  
  
第二段

## 列印設定
  
> [!tip]
> 此範例在 windows 11 & Edge 瀏覽器下進行，不同操作系統或瀏覽器可能會有不同

![注意事項1](https://i.imgur.com/VdIpN5W.png)
![注意事項2](https://i.imgur.com/5xTlIJp.png)

`

function DocsPage({ maxW }: { maxW: number }) {
    return (<Suspense fallback={<LoadingSpinner />}>
        <div className=' fi pointer-events-none opacity-0 w-0 h-0 overflow-hidden'>
            <Suspense fallback={<LoadingSpinner />}>
                <SetArea
                    displayId={2}
                    expandLevel={2}
                    width={0}
                />
            </Suspense>
        </div>

        <PreviewArea
            width={Math.min(1024, maxW - 10)}
            expandLevel={2}
            displayId={2}
            only={true}
            initMdValue={doc}
        />
    </Suspense>)
}

export default DocsPage;