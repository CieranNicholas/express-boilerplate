import { Request, Response, NextFunction } from 'express';

const authGuard = (req: Request, res: Response, next: NextFunction) => {
	if (req.user) {
		return next();
	}
	res.status(401).send({ message: 'Not authenticated' });
};

export default authGuard;
