import request from '@/util/request';
import type {LoginForm, RegisterForm} from "@/api/login/type.ts";

export function sendPicCaptcha():Promise<any>{
    return request.post('/user/captcha')
}


export function emailLogin(loginForm: LoginForm):Promise<any>{
    return request.post('/user/login',loginForm)
}

export function emailRegister(registerForm: RegisterForm):Promise<any>{
    return request.post('/user/register',registerForm)
}

export function sendCodeToEmail(email: string,pid: string,code: string):Promise<any>{
    return request({
        url: '/user/sendCaptcha',
        method:"post",
        params:{
            email: email,
            pid: pid,
            code: code
        }
    })
}

export function getUserInfo():Promise<any>{
    return request({
        url: '/user/getInfo',
        method:"get",
    })
}
