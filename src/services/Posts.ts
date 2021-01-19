import {IPostDao} from "@daos/Post/PostDao";
import {IPostDaoResponse} from "@daos/Post/PostDaoResponse";
import {IPostQueryParams} from "@shared/QueryParams/PostQueryParams";

export interface IPostService {
    getPostById: (id: number) => Promise<IPostDaoResponse>;
    getPostsByQuery: (query: IPostQueryParams) => Promise<IPostDaoResponse>;
}

class PostService<T extends IPostDao> implements IPostService {

    private postDao: T;

    constructor(postDao: T) {
        this.postDao = postDao;
    }

    public async getPostsByQuery(query: IPostQueryParams): Promise<IPostDaoResponse> {
        if (query.hasValues?.()) {
            try {
                return await this.postDao.getPostsByQuery(query);
            } catch (e) {
                throw new Error();
            }
        }

        try {
            return await this.postDao.getAll();
        } catch (e) {
            throw new Error(e)
        }
    }

    public async getPostById(id: number): Promise<IPostDaoResponse> {
        try {
            return await this.postDao.getPostById(id);
        } catch (e) {
            throw new Error(e)
        }
    }
}

export default PostService;
