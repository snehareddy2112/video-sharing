"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrameExtractorService = void 0;
const common_1 = require("@nestjs/common");
const child_process_1 = require("child_process");
const util_1 = require("util");
const path = require("path");
const fs = require("fs");
const execPromise = (0, util_1.promisify)(child_process_1.exec);
let FrameExtractorService = class FrameExtractorService {
    async extractFrames(videoPath) {
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
        }
        catch (error) {
            console.error('Error extracting frames:', error);
            throw new Error('Failed to extract frames from video');
        }
    }
};
exports.FrameExtractorService = FrameExtractorService;
exports.FrameExtractorService = FrameExtractorService = __decorate([
    (0, common_1.Injectable)()
], FrameExtractorService);
//# sourceMappingURL=frame-extractor.service.js.map