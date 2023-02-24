import {
  Controller,
  Post,
  Req,
  Body,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { CommentsService } from './comments.service';
import { CreateCommentDto, LikeCommentDto, ReplayCommentDto } from './dto';
import { Request } from "express";

@UseGuards(AuthGuard('jwt-user'))
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async create(@Body() createCommentDto: CreateCommentDto ,@Req() req: Request) {
    const user=req.user
    return await this.commentsService.create(createCommentDto,user);
  }

  @Post('like')
  async like(@Body() likeCommentDto: LikeCommentDto,@Req() req: Request) {
    const user=req.user
    return await this.commentsService.like(likeCommentDto,user);
  }


  @Post('replay')
  async replay(@Body() replayCommentDto:ReplayCommentDto,@Req() req: Request) :Promise<object> {
    const user=req.user
    return await this.commentsService.replay(replayCommentDto,user)
  }
}
