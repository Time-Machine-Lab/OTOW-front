import request from '@/util/request';

// 登录
export async function login(code:string,email:string):Promise<any>{
    try {
        const response = await request({
            url: '/user/login',
            method: "post",
            params: {
                code:code,
                email:email
            }
        })
        return response;
    } catch (error) {
        console.error('登录请求失败：', error);
    }
}
// 登出
export async function logout(code:string,email:string):Promise<any>{
    try {
        const response = await request({
            url: '/user/logout',
            method: "post",
        })
        return response;
    } catch (error) {
        console.error('登出请求失败：', error);
    }
}
// 发送图片验证码
export async function captcha():Promise<any>{
    try {
        const response = await request({
            url: '/user/captcha',
            method: "get",
        })
        return response;
    } catch (error) {
        console.error('发送图片验证码请求失败：', error);
    }
}
// 发送邮箱验证码
export async function sendCaptcha(email:string,pid:string,code:string):Promise<any>{
    try {
        const response = await request({
            url: '/user/sendCaptcha',
            method: "get",
            data:{
                email: email,
                pid:pid,
                code:code
            }
        })
        return response;
    } catch (error) {
        console.error('发送邮箱验证码请求失败：', error);
    }
}
// 获取当前登录用户信息
export async function getInfo(code:string,email:string):Promise<any>{
    try {
        const response = await request({
            url: '/user/getInfo',
            method: "get",
        })
        return response;
    } catch (error) {
        console.error('获取用户信息请求失败：', error);
    }
}