import { deleteComment } from '@/api/api';
import { useMutation, useQueryClient } from 'react-query';
import CacheKeyTypes from './cacheKeyTypes';
import { useSearchParams } from 'react-router-dom';

const useCommentDeletion = () => {
    const [searchParams] = useSearchParams();
    const postId = searchParams.get('modalId');
    const client = useQueryClient();
    const { mutate, isLoading, isIdle } = useMutation(
        [CacheKeyTypes.Comments],
        deleteComment,
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

export default useCommentDeletion;
