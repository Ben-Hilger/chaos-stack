import { executeStatement } from "../db/index.js";
import { isUserIdValid } from "../user/index.js";

/**
 *
 * @param {Express} app
 */
export function setupEntryRoutes(app) {
  /**
   * Endpoint to verify the user id
   *  @param {express.Request} req
   *  @param {express.Response} res
   */
  app.get("/express/api/entry", async (req, res) => {
    await handleGetAllEntriesRoute(req, res);
  });
  /**
   * Endpoint to verify the user id
   *  @param {express.Request} req
   *  @param {express.Response} res
   */
  app.post("/express/api/entry", async (req, res) => {
    await handleAddEntryRoute(req, res);
  });
}

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function handleGetAllEntriesRoute(req, res) {
  /** @type {string} */
  const userId = req.query?.userId;
  if (userId == null) {
    res.status(400).json({ message: "userId is required" });
    return;
  }

  const results = await executeStatement(
    "SELECT id, name, amount FROM entries WHERE user_id = ?",
    [userId],
  );
  /** @type any[] */
  const rows = results.rows;
  /** @type {id: string, amount: number, id: number}[] */
  const formattedResults = [];
  for (let i = 0; i < rows.length; i++) {
    formattedResults.push({
      id: rows[i].id,
      amount: rows[i].amount,
      name: rows[i].name,
    });
  }

  res.status(200).json({ data: formattedResults });
}

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function handleAddEntryRoute(req, res) {
  /** @type {string} */
  const userId = req.query?.userId;
  /** @type {string} */
  const name = req.query?.name;
  /** @type {string} */
  const amount = req.query?.amount;
  if (userId == null || name == null || amount == null) {
    res.status(400).json({ message: "userId, name and amount are required" });
    return;
  }
  const isValid = await isUserIdValid(userId);
  if (!isValid) {
    res.status(400).json({ message: "userId is not valid" });
    return;
  }
  const result = await executeStatement(
    "INSERT INTO entries (name, user_id, amount) VALUES (?, ?, ?);",
    [name, userId, amount],
  );
  if (result.rowsAffected === 1) {
    res.status(200).json({ data: { id: parseInt(result.lastInsertRowid) } });
    return;
  }
  res.status(500).json();
}
