import request from '@/util/request';
import type {projectData, searchProjectListParam} from "@/type/market/Market.ts";

// 查询项目信息
export async function searchProject(searchParam: searchProjectListParam):Promise<projectData[]>{
    console.log(searchParam)
    try {
        const response = await request({
            url: '/project/search',
            method: "post",
            data: searchParam
        })
        return response.data as projectData[];
    } catch (error) {
        console.error('查询项目请求失败：', error);
        return [];
    }
}

export async function downloadProject(id:number):Promise<any>{
    try {
        const response = await request({
            url: '/project/download',
            method: "get",
            params: {
                id: id
            }
        })
        return response;
    } catch (error) {
        console.error('下载项目请求失败：', error);
    }
}