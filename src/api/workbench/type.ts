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

