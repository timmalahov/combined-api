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
    public totalCount: number;

    constructor(value: any[], totalCount: number) {
        super(value)
        this.value = value;
        this.totalCount = totalCount;
    }
}
