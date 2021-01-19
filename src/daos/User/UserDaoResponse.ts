import {IUser} from "@entities/User";


export interface IUserDaoResponse {
    users: IUser[],
    totalCount: number | undefined
}

export class UserDaoResponse implements IUserDaoResponse {
    public users: IUser[];
    public totalCount: number | undefined;

    constructor(users: IUser[], totalCount?: number) {
        this.users = users;
        this.totalCount = totalCount
    }
}
