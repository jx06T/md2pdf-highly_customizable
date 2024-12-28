

// Types
interface FontConfig {
    size: number;
    weight: number;
    family?: string;
    height?: number;
    color?: string;
}

interface HeaderConfig {
    size: number;
    weight: number;
    tMargin: number,
    bMargin: number,
    decorativeSymbol?: string;
    scaling: number;
    underline?: string;
    udlColor?: string;
    color: string;
}

interface ListConfig {
    scaling1: number;
    scaling2: number;
    scaling3: number;
    scaling4: number;
    scaling5: number;
    decorativeSymbol1: string;
    decorativeSymbol2: string;
    decorativeSymbol3: string;
    decorativeSymbol4: string;
    decorativeSymbol5: string;
}

interface ImageAnnotationConfig {
    size: number;
    weight: number;
    decorativeSymbol?: string;
    color: string;
}

interface ImageConfig {
    radius: number;
    alignment: 'left' | 'center' | 'right';
    annotation: ImageAnnotationConfig;
    tMargin: number,
    bMargin: number,
    height: number,
}

interface BlockquotesConfig {
    scaling: number;
    color: string;
    bgColor: string;
    tMargin: number,
    bMargin: number,
    font: FontConfig;
}

interface PageConfig {
    font: FontConfig;
    layout: {
        bgColor: string;
        pageNumber: boolean;
        author: string;
        title: string;
        orientation: 'portrait' | 'landscape';
        tBoundary: number
        bBoundary: number
        lBoundary: number
        rBoundary: number
    };
}

interface StyleConfig {
    init?: boolean;
    page: PageConfig;
    title: {
        H1: HeaderConfig;
        H2: HeaderConfig;
        H3: HeaderConfig;
        H4: HeaderConfig;
        H5: HeaderConfig;
        H6: HeaderConfig;
    };
    list: {
        orderedLists: ListConfig;
        unorderedList: ListConfig;
        task: {
            scaling: number;
        }
    };
    image: ImageConfig;
    blockquotes: BlockquotesConfig;
}

// Default values
const defaultStyleConfig: StyleConfig = {
    init: true,
    page: {
        font: {
            size: 16,
            weight: 400,
            family: 'Arial',
            height: 30,
            color: '#000000'
        },
        layout: {
            bgColor: '#ffffff',
            pageNumber: true,
            author: '',
            title: '',
            orientation: 'portrait',
            tBoundary: 10,
            bBoundary: 10,
            lBoundary: 10,
            rBoundary: 10
        }
    },
    title: {
        H1: {
            size: 30,
            weight: 700,
            tMargin: 7,
            bMargin: 3,
            decorativeSymbol: '',
            scaling: 0,
            underline: "underline",
            color: '#000000',
            udlColor: "#222222"
        },
        H2: {
            size: 24,
            weight: 700,
            tMargin: 5,
            bMargin: 3,
            decorativeSymbol: '',
            scaling: 0,
            underline: "underline",
            color: '#000000',
            udlColor: "#5e5e5e"
        },
        H3: {
            size: 20,
            weight: 600,
            tMargin: 3,
            bMargin: 0,
            decorativeSymbol: '',
            scaling: 0,
            underline: "underline",
            color: '#000000',
            udlColor: "#5e5e5e"
        },
        H4: {
            size: 18,
            weight: 600,
            tMargin: 0,
            bMargin: 0,
            decorativeSymbol: '',
            scaling: 0,
            color: '#000000',
            udlColor: "#5e5e5e"
        },
        H5: {
            size: 16,
            weight: 500,
            tMargin: 0,
            bMargin: 0,
            decorativeSymbol: '',
            scaling: 0,
            color: '#3f4a58',
            udlColor: "#5e5e5e"
        },
        H6: {
            size: 14,
            weight: 500,
            tMargin: 0,
            bMargin: 0,
            decorativeSymbol: '',
            scaling: 0,
            color: '#475569',
            udlColor: "#5e5e5e"
        }
    },
    list: {
        orderedLists: {
            scaling1: 20,
            scaling2: 20,
            scaling3: 20,
            scaling4: 20,
            scaling5: 20,
            decorativeSymbol1: 'decimal',
            decorativeSymbol2: 'decimal',
            decorativeSymbol3: 'decimal',
            decorativeSymbol4: 'decimal',
            decorativeSymbol5: 'decimal'
        },
        unorderedList: {
            scaling1: 20,
            scaling2: 20,
            scaling3: 20,
            scaling4: 20,
            scaling5: 20,
            decorativeSymbol1: 'circle',
            decorativeSymbol2: 'circle',
            decorativeSymbol3: 'circle',
            decorativeSymbol4: 'circle',
            decorativeSymbol5: 'circle'
        },
        task: {
            scaling: 20,
        }
    },
    image: {
        radius: 5,
        alignment: 'center',
        tMargin: 24,
        bMargin: 16,
        height: 346,
        annotation: {
            size: 14,
            weight: 400,
            decorativeSymbol: '',
            color: '#666666'
        }
    },
    blockquotes: {
        scaling: 10,
        color: '#d1d5db',
        bgColor: '#ffffff',
        tMargin: 16,
        bMargin: 16,
        font: {
            size: 16,
            weight: 400
        }
    }
};

export type {
    StyleConfig,
    PageConfig,
    HeaderConfig,
    ListConfig,
    ImageConfig,
    BlockquotesConfig,
    FontConfig,
};

export { defaultStyleConfig };