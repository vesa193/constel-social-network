import { Box, TextField } from '@mui/material';
import { ChangeEvent, ReactNode } from 'react';

type InputProps = {
    name: string;
    label: string;
    placeholder: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    helperText?: ReactNode;
};

const Input = ({
    name,
    label,
    placeholder,
    value,
    onChange,
    helperText,
}: InputProps) => {
    return (
        <Box display="flex" flexDirection="column">
            <label htmlFor={name}>
                <strong>{label}</strong>
            </label>
            <TextField
                sx={{
                    '.MuiOutlinedInput-root': {
                        borderRadius: '10px',
                    },
                }}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                helperText={helperText}
            />
        </Box>
    );
};

export default Input;
