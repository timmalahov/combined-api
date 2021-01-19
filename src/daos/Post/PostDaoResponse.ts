import {IPost} from "@entities/Post";


export interface IPostDaoResponse {
    posts: IPost[],
    totalCount: number | undefined
}

export class PostDaoResponse implements IPostDaoResponse {
    public posts: IPost[];
    public totalCount: number | undefined;

    constructor(posts: IPost[], totalCount?: number) {
        this.posts = posts;
        this.totalCount = totalCount
    }
}
