import axios from 'axios';

const token = localStorage.getItem('token');

const axiosInstance = (isMultiform: boolean = false) =>
    axios.create({
        baseURL: 'https://api.hr.constel.co/api/v1' || '',
        headers: token
            ? {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': isMultiform
                      ? 'multipart/form-data'
                      : 'application/json',
              }
            : {
                  'Content-Type': 'application/json',
              },
    });

const endpoints = {
    login: '/login',
    posts: '/posts',
};

/*
 *Login - [ POST ]
 */

export const loginUser = (loginData: any) =>
    axiosInstance()
        .post(endpoints.login, loginData)
        .then((response) => response.data)
        .catch((error: any) => {
            return error?.response?.data;
        });

/*
 *Posts - [ GET ]
 */

export const getPosts = () =>
    axiosInstance()
        .get(endpoints.posts)
        .then((response) => response.data)
        .catch((error: any) => {
            return error?.response?.data;
        });

export const getPost = (postId: string) =>
    axiosInstance()
        .get(`${endpoints.posts}/${postId}`)
        .then((response) => response.data)
        .catch((error: any) => {
            return error?.response?.data;
        });

/*
 *Comments - [ GET ]
 */
export const getComments = (postId: string) =>
    axiosInstance()
        .get(`${endpoints.posts}/${postId}/comments`)
        .then((response) => response.data)
        .catch((error: any) => {
            return error?.response?.data;
        });
