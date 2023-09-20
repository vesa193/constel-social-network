import { createPost } from '@/api/api';
import { useMutation, useQueryClient } from 'react-query';
import CacheKeyTypes from './cacheKeyTypes';

const usePostCreation = () => {
    const client = useQueryClient();
    const { mutate, isLoading, isIdle } = useMutation(
        [CacheKeyTypes.Comments],
        createPost,
        {
            onSuccess: () => {
                client.invalidateQueries([CacheKeyTypes.Posts]);
            },
        }
    );

    return { mutate, isLoading, isIdle };
};

export default usePostCreation;
