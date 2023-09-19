import { getComments } from '@/api/api';
import { useQuery } from 'react-query';
import CacheKeyTypes from './cacheKeyTypes';

const useCommentsByPostId = (postId: string) => {
    const { data, isError, isLoading, isFetching } = useQuery(
        [CacheKeyTypes.Comments, postId],
        () => getComments(postId),
        { enabled: !!postId }
    );

    return { data, isError, isFetching, isLoading };
};

export default useCommentsByPostId;
