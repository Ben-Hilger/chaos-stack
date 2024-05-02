import * as dotenv from "dotenv"
import express from "express"
import cors from "cors"
import {configureDB} from "./db/index.js";
import {setupUserRoutes} from "./user/index.js";
import {setupEntryRoutes} from "./entry/index.js";

dotenv.config()
configureDB()

const app = express()
app.use(cors())

const port = process.env.PORT || 3005

setupUserRoutes(app)
setupEntryRoutes(app)

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})
