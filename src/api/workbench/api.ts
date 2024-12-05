import request from '@/util/request';
import type {detail, project} from "@/api/workbench/type.ts";

// 新建项目
export async function creatProject(data: detail):Promise<any> {
    try {
        const response = await request({
            url: '/project/create',
            method: "post",
            data: data
        });
         response;
    } catch (error) {
        console.error('新建项目请求失败：', error);
    }
}

// 修改项目信息
export async function editProject(data: project):Promise<any>{
    try {
        const response = await request({
            url: '/project/edit',
            method: "post",
            data: data
        })
        return response;
    } catch (error) {
        console.error('修改项目请求失败：', error);
    }
}