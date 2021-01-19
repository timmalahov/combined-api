import User, {IUser} from '@entities/User';
import axios from "axios";
import get from 'lodash.get'
import size from 'lodash.size'
import {parseParameter} from "@shared/functions";
import {IUserQueryParams} from "@shared/QueryParams/UserQueryParams";
import {IUserDaoResponse, UserDaoResponse} from "@daos/User/UserDaoResponse";


export interface IUserDao {
    getAll: () => Promise<IUserDaoResponse>;
    getUserById: (id: number) => Promise<IUserDaoResponse>;
    getUsersByQuery: (query: IUserQueryParams) => Promise<IUserDaoResponse>;
}

class UserDao implements IUserDao {

    private async getAllUsers(): Promise<IUser[]> {
        try {
            const users: IUser[] = [];

            const response = await axios.get('https://reqres.in/api/users');
            const responseData = response.data;

            const usersData: IUser[] = get(responseData, 'data', []);
            const pagesCount: number = get(responseData, 'total_pages');

            users.push(...usersData);

            for (let i = 1; i < Number(pagesCount); i++) {
                const response = await axios.get(`https://reqres.in/api/users?page=${i + 1}`);
                const responseData = response.data;
                const usersData: IUser[] = get(responseData, 'data');
                users.push(...usersData);
            }

            return users.map(userData => new User(userData));
        } catch (e) {
            throw new Error();
        }
    }

    public async getAll(): Promise<IUserDaoResponse> {
        try {
            const users = await this.getAllUsers();
            return new UserDaoResponse(users, size(users));
        } catch (e) {
            throw new Error(e);
        }
    }

    public async getUserById(id: number): Promise<IUserDaoResponse> {
        try {
            const response = await axios.get(`https://reqres.in/api/users/${id}`);
            const userData: IUser = await response.data;
            const user = new User(get(userData, 'data'));
            return new UserDaoResponse([user]);
        } catch (e) {
            throw new Error(e);
        }
    }

    public async getUsersByQuery(query: IUserQueryParams): Promise<IUserDaoResponse> {
        const {name, id, offset = 0, limit} = query;

        try {
            if (id) {
                return await this.getUserById(id);
            }

            const users: IUser[] = await this.getAllUsers();
            const nameString = parseParameter(name);
            const filteredUsers: IUser[] =
                nameString
                    ? users
                        .filter(user =>
                            `${user.first_name.toLowerCase()} ${user.last_name.toLowerCase()}`
                                .includes(nameString.toLowerCase()))
                    : users;

            const resultUsers: User[] = filteredUsers.map(userData => new User(userData));

            if (limit) {
                return new UserDaoResponse(
                    resultUsers.slice(offset, offset + limit),
                    size(resultUsers)
                );
            }

            return new UserDaoResponse(resultUsers, size(resultUsers));
        } catch (e) {
            throw new Error(e);
        }
    }
}

export default UserDao;
