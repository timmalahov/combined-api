import StatusCodes from "http-status-codes";
import { Request, Response, Router } from "express";

import PostDao from "@daos/Post/PostDao.mock";
import {BaseResponse, ListResponse} from "@shared/BaseResponse";
import { size } from "lodash";
import { PostQueryParams } from "@shared/QueryParams/PostQueryParams";

const router = Router();
const postDao = new PostDao();
const { OK, NOT_FOUND, INTERNAL_SERVER_ERROR } = StatusCodes;



/******************************************************************************
 *        Get All Posts By Query (Query is optional) - "GET /api/posts"
 ******************************************************************************/

router.get('/', async (req: Request, res: Response) => {

    if (size(Object.keys(req.query))) {
        try {
            const posts = await postDao.getPostsByQuery(new PostQueryParams(req.query));
            return res.status(OK).json(new ListResponse(posts, size(posts)));
        } catch (e) {
            return res.status(INTERNAL_SERVER_ERROR).json(e).end();
        }
    }

    try {
        const posts = await postDao.getAll();
        return res.status(OK).json(new ListResponse(posts, size(posts)));
    } catch (e) {
        return res.status(NOT_FOUND).end();
    }
});

/******************************************************************************
 *                      Get Post by id - "GET /api/posts"
 ******************************************************************************/

router.get('/:id', async (req: Request, res: Response) => {

    const { id } = req.params;

    try {
        const post = await postDao.getPostById(Number(id));
        return res.status(OK).json(new BaseResponse(post));
    } catch (e) {
        return res.status(NOT_FOUND).end();
    }
});


/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
