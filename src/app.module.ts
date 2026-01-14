import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { NotesModule } from './notes/notes.module';
import { FoldersModule } from './folders/folders.module';
import { PhotosModule } from './photos/photos.module';
import { SharesModule } from './shares/shares.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MulterModule } from '@nestjs/platform-express';
import { v4 as uuidv4 } from 'uuid'; // Import UUID
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { InvitationsModule } from './invitations/invitations.module';
import { CollaborationsModule } from './collaborations/collaborations.module';
import { CacheModule } from '@nestjs/cache-manager';


@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register({
      isGlobal: true, // Makes the cache module available globally
      ttl: 10000,      // Time to Live (TTL) in milliseconds (5 seconds by default)
      max: 100,       // Maximum number of items in cache (optional)
    }),
    /*ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../upload'),
      serveRoot: '/upload',
      //serveStaticOptions: { index: false }, 
    }),*/

   // MulterModule.registerAsync({
     // useFactory: () => ({
        /*
        storage: diskStorage({
          //destination: '../upload',
          filename: (req, file, callback) => {
            // Generate unique name: UUID + original extension
            //const uniqueName = `${uuidv4()}${file.originalname.substring(file.originalname.lastIndexOf('.'))}`;
            //callback(null, uniqueName);
             callback(null, `${file.originalname}-${Date.now()}`);
          },

          destination: (req, file, cb) => {
            // Example: Dynamic path based on user ID from request (assume auth middleware sets req.user)
            //const userId = req.user?.id || 'guest'; // Fallback for unauthenticated
            const uploadPath = join(__dirname, '..', '../upload');

            // Create folder if it doesn't exist
            if (!existsSync(uploadPath)) {
              mkdirSync(uploadPath, { recursive: true });
            }

            cb(null, uploadPath);
          },


        }),
        dest: '../upload',
        */

     // }),
    //}),

    
    //MongooseModule.forRoot(MONGODB_URI.toString()),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.getOrThrow('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),

    AuthModule,
    UserModule,
    NotesModule,
    FoldersModule,
    PhotosModule,
    SharesModule,
    InvitationsModule,
    CollaborationsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
