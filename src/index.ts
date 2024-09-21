import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import passport from 'passport';

import loggerMiddleware from './middleware/logger';
import corsMiddleware from './middleware/cors';
import authGuard from './middleware/authGuard';

import userRouter from './routes/users';
import statusRouter from './routes/status';
import authRouter from './routes/auth';

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(loggerMiddleware);
app.use(
	session({
		secret: process.env.SESSION_SECRET!,
		saveUninitialized: false,
		resave: false,
		cookie: {
			maxAge: 60000 * 60,
		},
	})
);
app.use(passport.initialize());
app.use(passport.session());
app.use(corsMiddleware);

app.use('/api', statusRouter);
app.use('/api', authRouter);
app.use('/api', userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port http://localhost:${PORT}`);
});
