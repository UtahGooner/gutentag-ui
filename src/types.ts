export interface Chat {
    id: number,
    username: string,
    tagname: string,
    url: string,
    chattext: string,
    flagged: boolean,
    deleted: boolean,
    createdAt: string,
    updatedAt: string,
    deletedAt: string|null,
}

export interface GT6Params {
    user: string,
    id: number
}
