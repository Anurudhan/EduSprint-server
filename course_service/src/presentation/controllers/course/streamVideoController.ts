import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDepndencies";
import { httpStatusCode } from "../../../_lib/http";
import axios from 'axios';  // Import properly

export const streamVideoController = (dependencies: IDependencies) => {
  const {
    useCases: { streamVideoUseCase },
  } = dependencies;
  
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { courseId, lessonId } = req.params;
      const course = await streamVideoUseCase(dependencies).execute(courseId);
      
      if (!course || !course.lessons) {
        res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "No course found with this courseId",
          data: {}
        });
        return; // Return void, not the response object
      }
      
      const lesson = course.lessons.find(lesson => lesson.lessonNumber == lessonId);
      
      if (!lesson) {
        res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "No lesson found with this lessonId",
          data: {}
        });
        return; // Return void, not the response object
      }
      
      const videoUrl = lesson.video;
      console.log("Video URL:", videoUrl);
      
      // Handle range requests
      const range = req.headers.range;
      
      if (!range) {
        res.redirect(videoUrl);
        return; // Return void, not the response object
      }
      
      // Get video info with a HEAD request
      const headResponse = await axios({
        method: 'HEAD',
        url: videoUrl
      });
      
      const contentLength = headResponse.headers['content-length'];
      
      if (!contentLength) {
        res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: "Could not determine video size",
          data: {}
        });
        return; // Return void, not the response object
      }
      
      const fileSize = parseInt(contentLength);
      
      // Parse the range header
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0]);
      const end = parts[1] ? parseInt(parts[1]) : fileSize - 1;
      
      // Calculate the chunk size
      const chunkSize = end - start + 1;
      
      // Set the headers
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': 'video/mp4'
      });
      
      // Stream the video chunk
      const videoResponse = await axios({
        method: 'get',
        url: videoUrl,
        responseType: 'stream',
        headers: {
          Range: `bytes=${start}-${end}`
        }
      });
      
      // Pipe to response
      videoResponse.data.pipe(res);
      // No return statement needed after pipe() since it's handled asynchronously
      
    } catch (error: unknown) {
      console.error("Video streaming error:", error);
      next(error instanceof Error ? error.message : error);
      // No return statement needed after calling next()
    }
  };
};