

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
    underline?: boolean;
    color: string;
}

interface ListConfig {
    scaling: number;
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
}

interface BlockquotesConfig {
    scaling: number;
    color: string;
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
            scaling: 1,
            underline: false,
            color: '#000000'
        },
        H2: {
            size: 24,
            weight: 700,
            tMargin: 5,
            bMargin: 3,
            decorativeSymbol: '',
            scaling: 1,
            underline: false,
            color: '#000000'
        },
        H3: {
            size: 20,
            weight: 600,
            tMargin: 3,
            bMargin: 0,
            decorativeSymbol: '',
            scaling: 1,
            underline: false,
            color: '#000000'
        },
        H4: {
            size: 18,
            weight: 600,
            tMargin: 0,
            bMargin: 0,
            decorativeSymbol: '',
            scaling: 1,
            color: '#000000'
        },
        H5: {
            size: 16,
            weight: 500,
            tMargin: 0,
            bMargin: 0,
            decorativeSymbol: '',
            scaling: 1,
            color: '#3f4a58'
        },
        H6: {
            size: 14,
            weight: 500,
            tMargin: 0,
            bMargin: 0,
            decorativeSymbol: '',
            scaling: 1,
            color: '#475569'
        }
    },
    list: {
        orderedLists: {
            scaling: 20,
            decorativeSymbol1: 'decimal',
            decorativeSymbol2: 'decimal',
            decorativeSymbol3: 'decimal',
            decorativeSymbol4: 'decimal',
            decorativeSymbol5: 'decimal'
        },
        unorderedList: {
            scaling: 20,
            decorativeSymbol1: 'circle',
            decorativeSymbol2: 'circle',
            decorativeSymbol3: 'circle',
            decorativeSymbol4: 'circle',
            decorativeSymbol5: 'circle'
        }
    },
    image: {
        radius: 0,
        alignment: 'center',
        tMargin: 24,
        bMargin: 16,
        annotation: {
            size: 14,
            weight: 400,
            decorativeSymbol: '',
            color: '#666666'
        }
    },
    blockquotes: {
        scaling: 1,
        color: '#666666',
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