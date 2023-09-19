import { getPost } from '@/api/api';
import { useQuery } from 'react-query';
import CacheKeyTypes from './cacheKeyTypes';

const usePost = (postId: string) => {
    const { data, isError, isLoading, isFetching } = useQuery(
        [CacheKeyTypes.Post, postId],
        () => getPost(postId),
        { enabled: !!postId }
    );

    return { data, isError, isFetching, isLoading };
};

export default usePost;
