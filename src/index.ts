import express, { Application, NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import session from 'express-session';
import csrf from 'csurf';
import rateLimit from 'express-rate-limit';
import DBService from './services/DBService';
import Config from './config/Config';
import formatResponse from './middleware/FormatResponse';
import { AppRoutes } from './routes/AppRoutes';
const xss = require('xss-clean');

const app: Application = express();

app.use(xss());
app.use(cors());
app.use(mongoSanitize());
app.use(helmet());

app.set('trust proxy', 1);
app.use(
  session({
    secret: 's3Cur3',
    name: 'sessionId'
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(hpp());

app.use(csrf({ cookie: true }));
let limiter = {
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 30, // limit each IP to 30 requests per windowMs,
  message: 'Too many requests, please try again later.',
  statusCode: 429,
  handler: function (req: any, res: any) {
    console.info('RateLimit', req.ip, JSON.stringify(req.rateLimit));
    res.status(this.statusCode).json(formatResponse(this.statusCode, true, null, this.message, null));
  }
};
const requestLimit = rateLimit(limiter);
app.use(requestLimit);
app.use(AppRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  /** Log the req */
  console.info(`METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
  res.on('finish', () => {
    /** Log the res */
    console.info(
      `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`
    );
  });
  next();
});

const start = async () => {
  await DBService.getConnection();
  app.listen(Config.PORT, () => {
    console.info(`Server running on ${Config.HOSTNAME} : ${Config.PORT}`);
  });
};
start();
