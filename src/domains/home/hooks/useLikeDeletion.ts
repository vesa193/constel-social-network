import { deleteLike } from '@/api/api';
import { useMutation, useQueryClient } from 'react-query';
import CacheKeyTypes from './cacheKeyTypes';
import { useSearchParams } from 'react-router-dom';

const useLikeDeletion = () => {
    const [searchParams] = useSearchParams();
    const postId = searchParams.get('modalId');
    const client = useQueryClient();
    const { mutate, isLoading, isIdle } = useMutation(
        [CacheKeyTypes.Like],
        deleteLike,
        {
            onSuccess: () => {
                client.invalidateQueries([CacheKeyTypes.Posts]);
                client.invalidateQueries([CacheKeyTypes.Post, postId]);
            },
        }
    );

    return { mutate, isLoading, isIdle };
};

export default useLikeDeletion;
