import React, { useState, useCallback, useEffect } from 'react';
import debounce from 'lodash/debounce';
import { JamChevronCircleDown, JamChevronCircleRight } from "../utils/Icons";
import { defaultStyleConfig, StyleConfig } from '../Types';
import FontSwitcher from './FontSwitcher';

// Props 類型定義
interface StyleConfigPanelProps {
    config: StyleConfig;
    onChange: (newConfig: StyleConfig) => void;
}

interface NumberInputProps {
    path: string[];
    label: string;
    min?: number;
    max?: number;
    step?: number;
    config: StyleConfig;
    updateConfig: (path: string[], value: number) => void;
}

interface ColorInputProps {
    path: string[];
    label: string;
    config: StyleConfig;
    updateConfig: (path: string[], value: string) => void;
}

interface StringInputProps {
    path: string[];
    label: string;
    config: StyleConfig;
    updateConfig: (path: string[], value: string) => void;
}

interface BooleanInputProps {
    path: string[];
    label: string;
    config: StyleConfig;
    updateConfig: (path: string[], value: boolean) => void;
}

interface SectionProps {
    title: string;
    children: React.ReactNode;
    section: string;
    // section: keyof typeof defaultStyleConfig;
    isExpanded: boolean;
    onToggle: (section: string) => void;
}

// 工具函數：安全地獲取嵌套值
const getNestedValue = (obj: any, path: string[]): any => {
    return path.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
};

// NumberInput 組件
const NumberInput: React.FC<NumberInputProps> = ({
    path,
    label,
    min = 0,
    max = 100,
    step = 1,
    config,
    updateConfig
}) => {
    const initialValue = getNestedValue(config, path) ?? 0;
    const [localValue, setLocalValue] = useState<string>(initialValue.toString());

    const debouncedUpdate = useCallback(
        debounce((value: number) => {
            updateConfig(path, value);
        }, 300),
        [path, updateConfig]
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setLocalValue(newValue);

        const numberValue = Number(newValue);
        if (!isNaN(numberValue)) {
            debouncedUpdate(numberValue);
        }
    };


    useEffect(() => {
        updateConfig(path, Number(localValue))
    }, [])

    const handleBlur = () => {
        let numberValue = Number(localValue);

        if (isNaN(numberValue)) {
            numberValue = initialValue;
        } else {
            numberValue = Math.min(Math.max(numberValue, min), max);
        }

        setLocalValue(numberValue.toString());
        updateConfig(path, numberValue);
    };

    return (
        <div className="flex items-center justify-between mb-2">
            <label className="text-sm">{label}</label>
            <input
                type="number"
                value={localValue}
                min={min}
                max={max}
                step={step}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-20 p-1 border rounded bg-gray-50 h-9"
            />
        </div>
    );
};

// ColorInput 組件
const ColorInput: React.FC<ColorInputProps> = ({
    path,
    label,
    config,
    updateConfig
}) => {
    const value = getNestedValue(config, path) ?? '#000000';
    const [localValue, setLocalValue] = useState(value);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setLocalValue(newValue);
        updateConfig(path, newValue);
    };

    useEffect(() => {
        updateConfig(path, localValue)
    }, [])

    return (
        <div className="flex items-center justify-between mb-2">
            <label className="text-sm">{label}</label>
            <input
                type="color"
                value={localValue}
                onChange={handleChange}
                className="w-20 p-1 border rounded bg-gray-50 h-9"
            />
        </div>
    );
};

// StringInput 組件
const StringInput: React.FC<StringInputProps> = ({
    path,
    label,
    config,
    updateConfig
}) => {
    const value = getNestedValue(config, path) ?? '';
    const [localValue, setLocalValue] = useState(value);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setLocalValue(newValue);
        updateConfig(path, newValue);
    };


    useEffect(() => {
        updateConfig(path, localValue)
    }, [])

    return (
        <div className="flex items-center justify-between mb-2">
            <label className="text-sm">{label}</label>
            <input
                type="text"
                value={localValue}
                onChange={handleChange}
                className="w-40 p-1 border rounded bg-gray-50 h-9"
            />
        </div>
    );
};

