import { Injectable } from '@nestjs/common';
import {createClient} from "@libsql/client";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class DbService {

    db = null

    constructor(configService: ConfigService) {
        const config = {
            url: configService.get<string>("TURSO_DATABASE_URL"),
            authToken: configService.get<string>("TURSO_AUTH_TOKEN")
        }
        this.db = createClient(config)
    }

    executeStatement(sql: string, args: any[]) {
        return this.db.execute({
            sql: sql,
            args: args
        })
    }


}
