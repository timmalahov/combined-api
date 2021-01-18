import User, {IUser} from '@entities/User';
import {IUserDao} from './UserDao';
import MockDaoMock from '../MockDb/MockDao.mock';
import axios from "axios";
import {get, isNil} from 'lodash'
import {parseParameter} from "@shared/functions";
import {IUserQueryParams} from "@shared/QueryParams/UserQueryParams";


class UserDao extends MockDaoMock implements IUserDao {

    public async getAll(): Promise<IUser[]> {
        try {
            const users: IUser[] = [];

            const response = await axios.get('https://reqres.in/api/users');
            const responseData = await response.data;

            const usersData: IUser[] = get(responseData, 'data');
            const pagesCount: number = get(responseData, 'total_pages');
            const totalCount: number = get(responseData, 'total');

            users.push(...usersData);

            for (let i = 1; i < Number(pagesCount); i++) {
                const response = await axios.get(`https://reqres.in/api/users?page=${ i + 1 }`);
                const responseData = await response.data;
                const usersData: IUser[] = get(responseData, 'data');
                users.push(...usersData);
            }

            const result = users.map(userData => new User(userData));
            return result;
        } catch (e) {
            throw new Error();
        }
    }

    public async getUserById(id: number): Promise<IUser> {
        try {
            const response = await axios.get(`https://reqres.in/api/users/${id}`);
            const userData: IUser = await response.data;
            const user = new User(get(userData, 'data'));
            return user;
        } catch (e) {
            throw new Error();
        }
    }

    public async getUsersByQuery(query: IUserQueryParams): Promise<IUser[]> {
        const {name, id, offset, limit} = query;

        try {

            if (id) {
                const user = await this.getUserById(id);
                return [user]
            }

            const users: IUser[] = await this.getAll();
            const nameString = parseParameter(name);
            const resultUsers: IUser[] =
                nameString
                    ? users
                        .filter(user =>
                            `${user.first_name.toLowerCase()} ${user.last_name.toLowerCase()}`
                                .includes(nameString.toLowerCase()))
                    : users

            if (!isNil(offset) && !isNil(limit)) {
                return resultUsers.slice(offset, offset + limit);
            }

            return resultUsers;
        } catch (e) {
            throw new Error();
        }
    }
}

export default UserDao;
