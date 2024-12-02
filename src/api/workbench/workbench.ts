import request from '@/utils/request';
import type {project} from "@/api/workbench/type.ts";

export function login(params: project){
    return request({
        url: '/create',
        method:"post",
        params:params
    })
}