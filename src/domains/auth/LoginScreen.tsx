import BaseButton from '@/components/button/BaseButton';
import Input from '@/components/form/InputField';
import { useForm } from '@/hooks/useForm';
import { validateInfo } from '@/hooks/validateInfo';
import constelLogo from '@assets/img/constel_logo.svg';
import { Avatar, Box, Typography } from '@mui/material';
import { FormEvent } from 'react';

import styles from './LoginScreen.module.css';
import { useLoginUser } from './hooks/useLoginUser';

const initialState = {
    email: '',
    password: '',
};

const LoginScreen = () => {
    const { fields, onChange, onReset, setErrors, errors } =
        useForm(initialState);
    const { data: loginData, mutate } = useLoginUser();

    const handleOnSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (Object.keys(validateInfo(fields))?.length) {
            setErrors(validateInfo(fields));
            return;
        }

        const formData = {
            email: fields?.email,
            password: fields?.password,
        };

        try {
            mutate(formData);
            onReset();
        } catch (error) {}
    };

    const isSubmitButtonDisabled =
        !fields?.email ||
        !fields?.password ||
        !!errors.email ||
        !!errors.password;

    return (
        <div className={styles.login}>
            <Box
                component="form"
                className={styles['login-form']}
                onSubmit={handleOnSubmit}
            >
                <Avatar
                    src={constelLogo}
                    sx={{
                        width: '78px',
                        height: '78px',
                        display: 'flex',
                        alignSelf: 'center',
                    }}
                />
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

                <Box display="flex" justifyContent="center">
                    <BaseButton
                        type="submit"
                        color={
                            isSubmitButtonDisabled ? 'secondary' : 'tertiary'
                        }
                        isDisabled={isSubmitButtonDisabled}
                    >
                        Confirm
                    </BaseButton>
                </Box>
            </Box>
        </div>
    );
};

LoginScreen.displayName = 'LoginScreen';
export default LoginScreen;
