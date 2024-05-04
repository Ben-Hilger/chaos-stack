import {Controller, Get, Post, Req, Res} from '@nestjs/common';
import { Request, Response } from "express"
import {UserService} from "../user/user.service";
import {EntryService} from "./entry.service";

@Controller("nest/api/entry")
export class EntryController {

    constructor(private entryService: EntryService,
                private userService: UserService) {}

    @Get()
    async handleGetAllEntriesRoute(@Req() req: Request, @Res() res: Response) {
        const userId = req.query?.userId as string
        if (userId == null) {
            res.status(400).json({message: "userId is required"})
            return
        }

        const results = await this.entryService.getAllEntries(userId)

        res.status(200).json({data: results})
    }

    @Post()
    async handleAddEntryRoute(@Req() req: Request, @Res() res: Response) {
        const userId = req.query?.userId as string
        const name = req.query?.name as string
        const amount = parseInt(req.query?.amount as string)
        if (userId == null || name == null || amount == null) {
            res.status(400).json({ message: "userId, name and amount are required"})
            return
        }
        const isValid = await this.userService.isUserIdValid(userId)
        if (!isValid) {
            res.status(400).json({ message: "userId is not valid"})
            return
        }
        try {
           const newId = await this.entryService.addNewEntry(name, userId, amount)
            res.status(200).json({data: {id: parseInt(newId)}})
        } catch {
            res.status(500).json()
        }
    }
}
