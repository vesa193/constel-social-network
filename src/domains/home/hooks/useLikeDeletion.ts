import { deleteLike } from '@/api/api';
import { useMutation, useQueryClient } from 'react-query';
import CacheKeyTypes from './cacheKeyTypes';

const useLikeDeletion = () => {
    const client = useQueryClient();
    const { mutate, isLoading, isIdle } = useMutation(
        [CacheKeyTypes.Like],
        deleteLike,
        {
            onSuccess: () => {
                client.invalidateQueries([CacheKeyTypes.Posts]);
            },
        }
    );

    return { mutate, isLoading, isIdle };
};

export default useLikeDeletion;
