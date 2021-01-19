import {IUserDao} from "@daos/User/UserDao";
import {IUserQueryParams} from "@shared/QueryParams/UserQueryParams";
import {IUserDaoResponse} from "@daos/User/UserDaoResponse";

export interface IUserService {
    getUserById: (id: number) => Promise<IUserDaoResponse>;
    getUsersByQuery: (query: IUserQueryParams) => Promise<IUserDaoResponse>;
}

class UserService<T extends IUserDao> implements IUserService {

    private userDao: T;

    constructor(userDao: T) {
        this.userDao = userDao;
    }

    public async getUsersByQuery(query: IUserQueryParams): Promise<IUserDaoResponse> {
        if (query.hasValues?.()) {
            try {
                return await this.userDao.getUsersByQuery(query);
            } catch (e) {
                throw new Error();
            }
        }

        try {
            return await this.userDao.getAll();
        } catch (e) {
            throw new Error(e)
        }
    }

    public async getUserById(id: number): Promise<IUserDaoResponse> {
        try {
            return await this.userDao.getUserById(id);
        } catch (e) {
            throw new Error(e)
        }
    }
}

export default UserService;
