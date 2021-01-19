import {IPaginationQueryParams} from "@shared/QueryParams/commonParams";

export interface IUserQueryParams extends IPaginationQueryParams {
    name?: string,
    id?: number,
    hasValues?: () => boolean
}

export class UserQueryParams implements IUserQueryParams {

    public name: string;
    public id: number | undefined;
    public offset: number;
    public limit: number;

    constructor(params: IUserQueryParams) {
        this.name = params.name || '';
        this.id = params.id;
        this.offset = Number(params.offset) || 0;
        this.limit = Number(params.limit) || 0;
    }

    public hasValues = (): boolean => {
        return Boolean(this.name || this.id || this.offset || this.limit);
    }
}
