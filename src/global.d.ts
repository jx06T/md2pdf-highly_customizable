declare module '*.svg' {
    const content: string;
    export default content;
}

declare module './reportWebVitals' {
    const reportWebVitals: (onPerfEntry?: (entry: any) => void) => void;
    export default reportWebVitals;
}

declare module '*.md' {
    const content: string;
    export default content;
  }