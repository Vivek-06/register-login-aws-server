import express, { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import SetToken from '../middleware/SetToken';
import formatResponse from '../middleware/FormatResponse';

const router = express.Router();

router.use(SetToken);
router.route('/api/v1/auth/csrftoken').get((req: Request, res: Response) =>
  res.json(
    formatResponse(StatusCodes.OK, false, null, ReasonPhrases.OK, {
      csrfToken: req.csrfToken()
    })
  )
);
router.use('/api/v1/auth/health', (req: Request, res: Response, next: NextFunction) =>
  res.status(StatusCodes.OK).json(formatResponse(StatusCodes.OK, false, null, ReasonPhrases.OK, null))
);
router.all('*', (req: Request, res: Response, next: NextFunction) => {
  res
    .status(StatusCodes.NOT_FOUND)
    .json(formatResponse(StatusCodes.NOT_FOUND, true, null, ReasonPhrases.NOT_FOUND, null));
});

export { router as AppRoutes };
