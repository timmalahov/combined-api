import logger from './Logger';

export const pErr = (err: Error) => {
    if (err) {
        logger.err(err);
    }
};

export const parseParameter = (rawParameter: string | undefined): string => {
    return rawParameter ? new Buffer(String(rawParameter), 'binary').toString('utf8') : '';
}
