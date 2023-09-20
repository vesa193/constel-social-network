import { getMe } from '@/api/api';
import { useQuery } from 'react-query';
import CacheKeyTypes from './cacheKeyTypes';

const useMyAccount = () => {
    const { data, isError, isLoading, isFetching } = useQuery(
        CacheKeyTypes.MyAccount,
        getMe
    );

    return { data, isError, isFetching, isLoading };
};

export default useMyAccount;
