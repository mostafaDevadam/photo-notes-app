import { Module } from '@nestjs/common';
import { SharesController } from './shares.controller';
import { SharesService } from './shares.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Share, ShareSchema } from './share.schema';

@Module({
  imports: [
        MongooseModule.forFeature([{ name: Share.name, schema: ShareSchema }]),
     
  ],
  controllers: [SharesController],
  providers: [SharesService]
})
export class SharesModule {}
