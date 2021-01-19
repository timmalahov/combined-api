import StatusCodes from 'http-status-codes';
import {NextFunction, Request, Response, Router} from 'express';

import UserDao from '@daos/User/UserDao';
import {UserQueryParams} from "@shared/QueryParams/UserQueryParams";
import {ListResponse} from "@shared/BaseResponse";
import UserService from "../services/Users";
import {UserDaoResponse} from "@daos/User/UserDaoResponse";

const router = Router();
const usersDao = new UserDao();
const userService = new UserService(usersDao);
const {OK} = StatusCodes;


/******************************************************************************
 *                      Get All Users - "GET /api/users/"
 ******************************************************************************/

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users: UserDaoResponse =
            await userService.getUsersByQuery(new UserQueryParams(req.query));
        return res.status(OK).json(new ListResponse(users.users, users.totalCount));
    } catch (e) {
        next(e)
    }
});


/******************************************************************************
 *                      Get User by id - "GET /api/users/:id"
 ******************************************************************************/

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {

    const {id} = req.params;

    try {
        const users: UserDaoResponse =
            await userService.getUserById(Number(id));
        return res.status(OK).json(new ListResponse(users.users, users.totalCount));
    } catch (e) {
        next(e)
    }
});


/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
