export interface IBaseResponse {
    value: any;
}

export class BaseResponse implements IBaseResponse {

    public value: any;

    constructor(value: any) {
        this.value = value;
    }
}

export class ListResponse extends BaseResponse {

    public value: any[];
    public totalCount: number | undefined;

    constructor(value: any[], totalCount: number | undefined) {
        super(value)
        this.value = value;
        this.totalCount = totalCount;
    }
}
