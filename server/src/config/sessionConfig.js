import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';

const pgSession = connectPgSimple(session);

const sessionMiddleware = session({
    store: new pgSession({
        conString: process.env.DATABASE_URL
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }
});

export default sessionMiddleware;
