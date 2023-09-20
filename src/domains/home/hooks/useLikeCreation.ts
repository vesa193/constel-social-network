import { useMutation, useQueryClient } from 'react-query';
import CacheKeyTypes from './cacheKeyTypes';
import { postLike } from '@/api/api';

const useLikeCreation = () => {
    const client = useQueryClient();
    const { mutate, isLoading, isIdle } = useMutation(
        [CacheKeyTypes.Like],
        postLike,
        {
            onSuccess: () => {
                client.invalidateQueries([CacheKeyTypes.Posts]);
            },
        }
    );

    return { mutate, isLoading, isIdle };
};

export default useLikeCreation;
