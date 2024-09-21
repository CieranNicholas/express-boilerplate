import { Request, Response } from 'express';
import { NextFunction } from 'express';

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
	console.log(`Request Method: ${req.method} - Request URL: ${req.url}`);
	next();
};

export default loggerMiddleware;
