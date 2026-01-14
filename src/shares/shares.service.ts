import { Injectable } from '@nestjs/common';
import { Share } from './share.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateShareDto } from './dto/createshare.dto';

@Injectable()
export class SharesService {
    constructor(@InjectModel(Share.name) private shareModel: Model<Share>) { }

    async createByUserId(userId, createShareDto: any) {
        return this.shareModel.create({ ...createShareDto, user: userId });
    }

    async findAllByUserId(userId: any) {
       return await this.shareModel.find({ user: userId }).populate('share').exec();
    }
    async findAllByShare(share: any) {
       return await this.shareModel.find({ share: share }).exec();
    }
    async remove(id: any) {
       return await this.shareModel.findByIdAndDelete(id).exec();
    }
}
