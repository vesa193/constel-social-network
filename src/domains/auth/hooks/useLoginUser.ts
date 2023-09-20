import { loginUser } from '@/api/api';
import { AuthContext } from '@/context/AuthtContext';
import { routePaths } from '@/router/routePaths';
import axios from 'axios';
import { useContext } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

const useLoginUser = () => {
    const { setToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const { data, mutate, isSuccess } = useMutation(loginUser, {
        onSuccess: async (data) => {
            if (data?.token) {
                setToken(data.token);
                localStorage.setItem('token', data?.token);
                navigate(routePaths.HOME, {
                    replace: true,
                    state: { from: routePaths.LOGIN, token: data.token },
                });
                axios.defaults.headers[
                    'Authorization'
                ] = `Bearer ${data.token}`;

                return data;
            }
        },
        onError: (error: any) => error.message,
    });

    return { mutate, isSuccess, data };
};

export { useLoginUser };
