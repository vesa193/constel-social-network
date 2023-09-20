import { useMutation, useQueryClient } from 'react-query';
import CacheKeyTypes from './cacheKeyTypes';
import { postLike } from '@/api/api';
import { useSearchParams } from 'react-router-dom';

const useLikeCreation = () => {
    const [searchParams] = useSearchParams();
    const postId = searchParams.get('modalId');
    const client = useQueryClient();
    const { mutate, isLoading, isIdle } = useMutation(
        [CacheKeyTypes.Like],
        postLike,
        {
            onSuccess: () => {
                client.invalidateQueries([CacheKeyTypes.Posts]);
                client.invalidateQueries([CacheKeyTypes.Like]);
                client.invalidateQueries([CacheKeyTypes.Post, postId]);
            },
        }
    );

    return { mutate, isLoading, isIdle };
};

export default useLikeCreation;
