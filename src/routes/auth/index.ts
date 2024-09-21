import { Router, Request, Response } from 'express';
import passport from 'passport';

import '../../strategies/local-strategy';
import { createUser } from '../users/service';

export const authRouter = Router();

authRouter.post('/auth/register', async (req: Request, res: Response) => {
	const { name, email, password } = req.body;
	try {
		const user = await createUser({ name, email, password });
		res.status(201).send(user);
	} catch (error: any) {
		res.status(500).send({ message: error.message });
	}
});

authRouter.post('/auth/login', passport.authenticate('local'), (req: Request, res: Response) => {
	res.sendStatus(200);
});

authRouter.post('/auth/logout', (req: Request, res: Response) => {
	if (!req.user) return res.sendStatus(401);

	req.logout((error) => {
		if (error) return res.sendStatus(400);
		res.sendStatus(200);
	});
});

authRouter.get('/auth/status', async (req: Request, res: Response) => {
	return req.user
		? res.status(200).send({ message: 'authenticated', user: req.user })
		: res.status(401).send({ message: 'Not authenticated' });
});

export default authRouter;
