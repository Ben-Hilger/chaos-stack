import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid'
import {DbService} from "../db/db.service";

@Injectable()
export class UserService {


    constructor(private dbService: DbService) {

    }

    async isUserIdValid(userId: string) {
        const results = await this.dbService.executeStatement("SELECT EXISTS (SELECT 1 FROM users WHERE id = ?) as valid_user_id", [userId])
        return results.rows.length && results.rows[0]["valid_user_id"] === 1;
    }

    async generateUserId() {
        const newUUID = uuidv4();
        await this.dbService.executeStatement("INSERT INTO users (id) VALUES (?)",[newUUID])
        return newUUID;
    }

}
