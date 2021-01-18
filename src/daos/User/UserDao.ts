import {IUser} from '@entities/User';
import {IUserQueryParams} from "@shared/QueryParams/UserQueryParams";


export interface IUserDao {
    getAll: () => Promise<IUser[]>;
    getUserById: (id: number) => Promise<IUser>;
    getUsersByQuery: (query: IUserQueryParams) => Promise<IUser[]>;
}

class UserDao implements IUserDao {


    /**
     *
     */
    public getAll(): Promise<IUser[]> {
        // TODO
        return Promise.resolve([]);
    }

    /**
     *
     */
    public getUserById(id: number): Promise<IUser> {
        // TODO
        return Promise.resolve({
            id: 0,
            email: '',
            first_name: '',
            last_name: '',
            avatar: ''
        });
    }

    /**
     *
     */
    public getUsersByQuery(query: IUserQueryParams): Promise<IUser[]> {
        return Promise.resolve([]);
    }
}

export default UserDao;
