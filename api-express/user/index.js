import {executeStatement} from "../db/index.js";
import { v4 as uuidv4 } from 'uuid'

/**
 *
 * @param {Express} app
 */
export function setupUserRoutes(app) {
    /**
     * Endpoint to verify the user id
     *  @param {express.Request} req
     *  @param {express.Response} res
     */
    app.put('/user', async (req, res) => {
        await handleUserIdValidationRoute(req, res)
    })

    /**
     * Endpoint to generate a new user id
     *  @param {express.Request} req
     *  @param {express.Response} res
     */
    app.post('/user', async (req, res) => {
        const newUUID = await generateUserId();
        res.status(200).json({data: { uuid: newUUID }})
    })

}

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function handleUserIdValidationRoute(req, res) {
    /** @type {string} */
    const userId = req.query?.userId
    if (userId == null) {
        res.status(400).json({ message: "userId is required"})
        return
    }
    const isValid = await isUserIdValid(userId)
    if (!isValid) {
        res.status(400).json({ message: "userId is not valid"})
        return
    }
    res.status(200).json({ message: "userId is valid" })
}

/**
 * Checks if the given user id is valid
 * @param {string} userId
 * @return {Promise<boolean>}
 */
export async function isUserIdValid(userId) {
    const results = await executeStatement("SELECT EXISTS (SELECT 1 FROM users WHERE id = ?) as valid_user_id", [userId])
    return results.rows.length && results.rows[0]["valid_user_id"] === 1;
}

/**
 * Generates a new user id, adds it to the database, and then returns the new user id
 * @return {Promise<string>}
 */
async function generateUserId() {
    const newUUID = uuidv4();
    await executeStatement("INSERT INTO users (id) VALUES (?)",[newUUID])
    return newUUID;
}