// src/video/video.service.ts

import { Injectable } from '@nestjs/common';
import { FrameExtractorService } from './frame-extractor/frame-extractor.service';
import { SightengineService } from '../moderation/sightengine/sightengine.service';

@Injectable()
export class VideoService {
  constructor(
    private readonly frameExtractor: FrameExtractorService,
    private readonly sightengineService: SightengineService,
  ) {}

  async extractFramesFromVideo(filePath: string): Promise<any> {
    const frames = await this.frameExtractor.extractFrames(filePath);

    const moderationResults: { frame: string; result: any }[] = [];

    for (const framePath of frames) {
      const result = await this.sightengineService.moderateImage(framePath);
      moderationResults.push({
        frame: framePath,
        result,
      });
    }

    return {
      message: 'Video uploaded and frames moderated',
      frames: moderationResults,
    };
  }
}
