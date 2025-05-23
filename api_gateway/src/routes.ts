import { Application, Request, Response } from "express";
import proxy from "express-http-proxy";
import { Service } from "./config";
import { createProxyMiddleware } from "http-proxy-middleware";
import { Server, IncomingMessage, ServerResponse } from "http";

export const routes = (app: Application,server:Server) => {
  app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({ status: "API Gateway is running" });
  });

  // Proxy for Auth Service
  app.use(
    "/auth",
    proxy(`${Service.AUTH_SERVICE_URL}`, {
      proxyReqPathResolver: (req) => `/auth${req.url}`,

      // Decorate the response to forward original status and body
      userResDecorator: async (proxyRes, proxyResData, req, res) => {
        res.status(proxyRes.statusCode??500);
        return proxyResData; // Forward the original response body
      },

      // Handle errors from the proxy
      proxyErrorHandler: (err, res, next) => {
        console.error("Proxy Error:", err.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
      },
    })
  );

  // Proxy for User Service
  app.use(
    "/user",
    proxy(`${Service.USER_SERVICE_URL}`, {
      proxyReqPathResolver: (req) => `/user${req.url}`,
      userResDecorator: async (proxyRes, proxyResData, req, res) => {
        res.status(proxyRes.statusCode??500);
        return proxyResData;
      },
      proxyErrorHandler: (err, res, next) => {
        console.error("Proxy Error:", err.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
      },
    })
  );




  app.use(
    "/course",
    proxy(`${Service.COURSE_SERVICE_URL}`, {
      proxyReqPathResolver: (req) => `/course${req.url}`,
      userResDecorator: async (proxyRes, proxyResData, req, res) => {
        res.status(proxyRes.statusCode??500);
        return proxyResData;
      },
      proxyErrorHandler: (err, res, next) => {
        console.error("Proxy Error:", err.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
      },
    })
  );
  app.use(
    "/payment",
    proxy(`${Service.PAYMENT_SERVICE_URL}/payment`, {
      proxyReqPathResolver: (req) => `/payment${req.url}`,
      userResDecorator: async (proxyRes, proxyResData, req, res) => {
        res.status(proxyRes.statusCode??500);
        return proxyResData;
      },
      proxyErrorHandler: (err, res, next) => {
        console.error("Proxy Error:", err.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
      },
    })
  );


  app.use("*", (req: Request, res: Response) => {
    res.status(404).json({ error: "Route not found" });
  });
};
