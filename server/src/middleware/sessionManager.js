import express from 'express';
import session from 'express-session';


class SessionManager {
    constructor() {
        this.app = express();
        this.setupSession();
        this.setupRoutes();
        this.sessionSecret = 'secret';
    }

    setupSession() {
        this.app.use(session({
            secret: 'secret',
            resave: false,
            saveUninitialized: true,
            cookie: { secure: false }
        }));
    }

    setupRoutes() {
        this.app.post('/login', (req, res) => {
            const { username, password } = req.body;
            if (username === 'user' && password === 'password') {
                req.session.username = username;
                res.send('Login successful');
            } else {
                res.status(401).send('Unauthorized');
            }
        });

        this.app.post('/logout', (req, res) => {
            req.session.destroy((err) => {
                if (err) {
                    console.error('Error while destroying session:', err);
                    res.status(500).send('Internal Server Error');
                } else {
                    res.send('Logout successful');
                }
            });
        });

        this.app.get('/api/todos', (req, res) => {
            if (req.session.username) {
                res.send('Todo list retrieved');
            } else {
                res.status(401).send('Unauthorized');
            }
        });
    }

    startServer(port) {
        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
}

export default SessionManager;