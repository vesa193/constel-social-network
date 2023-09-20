import { PaletteColorOptions, createTheme } from '@mui/material/styles';
import {
    baseColors,
    baseBackground,
    textColors,
    borders,
    success,
    error,
} from './colors';
import { fontTypes } from './fonts';
import React from 'react';

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: string) =>
    augmentColor({ color: { main: mainColor } });

export const customTheme = createTheme({
    palette: {
        action: {
            active: baseColors.quatinary,
            disabled: baseColors.white,
            disabledBackground: baseColors.secondary,
        },
        primary: {
            main: baseColors.primary,
            contrastText: baseBackground.white,
        },
        secondary: {
            main: baseColors.secondary,
            contrastText: baseBackground.white,
        },
        tertiary: {
            main: baseColors.tertiary,
            contrastText: baseBackground.white,
            light: '',
            dark: '',
        },
        quatinary: {
            main: baseColors.quatinary,
            contrastText: baseBackground.white,
            light: '',
            dark: '',
        },
        white: {
            main: baseColors.white,
            contrastText: baseBackground.white,
            light: '',
            dark: '',
        },
        text: {
            primary: textColors.primary,
            secondary: baseColors.secondary,
        },
        background: {
            default: baseBackground.white,
            paper: baseBackground.white,
        },
        success: {
            main: success[500],
        },
        error: {
            main: error[500],
        },
        divider: borders[500],
        tertiaryButton: createColor(baseColors.tertiary),
        quatinaryButton: createColor(baseColors.quatinary),
        // highlightOrange: createColor(highlightOrange),
    },
    typography: {
        fontFamily: fontTypes.baseFontFamily,
        fontFamilySecondary: fontTypes.fontFamilySecondary,
        body1: {},
        h1: {
            fontSize: '19px',
            fontWeight: 900,
            fontFamily: fontTypes.fontFamilySecondary,
        },
        h2: {
            fontSize: '19px',
            fontWeight: 700,
            fontFamily: fontTypes.fontFamilySecondary,
        },
        h3: {
            fontSize: '14px',
            fontWeight: 400,
            fontFamily: fontTypes.baseFontFamily,
        },
        h3Bold: {
            fontSize: '14px',
            fontWeight: 700,
            fontFamily: fontTypes.fontFamilySecondary,
        },
        p1: {
            fontSize: '19px',
            fontWeight: 400,
            fontFamily: fontTypes.baseFontFamily,
        },
        p2: {
            fontSize: '15px',
            fontWeight: 400,
            fontFamily: fontTypes.baseFontFamily,
        },
        p3: {
            fontSize: '14px',
            fontWeight: 400,
            fontFamily: fontTypes.baseFontFamily,
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1600,
        },
    },
    spacing: 4,
    components: {
        MuiInputBase: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        '& > fieldset': { borderColor: 'orange' },
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiContainedInput-root': {
                        '&.Mui-focused fieldset': {
                            borderColor: 'red',
                        },
                    },
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    minWidth: '445px',
                    borderRadius: 10,
                },
            },
        },
        MuiDialogContent: {
            styleOverrides: {
                root: {
                    padding: '24px !important',
                },
            },
        },
        MuiDialogActions: {
            styleOverrides: {
                root: {
                    padding: '24px !important',
                    // borderTop: `1px solid ${borders[500]}`,
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                root: {
                    '& .MuiTabs-indicator': {
                        height: 3,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                        backgroundColor: '#FFB23F',
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: 'none',
                    },
                },
            },
        },
        MuiTablePagination: {
            styleOverrides: {
                root: {
                    '& .MuiTablePagination-actions': {
                        color: baseColors.primary,
                        '& button .MuiSvgIcon-root': {
                            fontSize: '32px',
                        },
                        '& > .MuiButtonBase-root.Mui-disabled': {
                            color: baseColors.secondary,
                        },
                    },
                },
            },
        },
        MuiTableBody: {
            styleOverrides: {
                root: {
                    '& > tr:last-child': {
                        border: 0,
                    },
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    '&.Mui-selected': {
                        color: baseColors.primary,
                    },
                },
            },
        },
    },
});

declare module '@mui/material/styles' {
    interface Palette {
        primary: Palette['primary'];
        neutral: Palette['primary'];
        tertiary: Palette['secondary'];
        quatinary?: Palette['secondary'];
        white?: Palette['quatinary'];
        tertiaryButton?: Palette['secondary'];
        quatinaryButton: Palette['quatinary'];
    }

    // allow configuration using `createTheme`
    interface PaletteOptions {
        neutral?: PaletteOptions['primary'];
        tertiary?: Palette['tertiary'];
        quatinary?: Palette['quatinary'];
        white?: Palette['quatinary'];
        tertiaryButton: PaletteColorOptions;
        quatinaryButton: Palette['quatinary'];
    }

    interface TypographyVariants {
        h1: React.CSSProperties;
        h2: React.CSSProperties;
        h3: React.CSSProperties;
        h3Bold: React.CSSProperties;
        p1?: React.CSSProperties;
        p2?: React.CSSProperties;
        p3: React.CSSProperties;
        drawerLinkActive?: React.CSSProperties;
        modalsText?: React.CSSProperties;
        fontFamilySecondary: string;
    }

    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        h1?: React.CSSProperties;
        h2?: React.CSSProperties;
        h3?: React.CSSProperties;
        h3Bold?: React.CSSProperties;
        p1?: React.CSSProperties;
        p2?: React.CSSProperties;
        p3: React.CSSProperties;
        drawerLinkActive?: React.CSSProperties;
        modalsText?: React.CSSProperties;
        fontFamilySecondary: string;
    }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        h1: true;
        h2: true;
        h3: true;
        h3Bold: true;
        p1: true;
        p2: true;
        p3: true;
        drawerLinkActive: true;
        modalsText: true;
        fontFamilySecondary: string;
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        tertiary: true;
        quatinary: true;
    }
}
