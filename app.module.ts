import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { VideoModule } from './video/video.module';
import { ImageFilteringController } from './image-filtering/image-filtering.controller';
import { SightengineService } from './moderation/sightengine/sightengine.service';
import { SightengineModule } from './moderation/sightengine/sightengine.module';

@Module({
  imports: [AuthModule, UserModule,PrismaModule, VideoModule,SightengineModule],
  controllers: [ImageFilteringController],
  providers: [SightengineService],
})
export class AppModule {}
