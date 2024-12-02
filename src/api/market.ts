import request from '@/utils/request';

export function login(code: string){
    return request({
        url: '/create',
        method:"get",
        params:{
            code: code
        }
    })
}
