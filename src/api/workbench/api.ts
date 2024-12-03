import request from '@/utils/request';
import type {detail, project} from "@/api/workbench/type.ts";

// 新建项目
export function creatProject(params: detail){
    return request({
        url: '/create',
        method:"post",
        params:params
    })
}

// 修改项目信息
export function editProject(params: project){
    return request({
        url: '/edit',
        method:"post",
        params:params
    })
}

// 查询项目信息
export function searchProject(params: project){
    return request({
        url: '/search',
        method:"post",
        params:params
    })
}