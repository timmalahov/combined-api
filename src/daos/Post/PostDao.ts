import { IPost } from "@entities/Post";
import { IPostQueryParams } from "@shared/QueryParams/PostQueryParams";



export interface IPostDao {
    getAll: () => Promise<IPost[]>;
    getPostById: (id: number) => Promise<IPost>;
    getPostsByQuery: (query: IPostQueryParams) => Promise<IPost[]>;
}

class PostDao implements IPostDao {

    /**
     *
     */
    public getAll(): Promise<IPost[]> {
        return Promise.resolve([]);
    }

    /**
     *
     */
    public getPostById(id: number): Promise<IPost> {
        return Promise.resolve({
            id: 0,
            userId: 0,
            title: '',
            body: ''
        });
    }

    /**
     *
     */
    public getPostsByQuery(query: IPostQueryParams): Promise<IPost[]> {
        return Promise.resolve([]);
    }
}

export default PostDao;
