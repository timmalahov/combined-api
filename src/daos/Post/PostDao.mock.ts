import {IPostDao} from './PostDao';
import Post, {IPost} from "@entities/Post";
import axios from "axios";
import { isNil } from "lodash";
import { IPostQueryParams } from "@shared/QueryParams/PostQueryParams";
import {parseParameter} from "@shared/functions";


class PostDao implements IPostDao {

    public async getAll(): Promise<IPost[]> {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
            const postsData: IPost[] = await response.data;
            const posts = postsData.map(postData => new Post(postData))
            return posts;
        } catch (e) {
            throw new Error()
        }
    }

    public async getPostById(id: number): Promise<IPost> {
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
            const postData: IPost = await response.data;
            const post = new Post(postData);
            return post
        } catch (e) {
            throw new Error()
        }
    }

    public async getPostsByQuery(query: IPostQueryParams ): Promise<IPost[]> {
        const { name, userId, offset, limit } = query;

        try {
            const userIdParams = userId ? `userId=${ Number(userId)}` : '';

            const response = await
                axios.get(`https://jsonplaceholder.typicode.com/posts/?${ userIdParams }`);
            const postsData: IPost[] = await response.data;

            const nameString = parseParameter(name);

            const resultPosts: IPost[] =
                nameString
                ? postsData.filter(post => post.title.includes(nameString))
                : postsData

            if (!isNil(offset) && !isNil(limit)) {
                return resultPosts.slice(offset, offset + limit);
            }

            return resultPosts;
        } catch (e) {
            throw new Error()
        }
    }
}

export default PostDao;
