export interface IPost {
    id: number;
    userId: number;
    title: string;
    body: string;
}

class Post implements IPost {

    public id: number;
    public userId: number;
    public title: string;
    public body: string;

    constructor(post: IPost) {
        this.id = post.id
        this.userId = post.userId
        this.title = post.title
        this.body = post.body
    }
}

export default Post;
