import { get, post } from '@/utils/request';

const login = (data: object) => {
    return post('ndsvc/user/login', data);
};

const getUserInfo = (data: object) => {
    return post('user/info', data);
};





export {
    login,
    getUserInfo,

};