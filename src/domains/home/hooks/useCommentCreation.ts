import { postComment } from '@/api/api';
import { useMutation, useQueryClient } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import CacheKeyTypes from './cacheKeyTypes';

const useCommentCreation = () => {
    const [searchParams] = useSearchParams();
    const postId = searchParams.get('modalId');
    const client = useQueryClient();
    const { mutate, isLoading, isIdle } = useMutation(
        [CacheKeyTypes.Comments],
        postComment,
        {
            onSuccess: () => {
                client.invalidateQueries([CacheKeyTypes.Posts]);
                client.invalidateQueries([CacheKeyTypes.Post, postId]);
                client.invalidateQueries([CacheKeyTypes.Comments]);
            },
        }
    );

    return { mutate, isLoading, isIdle };
};

export default useCommentCreation;
