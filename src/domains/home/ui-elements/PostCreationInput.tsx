import { configApp } from '@/config';
import { useForm } from '@/hooks/useForm';
import { TextField, Typography } from '@mui/material';
import { memo } from 'react';

const PostCreationInput = () => {
    const { fields, onChange } = useForm({ text: '' });

    return (
        <>
            <TextField
                name="text"
                variant="standard"
                placeholder="What's happening"
                value={fields?.text}
                autoComplete="off"
                onChange={onChange}
            />
            {fields?.text?.length > 0 ? (
                <Typography variant="p3" color="secondary">
                    {fields?.text?.length}/{configApp.MAX_POST_CHARACTERS}
                </Typography>
            ) : null}
        </>
    );
};

PostCreationInput.displayName = 'PostCreationInput';
export default memo(PostCreationInput);
