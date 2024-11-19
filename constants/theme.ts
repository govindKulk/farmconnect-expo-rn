import { ColorValue } from 'react-native';

interface ITheme {
    colors: {
        primary: ColorValue;
        primaryDark: ColorValue;
        dark: ColorValue;
        darkLight: ColorValue;
        gray: ColorValue;

        text: ColorValue;
        textLight: ColorValue;
        textDark: ColorValue;

        rose: ColorValue;
        roseLight: ColorValue;
    };
    fonts: {
        medium: '500';
        semibold: '600';
        bold: '700';
        extraBold: '800';
    };
    radius: {
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
        xxl: number;
    };
}

export const theme: ITheme = {
    colors: {
        primary: '#00C26F',
        primaryDark: '#00AC62',
        dark: '#3E3E3E',
        darkLight: '#E1E1E1',
        gray: '#E3E3E3',

        text: '#494949',
        textLight: '#7C7C7C',
        textDark: '#1D1D1D',

        rose: '#EF4444',
        roseLight: '#F87171',
    },
    fonts: {
        medium: '500',
        semibold: '600',
        bold: '700',
        extraBold: '800',
    },
    radius: {
        xs: 10,
        sm: 12,
        md: 14,
        lg: 16,
        xl: 18,
        xxl: 22,
    },
};
