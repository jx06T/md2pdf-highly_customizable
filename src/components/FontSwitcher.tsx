import React, { useState, useEffect } from "react";

const fonts = [
  { name: "黑體", value: '"Microsoft JhengHei", sans-serif' },
  { name: "細明體", value: '"PMingLiU", serif' },
  { name: "宋體", value: '"SimSun", serif' },
  { name: "標楷體", value: '"DFKai-SB", cursive' },
  { name: "Arial", value: '"Arial", sans-serif' },
  { name: "Times New Roman", value: '"Times New Roman", serif' },
  { name: "Verdana", value: '"Verdana", sans-serif' },
  { name: "Tahoma", value: '"Tahoma", sans-serif' },
];

function FontSwitcher({ value, changeCallback }: { value: string; changeCallback: (font: string) => void }) {
  // 將 value 作為初始值
  const [selectedFont, setSelectedFont] = useState(value || fonts[0].value);

  // 在初始化時同步字體到 `document.body`
  useEffect(() => {
    document.documentElement.style.setProperty("--custom-font-family", selectedFont);
  }, [selectedFont]);

  const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const font = e.target.value;
    setSelectedFont(font);
    changeCallback(font);
    document.documentElement.style.setProperty("--custom-font-family", font);
  };

  return (
    <div>
      <select className=" w-40 p-1 border rounded bg-gray-50 h-9" id="font-selector" value={selectedFont} onChange={handleFontChange}>
        {fonts.map((font) => (
          <option key={font.value} value={font.value}>
            {font.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FontSwitcher;
