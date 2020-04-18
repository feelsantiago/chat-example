export interface JwtPayload {
    _id: string;
    name: string;
    email: string;
}

export interface SingInResult {
    user: JwtPayload;
    token: string;
}
