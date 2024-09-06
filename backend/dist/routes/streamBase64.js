"use strict";
// import { Router, Request, Response } from 'express';
// import ytdl from '@distube/ytdl-core';
// import { Transform } from 'stream';
//
// const streamRouterBase64 = Router();
//
// streamRouterBase64.get('/', async (req: Request, res: Response) => {
//   const videoId = req.query.videoId as string;
//
//   if (!videoId) {
//     return res.status(400).send('Video ID is required.');
//   }
//
//   const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
//
//   try {
//     // Start fetching metadata and stream in parallel
//     const infoPromise = ytdl.getInfo(videoUrl);
//
//     let streamStarted = false;
//
//     // Handle range headers
//     const range = req.headers.range;
//     let start = 0;
//     let end: number | undefined;
//     let totalLength: number;
//
//     if (range) {
//       const parts = range.replace(/bytes=/, "").split("-");
//       start = parseInt(parts[0], 10);
//     }
//
//     // Wait for metadata to be fetched
//     const info = await infoPromise;
//
//     // Get the best audio format
//     const audioFormat = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
//
//     if (!audioFormat) {
//       return res.status(404).send('No audio stream found.');
//     }
//
//     totalLength = parseInt(audioFormat.contentLength ?? '0', 10);
//     end = end ?? totalLength - 1;
//
//     if (range) {
//       const chunkSize = (end - start) + 1;
//       res.status(206).header({
//         'Content-Range': `bytes ${start}-${end}/${totalLength}`,
//         'Accept-Ranges': 'bytes',
//         'Content-Length': chunkSize.toString(),
//         'Content-Type': 'text/plain', // Sending base64, so use text
//       });
//     } else {
//       res.header({
//         'Content-Length': totalLength.toString(),
//         'Content-Type': 'text/plain', // Sending base64, so use text
//       });
//     }
//
//     // Create a transform stream to convert audio to base64
//     const base64Transform = new Transform({
//       transform(chunk, encoding, callback) {
//         // Convert the chunk to base64 and push to the stream
//         this.push(chunk.toString('base64'));
//         callback();
//       },
//     });
//
//     // Create and pipe the audio stream
//     if (!streamStarted) {
//       const stream = ytdl(videoUrl, {
//         format: audioFormat,
//         range: { start, end }
//       });
//
//       // Pipe the stream through the base64 transformer
//       stream.pipe(base64Transform).pipe(res);
//
//       // Handle errors
//       stream.on('error', (err: Error) => {
//         console.error(`Error streaming audio: ${err.message}`);
//         if (!res.headersSent) {
//           res.status(500).send('Error streaming audio.');
//         }
//       });
//
//       streamStarted = true;
//     }
//
//   } catch (err) {
//     console.error(`Error getting video info: ${(err as Error).message}`);
//     res.status(500).send('Error processing audio.');
//   }
// });
//
// export default streamRouterBase64;
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ytdl_core_1 = __importDefault(require("@distube/ytdl-core"));
const streamRouterChunked = (0, express_1.Router)();
streamRouterChunked.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const videoId = req.query.videoId;
    if (!videoId) {
        return res.status(400).send('Video ID is required.');
    }
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    try {
        // Fetch YouTube metadata and the best audio stream
        const info = yield ytdl_core_1.default.getInfo(videoUrl);
        const audioFormat = ytdl_core_1.default.chooseFormat(info.formats, { quality: 'highestaudio' });
        if (!audioFormat) {
            return res.status(404).send('No audio stream found.');
        }
        // Set up response headers for progressive streaming
        const totalLength = parseInt((_a = audioFormat.contentLength) !== null && _a !== void 0 ? _a : '0', 10);
        res.setHeader('Content-Type', 'audio/mpeg');
        res.setHeader('Content-Length', totalLength);
        // Stream audio in real-time directly from YouTube to client
        const stream = (0, ytdl_core_1.default)(videoUrl, {
            format: audioFormat,
            highWaterMark: 1 << 25, // 32MB chunks to prevent memory overload
        });
        // Pipe the audio stream directly to the client
        stream.pipe(res);
        // Handle stream errors
        stream.on('error', (err) => {
            console.error(`Error streaming audio: ${err.message}`);
            if (!res.headersSent) {
                res.status(500).send('Error streaming audio.');
            }
        });
    }
    catch (err) {
        console.error(`Error processing audio: ${err.message}`);
        res.status(500).send('Error processing audio.');
    }
}));
exports.default = streamRouterChunked;
