import request from '@/util/request';
import type {ProjectData, SearchProjectListParam} from "@/type/market/Market.ts";
import type {PageResult} from "@/type/common/pageResult.ts";

// 查询项目信息
export async function searchProject(searchParam: SearchProjectListParam):Promise<PageResult<ProjectData>>{
    try {
        const response = await request({
            url: '/project/search',
            method: "post",
            data: searchParam
        })
        return response.data as PageResult<ProjectData>;
    } catch (error) {
        console.error('查询项目请求失败：', error);
        return { respList: [], total: 0 };
    }
}

export async function downloadProject(id: string):Promise<any>{
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