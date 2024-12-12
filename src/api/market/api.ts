import request from '@/util/request';

// 查询项目信息
export async function searchProject(page: number=1, limit: number=10,cmd: number=2,name?: string):Promise<any>{
    // try {
    //     const response = await request({
    //         url: '/project/search',
    //         method: "post",
    //         params: {
    //             page:page,
    //             limit:limit,
    //             cmd: cmd, //查询类型:1、按时间排序 2、按下载量排序 3、搜索名称
    //             name: name
    //         }
    //     })
    //     return response.data;
    // } catch (error) {
    //     console.error('查询项目请求失败：', error);
    //
    // }
    const mock =  [{
        id: "1863808850090049538",
        name: "小春的项目",
        codeLanguage: "java",
        cover: "嘻嘻",
        description: "嘻嘻",
        introduce: "嘻嘻",
        nickname: "otow管理员",
        price: 78
    }]
    return mock;
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