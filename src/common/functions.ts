import * as jwt from 'jsonwebtoken';
export const createToken = (data, tokenSecret, expiresIn) => {
    const token = jwt.sign(data, tokenSecret, {expiresIn});
    return { expiresIn, token };
}
export const scrubTokenData = (data) => {
    delete data['exp'];
    delete data['iat'];
}