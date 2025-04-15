import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { FrameExtractorService } from './frame-extractor/frame-extractor.service';

@Module({
  controllers: [VideoController],
  providers: [VideoService, FrameExtractorService],
})
export class VideoModule {}
