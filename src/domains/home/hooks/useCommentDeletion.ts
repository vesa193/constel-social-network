import { deleteComment } from '@/api/api';
import { useMutation, useQueryClient } from 'react-query';
import CacheKeyTypes from './cacheKeyTypes';

const useCommentDeletion = () => {
    const client = useQueryClient();
    const { mutate, isLoading, isIdle } = useMutation(
        [CacheKeyTypes.Comments],
        deleteComment,
        {
            onSuccess: () => {
                client.invalidateQueries([CacheKeyTypes.Posts]);
                client.invalidateQueries([CacheKeyTypes.Comments]);
            },
        }
    );

    return { mutate, isLoading, isIdle };
};

export default useCommentDeletion;
