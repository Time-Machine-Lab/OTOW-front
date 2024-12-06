// 项目类
export interface project extends detail{
    id: number
}
export interface detail {
    name: string
    description: string
    introduce: string
    price: number
    codeLanguage: string
    cover: string
    url: string
}
// 项目信息类
export interface WorkProject {
    id: string
    name: string
    codeLanguage: string
    cover: string
    description: string
    introduce: string
    nickname: string
    downloadNums: string
    viewNums: string
    price: number
}