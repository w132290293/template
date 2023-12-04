import { get, post } from '@/utils/request'

const login = (data: Object) => {
    return post('ndsvc/user/login', data)
}

const getUserInfo = (data: Object) => {
    return post('user/info', data)
}





export {
    login,
    getUserInfo,
    
}