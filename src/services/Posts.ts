import {IUserQueryParams} from "@shared/QueryParams/UserQueryParams";
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
                const response = await this.postDao.getPostsByQuery(query);
                return response
            } catch (e) {
                throw new Error();
            }
        }

        try {
            const response = await this.postDao.getAll();
            return response
        } catch (e) {
            throw new Error(e)
        }
    }

    public async getPostById(id: number): Promise<IPostDaoResponse> {
        try {
            const response = await this.postDao.getPostById(id);
            return response
        } catch (e) {
            throw new Error(e)
        }
    }
}

export default PostService;
