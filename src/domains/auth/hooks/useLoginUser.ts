import { loginUser } from '@/api/api';
import { useMutation } from 'react-query';

const useLoginUser = () => {
    const { data, mutate, isSuccess } = useMutation(loginUser, {
        onSuccess: (data) => data,
        onError: (error: any) => error.message,
    });

    return { mutate, isSuccess, data };
};

export { useLoginUser };
