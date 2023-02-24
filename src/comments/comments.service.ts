import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LikeCommentDto, ReplayCommentDto } from './dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment, CommentDocument } from './schemas/comment.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async create(
    createCommentDto: CreateCommentDto,
    user: object,
  ): Promise<object> {
    const createComment = this.commentModel.create({
      text: createCommentDto.text,
      user: user,
    });
    if (!createComment) {
      return await {
        success: false,
        message: 'ثبت نظر با خطا مواجه شد',
      };
    }
    return await {
      success: true,
      message: 'نظر شما با موفقیت ثبت شد',
    };
  }

  async findAll(): Promise<object> {
    return await this.commentModel.find();
  }

  async like(likeCommentDto: LikeCommentDto, user: object): Promise<object> {
    const result = await this.commentModel.find(
      { _id: likeCommentDto.comment_id ,likes: {_id:user['_id']}},
    );
    if(!result){
      const likeCommentQuery = await this.commentModel.findOneAndUpdate(
        { _id: likeCommentDto.comment_id },
        {
          $push: { likes: user },
        },
      );
      return {
        success:true ,
        like:true,
        message:'لایک با موفقیت انجام شد'
      }
    }
    const disLikeCommentQuery = await this.commentModel.findOneAndUpdate(
      { _id: likeCommentDto.comment_id },
      {
        $pop: { likes: { _id:user['_id'] } },
      },
    );
   if(!disLikeCommentQuery){
    return {
      success:false ,
      message:'سرویس با خطا مواجه شد'
    }
    
   }
   return {
    success:true ,
    disLike:true,
    message:'کامنت دیسلایک شد'
  }
   
  }

  async replay(replayCommentDto: ReplayCommentDto ,user:object): Promise<object> {
    const result=await this.commentModel.findOneAndUpdate({_id:replayCommentDto.comment_id},{
    })
    return result
}
}
