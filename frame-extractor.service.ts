// src/video/frame-extractor/frame-extractor.service.ts

import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as path from 'path';
import * as fs from 'fs';

const execPromise = promisify(exec);

@Injectable()
export class FrameExtractorService {
  async extractFrames(videoPath: string): Promise<string[]> {
    const outputDir = path.join(__dirname, '..', '..', '..', 'uploads', 'frames');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPattern = path.join(outputDir, 'frame-%03d.jpg');
    const command = `ffmpeg -i "${videoPath}" -vf "fps=1" "${outputPattern}"`;

    try {
      await execPromise(command);

      const frames = fs
        .readdirSync(outputDir)
        .filter(file => file.startsWith('frame-') && file.endsWith('.jpg'))
        .map(file => path.join(outputDir, file));

      return frames;
    } catch (error) {
      console.error('Error extracting frames:', error);
      throw new Error('Failed to extract frames from video');
    }
  }
}
