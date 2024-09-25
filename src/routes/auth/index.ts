import { Router, Request, Response, NextFunction } from 'express';
import passport from 'passport';

import '../../strategies/local-strategy';
import { createUser } from '../users/service';

export const authRouter = Router();

authRouter.post('/auth/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user = await createUser({ name, email, password });
    res.status(201).send(user);
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
});

authRouter.post(
  '/auth/login',
  passport.authenticate('local'),
  (req: Request, res: Response) => {
    res.sendStatus(200);
  },
);

authRouter.post(
  '/auth/logout',
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return res.sendStatus(401);

    req.logout((error) => {
      if (error) return res.sendStatus(400);

      // Destroy session in the database
      req.session.destroy((err) => {
        if (err) {
          return next(err);
        }

        res.clearCookie('connect.sid');
        res.sendStatus(200);
      });
    });
  },
);

authRouter.get('/auth/status', async (req: Request, res: Response) => {
  return req.user
    ? res.status(200).send({ message: 'Authenticated', user: req.user })
    : res.status(401).send({ message: 'Not authenticated' });
});

export default authRouter;
