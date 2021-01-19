import Post, {IPost} from "@entities/Post";
import axios from "axios";
import size from "lodash.size";
import {IPostQueryParams} from "@shared/QueryParams/PostQueryParams";
import {parseParameter} from "@shared/functions";
import {IPostDaoResponse, PostDaoResponse} from "@daos/Post/PostDaoResponse";


export interface IPostDao {
    getAll: () => Promise<IPostDaoResponse>;
    getPostById: (id: number) => Promise<IPostDaoResponse>;
    getPostsByQuery: (query: IPostQueryParams) => Promise<IPostDaoResponse>;
}

class PostDao implements IPostDao {

    public async getAll(): Promise<IPostDaoResponse> {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
            const postsData: IPost[] = response.data;
            const posts = postsData.map(postData => new Post(postData))
            return new PostDaoResponse(posts, size(posts));
        } catch (e) {
            throw new Error(e);
        }
    }

    public async getPostById(id: number): Promise<IPostDaoResponse> {
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
            const postData: IPost = response.data;
            const post = new Post(postData);
            return new PostDaoResponse([post]);
        } catch (e) {
            throw new Error(e);
        }
    }

    public async getPostsByQuery(query: IPostQueryParams): Promise<IPostDaoResponse> {
        const {name, userId, offset = 0, limit} = query;

        try {
            const userIdParams = userId ? `userId=${Number(userId)}` : '';

            const response = await
                axios.get(`https://jsonplaceholder.typicode.com/posts/?${userIdParams}`);
            const postsData: IPost[] = response.data;

            const nameString = parseParameter(name);

            const filteredPosts: IPost[] =
                nameString
                    ? postsData.filter(post => post.title.includes(nameString))
                    : postsData

            const resultPosts: Post[] = filteredPosts.map(postData => new Post(postData));

            if (limit) {
                return new PostDaoResponse(
                    resultPosts.slice(offset, offset + limit),
                    size(filteredPosts)
                );
            }

            return new PostDaoResponse(resultPosts, size(filteredPosts));
        } catch (e) {
            throw new Error(e)
        }
    }
}

export default PostDao;
