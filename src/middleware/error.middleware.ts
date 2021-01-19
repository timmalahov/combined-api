import {NextFunction, Request, Response} from "express"
import logger from '@shared/Logger';

export interface IResponseError extends Error {
    status?: number
    response?: {
        status: number
        statusText?: string
        data?: {
            message: string
        }
    }
}

enum axiosErrors {
    NOT_FOUND = 'Request failed with status code 404'
}

export default (err: IResponseError, req: Request, res: Response, _: NextFunction) => {
    const {ip, protocol, method, originalUrl} = req

    logger.err(
        `Error occured: '${err.message}' \n
        after request: ${ip} ${protocol} ${method} ${originalUrl} \n
        and stack: 
        \n${err.stack || '*stack is absent*'}`,
        true)

    if (err.message.includes(axiosErrors.NOT_FOUND)) {
        res.status(404).send({message: err.message})
        return
    }

    res.status(500).send({message: err.message})
    return
}
