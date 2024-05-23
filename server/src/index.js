
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import todoRoutes from './routes/todoRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { sequelize } from './config/database.js';
import sessionMiddleware from './config/sessionConfig.js';
import SessionManager from './middleware/sessionManager.js';

const app = express();
const PORT = 3000;

const sessionManager = new SessionManager();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());



// Routes
app.use('/api/todos', todoRoutes);
app.use('/api/user', userRoutes);
app.use(sessionMiddleware);

//Start to connection
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        
        
        await sequelize.sync({ force: false });

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

startServer();


