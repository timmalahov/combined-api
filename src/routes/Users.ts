import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';

import UserDao from '@daos/User/UserDao.mock';
import { UserQueryParams } from "@shared/QueryParams/UserQueryParams";
import {BaseResponse, ListResponse} from "@shared/BaseResponse";
import { size } from "lodash";

const router = Router();
const usersDao = new UserDao();
const { INTERNAL_SERVER_ERROR, NOT_FOUND, OK } = StatusCodes;



/******************************************************************************
 *                      Get All Users - "GET /api/users/"
 ******************************************************************************/

router.get('/', async (req: Request, res: Response) => {

    if (size(Object.keys(req.query))) {
        try {
            const users = await usersDao.getUsersByQuery(new UserQueryParams(req.query));
            return res.status(OK).json(new ListResponse(users, size(users)));
        } catch (e) {
            return res.status(INTERNAL_SERVER_ERROR).json(e).end();
        }
    }

    try {
        const users = await usersDao.getAll();
        return res.status(OK).json(new ListResponse(users, size(users)));
    } catch (e) {
        return res.status(NOT_FOUND).end();
    }
});



/******************************************************************************
 *                      Get User by id - "GET /api/users/:id"
 ******************************************************************************/

router.get('/:id', async (req: Request, res: Response) => {

    const { id } = req.params;

    try {
        const user = await usersDao.getUserById(Number(id));
        return res.status(OK).json(new BaseResponse(user));
    } catch (e) {
        return res.status(NOT_FOUND).end();
    }
});



/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
