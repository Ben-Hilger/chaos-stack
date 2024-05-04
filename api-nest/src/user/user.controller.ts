import {Controller, Post, Put, Req, Res} from '@nestjs/common';
import { Request, Response } from "express"
import {UserService} from "./user.service";


@Controller("nest/api/user")
export class UserController {

    constructor(private userService: UserService) {}

    @Put()
    async handleGetAllEntriesRoute(@Req() req: Request, @Res() res: Response) {
        const userId = req.query?.userId as string
        if (userId == null) {
            res.status(400).json({ message: "userId is required"})
            return
        }
        const isValid = await this.userService.isUserIdValid(userId)
        if (!isValid) {
            res.status(400).json({ message: "userId is not valid"})
            return
        }
        res.status(200).json({ message: "userId is valid" })
    }

    @Post()
    async handleAddEntryRoute(@Req() req: Request, @Res() res: Response) {
        const newUUID = await this.userService.generateUserId();
        res.status(200).json({data: { uuid: newUUID }})
    }
}


