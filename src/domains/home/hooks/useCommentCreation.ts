import { postComment } from '@/api/api';
import { useMutation, useQueryClient } from 'react-query';
import CacheKeyTypes from './cacheKeyTypes';

const useCommentCreation = () => {
    const client = useQueryClient();
    const { mutate, isLoading, isIdle } = useMutation(
        [CacheKeyTypes.Comments],
        postComment,
        {
            onSuccess: () => {
                client.invalidateQueries([CacheKeyTypes.Posts]);
                client.invalidateQueries([CacheKeyTypes.Comments]);
            },
        }
    );

    return { mutate, isLoading, isIdle };
};

export default useCommentCreation;
