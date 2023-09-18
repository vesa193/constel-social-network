import { Box, TextField } from '@mui/material';
import { ChangeEvent, ReactNode } from 'react';
import InputLabel from '../text/InputLabel';

type InputFieldProps = {
    name: string;
    label: string;
    placeholder: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    helperText?: ReactNode;
};

const InputField = ({
    name,
    label,
    placeholder,
    value,
    onChange,
    helperText,
}: InputFieldProps) => {
    return (
        <Box display="flex" flexDirection="column">
            <InputLabel htmlFor={name} label={label} />
            <TextField
                sx={{
                    '.MuiOutlinedInput-root': {
                        borderRadius: '10px',
                        fontSize: '14px',
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
InputField.displayName = 'InputField';
export default InputField;
