import { Request, Response, NextFunction } from 'express';

const SetToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    let { accessToken = null, uid = null } = req?.cookies;
    req.headers['authorization'] = accessToken;
    req.headers['uid'] = uid;
  } catch (error) {}
};

export default SetToken;
