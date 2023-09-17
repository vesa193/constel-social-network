import Input from '@components/form/Input';
import styles from './LoginScreen.module.css';
import { Avatar, Box, Button, Typography } from '@mui/material';
import { useForm } from '@/hooks/useForm';
import constelLogo from '@assets/img/constel_logo.svg';
import { useLoginUser } from './hooks/useLoginUser';
import { FormEvent, useState } from 'react';
import { validateInfo } from '@/hooks/validateInfo';

const initialState = {
    email: '',
    password: '',
};

const LoginScreen = () => {
    const { fields, onChange, onReset, setErrors, errors } =
        useForm(initialState);
    const { data: loginData, isSuccess, mutate } = useLoginUser();

    const handleOnSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log('validateInfo(fields)', validateInfo(fields));
        if (Object.keys(validateInfo(fields))?.length) {
            setErrors(validateInfo(fields));
            return;
        }

        const formData = {
            email: fields?.email,
            password: fields?.password,
        };

        mutate(formData);
        isSuccess && onReset();
    };

    const isSubmitButtonDisabled =
        !fields?.email ||
        !fields?.password ||
        !!errors.email ||
        !!errors.password;

    return (
        <div className={styles.login}>
            <Avatar
                src={constelLogo}
                sx={{
                    width: '78px',
                    height: '78px',
                }}
            />
            <Box
                component="form"
                className={styles['login-form']}
                onSubmit={handleOnSubmit}
            >
                <Input
                    name="email"
                    label="Email"
                    placeholder="Enter email here..."
                    value={fields.email}
                    onChange={onChange}
                    helperText={
                        errors?.email && (
                            <Typography color="red">{errors?.email}</Typography>
                        )
                    }
                />

                <Input
                    name="password"
                    label="Password"
                    placeholder="Enter password here..."
                    value={fields.password}
                    onChange={onChange}
                    helperText={
                        errors?.password && (
                            <Typography color="red">
                                {errors?.password}
                            </Typography>
                        )
                    }
                />

                {loginData?.error && (
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        sx={{
                            backgroundColor: 'red',
                            color: '#fff',
                            height: '30px',
                            borderRadius: '10px',
                            fontSize: '14px',
                        }}
                    >
                        {loginData?.error?.message}
                    </Box>
                )}

                <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitButtonDisabled}
                >
                    Confirm
                </Button>
            </Box>
        </div>
    );
};

export default LoginScreen;
