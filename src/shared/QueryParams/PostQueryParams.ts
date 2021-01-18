import { IPaginationQueryParams } from "@shared/QueryParams/commonParams";

export interface IPostQueryParams extends IPaginationQueryParams {
    name?: string,
    userId?: number,
}

export class PostQueryParams implements IPostQueryParams {

    public name: string;
    public userId: number | undefined;
    public offset: number;
    public limit: number;

    constructor(params: IPostQueryParams) {
        this.name = params.name || '';
        this.userId = params.userId;
        this.offset = Number(params.offset) || 0;
        this.limit = Number(params.limit) || 0;
    }
}
