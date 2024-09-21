import { Router, Request, Response } from 'express';

export const statusRouter = Router();

statusRouter.get('/status', (req: Request, res: Response) => {
	try {
		res.status(200).send({ message: 'OK' });
	} catch (error: any) {
		res.status(500).send({ message: error.message });
	}
});

export default statusRouter;
