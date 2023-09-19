import { getPosts } from '@/api/api';
import { useQuery } from 'react-query';
import CacheKeyTypes from './cacheKeyTypes';

const usePosts = () => {
    const { data, isError, isLoading, isFetching } = useQuery(
        CacheKeyTypes.Posts,
        getPosts
    );

    return { data, isError, isFetching, isLoading };
};

export default usePosts;
