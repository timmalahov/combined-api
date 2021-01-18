export interface IUser {
    id: number,
    email: string,
    first_name: string,
    last_name: string,
    avatar: string
}

class User implements IUser {

    public id: number;
    public email: string;
    public first_name: string;
    public last_name: string;
    public avatar: string;

    constructor(user: IUser) {
        this.id = user.id;
        this.email = user.email;
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.avatar = user.avatar;

    }
}

export default User;
