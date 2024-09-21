import { Router, Request, Response } from 'express';
import prisma from '../../lib/db';
import authGuard from '../../middleware/authGuard';

export const userRouter = Router();

userRouter.use(authGuard);

// get all users
userRouter.get('/users', async (req: Request, res: Response) => {
	try {
		const users = await prisma.user.findMany();
		res.status(200).send(users);
	} catch (error: any) {
		res.status(500).send({ message: error.message });
	}
});

// get user by id
userRouter.get('/users/:id', async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const user = await prisma.user.findUnique({
			where: {
				id: parseInt(id),
			},
		});
		res.status(200).send(user);
	} catch (error: any) {
		res.status(500).send({ message: error.message });
	}
});

// get user by email
userRouter.get('/users/email/:email', async (req: Request, res: Response) => {
	const { email } = req.params;
	try {
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});
		res.status(200).send(user);
	} catch (error: any) {
		res.status(500).send({ message: error.message });
	}
});

// update user
userRouter.put('/users/:id', async (req: Request, res: Response) => {
	const { id } = req.params;
	const { name, email } = req.body;
	try {
		const user = await prisma.user.update({
			where: {
				id: parseInt(id),
			},
			data: {
				name,
				email,
			},
		});
		res.status(200).send(user);
	} catch (error: any) {
		res.status(500).send({ message: error.message });
	}
});

// delete user
userRouter.delete('/users/:id', async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		await prisma.user.delete({
			where: {
				id: parseInt(id),
			},
		});
		res.status(204).send();
	} catch (error: any) {
		res.status(500).send({ message: error.message });
	}
});

export default userRouter;
