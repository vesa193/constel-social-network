import { fontTypes } from '@/themes/fonts';
import { Button } from '@mui/material';
import { ReactNode } from 'react';

type ButtonColor =
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning';

type ButtonType = 'button' | 'submit' | 'reset';

type BaseButtonProps = {
    type: ButtonType;
    color?: ButtonColor;
    isDisabled?: boolean;
    children: ReactNode;
    onClick?: () => void;
};

const BaseButton = ({
    type,
    color,
    children,
    isDisabled,
    onClick,
}: BaseButtonProps) => {
    return (
        <Button
            sx={{
                width: '200px',
                borderRadius: '10px',
                textTransform: 'capitalize',
                fontFamily: fontTypes.fontFamilySecondary,
                padding: '10px',
            }}
            type={type || 'button'}
            variant="contained"
            onClick={onClick}
            color={color}
            {...(isDisabled && { disabled: isDisabled })}
        >
            {children}
        </Button>
    );
};

export default BaseButton;