// BooleanInput 組件
const BooleanInput: React.FC<BooleanInputProps> = ({
    path,
    label,
    config,
    updateConfig
}) => {
    const value = getNestedValue(config, path) ?? false;
    const [localValue, setLocalValue] = useState(value);

    const handleChange = () => {
        updateConfig(path, !localValue);
        setLocalValue(!localValue);
    };

    useEffect(() => {
        updateConfig(path, localValue)
    }, [])

    return (
        <div className="flex items-center justify-between mb-2">
            <label className="text-sm">{label}</label>
            <div className=' w-20 px-2 pt-[5px] border rounded bg-gray-50 h-9' onClick={handleChange}>
                <div className={` w-6 h-6 border rounded m-auto ${localValue ? "bg-blue-300" : "bg-gray-200"}`}>
                </div>
            </div>
        </div>
    );
};

// StringInput 組件
const FontsInput: React.FC<StringInputProps> = ({
    path,
    label,
    config,
    updateConfig
}) => {
    const value = getNestedValue(config, path) ?? '#000000';
    const [localValue, setLocalValue] = useState(value);

    const handleChange = (newValue: string) => {
        setLocalValue(newValue);
        updateConfig(path, newValue);
    };

    useEffect(() => {
        updateConfig(path, localValue)
    }, [])

    return (
        <div className="flex items-center justify-between mb-2">
            <label className="text-sm">{label}</label>
            <FontSwitcher value={localValue} changeCallback={handleChange} ></FontSwitcher>
        </div>
    );
};

// Section 組件
const Section: React.FC<SectionProps> = ({
    title,
    children,
    section,
    isExpanded,
    onToggle
}) => (
    <div className="border rounded mb-2">
        <button
            className="w-full p-2 flex items-center justify-between bg-gray-50"
            onClick={() => onToggle(section)}
        >
            <span>{title}</span>
            {isExpanded ?
                <JamChevronCircleDown className="text-2xl" /> :
                <JamChevronCircleRight className="text-2xl" />
            }
        </button>
        {isExpanded && (
            <div className="p-2">
                {children}
            </div>
        )}
    </div>
);

