import StatusCodes from "http-status-codes";
import {NextFunction, Request, Response, Router} from "express";

import PostDao from "@daos/Post/PostDao";
import {BaseResponse, ListResponse} from "@shared/BaseResponse";
import PostService, {IPostService} from "../services/Posts";
import {PostDaoResponse} from "@daos/Post/PostDaoResponse";
import {PostQueryParams} from "@shared/QueryParams/PostQueryParams";

const router = Router();
const postDao = new PostDao();
const postsService: IPostService = new PostService(postDao);
const {OK} = StatusCodes;


/******************************************************************************
 *        Get All Posts By Query (Query is optional) - "GET /api/posts"
 ******************************************************************************/

router.get('/', async (req: Request, res: Response, next: NextFunction) => {

    try {
        const posts: PostDaoResponse =
            await postsService.getPostsByQuery(new PostQueryParams(req.query));
        return res.status(OK).json(new ListResponse(posts.posts, posts.totalCount));
    } catch (e) {
        next(e)
    }
});

/******************************************************************************
 *                      Get Post by id - "GET /api/posts"
 ******************************************************************************/

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {

    const {id} = req.params;

    try {
        const post = await postsService.getPostById(Number(id));
        return res.status(OK).json(new BaseResponse(post));
    } catch (e) {
        next(e)
    }
});


/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
