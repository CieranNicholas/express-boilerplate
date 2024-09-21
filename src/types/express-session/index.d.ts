// ./src/types/express-session/index.d.ts
import 'express-session'; // don't forget to import the original module
import { User } from '@prisma/client';

declare module 'express-session' {
	interface SessionData {
		user: User;
	}
}
