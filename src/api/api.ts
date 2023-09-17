import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api.hr.constel.co/api/v1' || '',
    headers: {
        'Content-Type': 'application/json',
    },
});

const endpoints = {
    login: '/login',
    positions: '/posts',
};

/*
 *Login
 */

export const loginUser = (loginData: any) =>
    axiosInstance
        .post(endpoints.login, loginData)
        .then((response) => response.data)
        .catch((error: any) => {
            return error?.response?.data;
        });
