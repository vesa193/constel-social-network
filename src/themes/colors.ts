export enum BaseColors {
    WHITE = '#FFFFFF',
    BLACK = '#222222',
    GREY1 = '#F9F9F9',
    GREY2 = '#D9D9D9',
    GREY3 = '#A6A6A6',
    GREY4 = '#848484',
    BLUE = '#157EFF',
    BLUE_ACTIVE = '#005BCA',
    RED = '#FF1515',
    GREEN = '#52A86E',
}

export const baseBackground = {
    default: BaseColors.WHITE,
    white: BaseColors.WHITE,
    postBgd: BaseColors.GREY1,
    grey4: BaseColors.GREY4,
};

export const baseColors = {
    white: BaseColors.WHITE,
    primary: BaseColors.BLACK,
    secondary: BaseColors.GREY3,
    tertiary: BaseColors.BLUE,
    quatinary: BaseColors.GREY2,
    error: BaseColors.RED,
    success: BaseColors.GREEN,
};

export const buttonColors = {
    buttonActive: BaseColors.BLUE,
    buttonActiveHover: BaseColors.BLUE_ACTIVE,
    buttonDisabled: BaseColors.GREY3,
    buttonDisabledHover: BaseColors.GREY4,
};

export const textColors = {
    primary: baseColors.primary,
    secondary: baseColors.secondary,
    tertiary: baseColors.tertiary,
    quatinary: baseColors.quatinary,
};

export const borders = {
    500: BaseColors.GREY2,
};

export const success = {
    500: BaseColors.GREEN,
};

export const error = {
    500: BaseColors.RED,
};
