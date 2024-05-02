import {createClient} from "@libsql/client";

/** @type {Client} */
let db = null

export function configureDB() {

    const config = {
        url: process.env.TURSO_DATABASE_URL,
        authToken: process.env.TURSO_AUTH_TOKEN
    }

    db = createClient(config)
}

/**
 * @param {string} sql
 * @param {any[]} args
 */
export async function executeStatement(sql, args) {
    return db.execute({
        sql: sql,
        args: args
    })
}
