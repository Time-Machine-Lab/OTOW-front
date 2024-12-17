export interface projectData {
        // 项目id
        id: string;
        // 项目名称
        name: string;
        // 介绍
        introduce: string;
        // 价格
        price: number;
        // 封面
        cover: string;
        // 项目语言
        codeLanguage: string;
        // 浏览数量
        viewNums: number;
        // 下载数量
        downloadNums: number;
        // 作者
        nickname: string;
}

export interface searchProjectListParam{
    name: string;

    language: string;

    min: number;

    max: number;

    page: number;

    limit: number;

}