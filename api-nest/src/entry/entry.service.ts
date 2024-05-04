import { Injectable } from '@nestjs/common';
import {DbService} from "../db/db.service";

@Injectable()
export class EntryService {


    constructor(private dbService: DbService) {}

    async addNewEntry(name: string, userId: string, amount: number) {
        const result = await this.dbService.executeStatement("INSERT INTO entries (name, user_id, amount) VALUES (?, ?, ?);",
            [name, userId, amount])
        if (result.rowsAffected === 1) {
            return result.lastInsertRowid
        }
        throw "Unable to add new entry"
    }

    async getAllEntries(userId: string) {
       const results = await this.dbService.executeStatement("SELECT id, name, amount FROM entries WHERE user_id = ?", [userId])

       const rows = results.rows
       const formattedResults = []

       for (let i = 0; i < rows.length; i++) {
           formattedResults.push({id: rows[i].id, amount: rows[i].amount, name: rows[i].name})
       }

       return formattedResults
    }
}