// 主組件
const StyleConfigPanel: React.FC<StyleConfigPanelProps> = ({ config, onChange }) => {
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        page: false,
        title: false,
        list: false,
        image: false,
        blockquotes: false
    });

    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const updateConfig = useCallback((path: string[], value: any) => {
        const newConfig = { ...config };
        let current: any = newConfig;

        for (let i = 0; i < path.length - 1; i++) {
            current = current[path[i]];
        }
        current[path[path.length - 1]] = value;
        // console.log(path, value)

        if (typeof value === 'number') {
            document.documentElement.style.setProperty("--" + path.join('-'), value.toString() + "px");
        } else {
            document.documentElement.style.setProperty("--" + path.join('-'), value + "");
        }

        onChange(newConfig);
    }, [config, onChange]);

    return (
        <div className="w-full bg-blue-50 p-4 overflow-y-auto h-full">
            <Section
                title="Page Settings"
                section="page"
                isExpanded={expandedSections.page}
                onToggle={toggleSection}
            >
                <Section
                    title="Font"
                    section="pageFont"
                    isExpanded={expandedSections.pageFont}
                    onToggle={toggleSection}
                >
                    <NumberInput
                        path={['page', 'font', 'size']}
                        label="Size"
                        config={config}
                        updateConfig={updateConfig}
                    />
                    <NumberInput
                        path={['page', 'font', 'weight']}
                        label="Weight"
                        step={100}
                        max={900}
                        config={config}
                        updateConfig={updateConfig}
                    />
                    <NumberInput
                        path={['page', 'font', 'height']}
                        label="Height"
                        step={100}
                        max={900}
                        config={config}
                        updateConfig={updateConfig}
                    />
                    <ColorInput
                        path={['page', 'font', 'color']}
                        label="Color"
                        config={config}
                        updateConfig={updateConfig}
                    />
                    <FontsInput
                        path={['page', 'font', 'family']}
                        label="family"
                        config={config}
                        updateConfig={updateConfig}
                    />
                </Section>
                <Section
                    title="Layout"
                    section="layout"
                    isExpanded={expandedSections.layout}
                    onToggle={toggleSection}
                >
                    <ColorInput
                        path={['page', 'layout', 'bgColor']}
                        label="Background"
                        config={config}
                        updateConfig={updateConfig}
                    />
                    <BooleanInput
                        path={['page', 'layout', 'pageNumber']}
                        label="PageNumber"
                        config={config}
                        updateConfig={updateConfig}
                    />
                    <StringInput
                        path={['page', 'layout', 'author']}
                        label="Author"
                        config={config}
                        updateConfig={updateConfig}
                    />
                    <StringInput
                        path={['page', 'layout', 'title']}
                        label="Title"
                        config={config}
                        updateConfig={updateConfig}
                    />
                    <NumberInput
                        path={['page', 'layout', 'tBoundary']}
                        label="Top boundary"
                        step={1}
                        max={900}
                        config={config}
                        updateConfig={updateConfig}
                    />
                    <NumberInput
                        path={['page', 'layout', 'bBoundary']}
                        label="Bottom boundary"
                        step={1}
                        max={900}
                        config={config}
                        updateConfig={updateConfig}
                    />
                    <NumberInput
                        path={['page', 'layout', 'lBoundary']}
                        label="Left boundary"
                        step={1}
                        max={900}
                        config={config}
                        updateConfig={updateConfig}
                    />
                    <NumberInput
                        path={['page', 'layout', 'rBoundary']}
                        label="Right boundary"
                        step={1}
                        max={900}
                        config={config}
                        updateConfig={updateConfig}
                    />

                </Section>
            </Section>

            {/* Title Settings Section */}
            <Section
                title="Title Settings"
                section="title"
                isExpanded={expandedSections.title}
                onToggle={toggleSection}
            >
                {['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].map((level) => (
                    <Section
                        title={level}
                        section={`title-${level}`}
                        isExpanded={expandedSections[`title-${level}`]}
                        onToggle={toggleSection}
                    >
                        <div key={level} className="mb-4">
                            <h4 className="font-medium mb-2">{level}</h4>
                            <NumberInput
                                path={['title', level, 'size']}
                                label="Size"
                                config={config}
                                updateConfig={updateConfig}
                            />
                            <NumberInput
                                path={['title', level, 'weight']}
                                label="Weight"
                                step={100}
                                max={900}
                                config={config}
                                updateConfig={updateConfig}
                            />
                            <NumberInput
                                path={['title', level, 'tMargin']}
                                label="Top Margin"
                                step={1}
                                max={900}
                                config={config}
                                updateConfig={updateConfig}
                            />
                            <NumberInput
                                path={['title', level, 'bMargin']}
                                label="Bottom Margin"
                                step={1}
                                max={900}
                                config={config}
                                updateConfig={updateConfig}
                            />
                            <NumberInput
                                path={['title', level, 'scaling']}
                                label="Scaling"
                                step={1}
                                max={900}
                                config={config}
                                updateConfig={updateConfig}
                            />
                            <BooleanInput
                                path={['title', level, 'underline']}
                                label="Underline"
                                config={config}
                                updateConfig={updateConfig}
                            />
                            <ColorInput
                                path={['title', level, 'color']}
                                label="Color"
                                config={config}
                                updateConfig={updateConfig}
                            />
                        </div>
                    </Section>
                ))}
            </Section>

            {/* List Settings Section */}
            <Section
                title="List Settings"
                section="list"
                isExpanded={expandedSections.list}
                onToggle={toggleSection}
            >
                <div className="mb-4">
                    <h4 className="font-medium mb-2">Ordered Lists</h4>
                    {/* <StringInput
                        path={['list', 'orderedLists', 'decorativeSymbol']}
                        label="Decorative Symbol"
                        config={config}
                        updateConfig={updateConfig}
                    /> */}

                    <NumberInput
                        path={['list', 'orderedLists', 'scaling']}
                        label="Scaling"
                        step={0.1}
                        max={2}
                        config={config}
                        updateConfig={updateConfig}
                    />
                </div>
                <div>
                    <h4 className="font-medium mb-2">Unordered Lists</h4>

                    <NumberInput
                        path={['list', 'unorderedList', 'scaling']}
                        label="Scaling"
                        step={0.1}
                        max={2}
                        config={config}
                        updateConfig={updateConfig}
                    />
                    <StringInput
                        path={['list', 'unorderedList', 'decorativeSymbol']}
                        label="Decorative Symbol"
                        config={config}
                        updateConfig={updateConfig}
                    />
                </div>
            </Section>

            {/* Image Settings Section */}
            <Section
                title="Image Settings"
                section="image"
                isExpanded={expandedSections.image}
                onToggle={toggleSection}
            >
                <NumberInput
                    path={['image', 'radius']}
                    label="Border Radius"
                    config={config}
                    updateConfig={updateConfig}
                />
                <NumberInput
                    path={['image', 'annotation', 'size']}
                    label="Annotation Size"
                    config={config}
                    updateConfig={updateConfig}
                />
                <NumberInput
                    path={['image', 'tMargin']}
                    label="Top Margin"
                    step={1}
                    max={900}
                    config={config}
                    updateConfig={updateConfig}
                />
                <NumberInput
                    path={['image', 'bMargin']}
                    label="Bottom Margin"
                    step={1}
                    max={900}
                    config={config}
                    updateConfig={updateConfig}
                />
                <Section
                    title="Annotation"
                    section="annotation"
                    isExpanded={expandedSections.annotation}
                    onToggle={toggleSection}
                >

                    <NumberInput
                        path={['image', 'annotation', 'size']}
                        label="Size"
                        config={config}
                        updateConfig={updateConfig}
                    />
                    <NumberInput
                        path={['image', 'annotation', 'weight']}
                        label="Weight"
                        step={100}
                        max={900}
                        config={config}
                        updateConfig={updateConfig}
                    />
                    <ColorInput
                        path={['image', 'annotation', 'color']}
                        label="Color"
                        config={config}
                        updateConfig={updateConfig}
                    />
                    <StringInput
                        path={['image', 'annotation', 'decorativeSymbol']}
                        label="Decorative Symbol"
                        config={config}
                        updateConfig={updateConfig}
                    />

                </Section>
            </Section>

            {/* Blockquotes Settings Section */}
            <Section
                title="Blockquotes Settings"
                section="blockquotes"
                isExpanded={expandedSections.blockquotes}
                onToggle={toggleSection}
            >
                <NumberInput
                    path={['blockquotes', 'scaling']}
                    label="Scaling"
                    step={0.1}
                    max={2}
                    config={config}
                    updateConfig={updateConfig}
                />

                <ColorInput
                    path={['blockquotes', 'color']}
                    label="Color"
                    config={config}
                    updateConfig={updateConfig}
                />
                <NumberInput
                    path={['blockquotes', 'size']}
                    label="Size"
                    config={config}
                    updateConfig={updateConfig}
                />
                <NumberInput
                    path={['blockquotes', 'weight']}
                    label="Weight"
                    step={100}
                    max={900}
                    config={config}
                    updateConfig={updateConfig}
                />
            </Section>
        </div>
    );
};

export default StyleConfigPanel;