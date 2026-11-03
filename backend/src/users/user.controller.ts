import { Controller, Get, Req, Query, Patch, ParseIntPipe, Body, Param } from "@nestjs/common";
import { Request } from "express";
import { UsersService } from "./user.service.js";
import { FindUserDto } from "./dto/find-user-dto.js";
import { ChangeAvatarDto } from "./dto/change-avatar.dto.js";

@Controller('users')
export class UserControllers {

    constructor(
        private readonly userService : UsersService
    ){}

    @Get()
    getUsers(@Req() req : Request & {user : any}, @Query() query : FindUserDto) {
        return this.userService.findUsers(req.user.id, query )
    }

    @Patch("/:userId/avatar")
    changeAvatar(@Param("userId", ParseIntPipe) userId : number, @Body() changeAvatarDto : ChangeAvatarDto) {
        return this.userService.changeAvatar(userId, changeAvatarDto.avatar)
    }
}