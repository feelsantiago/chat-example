import { Injectable } from '@nestjs/common';

@Injectable()
export class ConnectedUsersService {
    private readonly users: Map<string, string>;

    constructor() {
        this.users = new Map();
    }

    public createConnection(key: string): void {
        this.users.set(key, '');
    }

    public addUser(key: string, _id: string): void {
        this.users.set(key, _id);
    }

    public closeConnection(key: string): void {
        this.users.delete(key);
    }

    public getConnectedUsers(): string[] {
        const values: string[] = [];
        this.users.forEach((value) => (value !== '' ? values.push(value) : null));
        return values;
    }
}
