import passport from 'passport';
import { Strategy } from 'passport-local';
import prisma from '../lib/db';
import { User } from '@prisma/client';
import { compare } from '../lib/bcrypt';

// Runs on initial login
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Runs on subsequent requests
passport.deserializeUser(async (id: User['id'], done) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) throw new Error('user not found.');
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport.use(
  new Strategy(
    {
      usernameField: 'email',
    },
    async (email, password, done) => {
      try {
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (!user) throw new Error('user not found.');
        if (!compare(password, user.password))
          throw new Error('Invalid Credentials');
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    },
  ),
);
