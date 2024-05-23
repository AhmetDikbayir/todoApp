import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserRepository from '../repository/userRepository.js';

class UserService {
    async registerUser(username, password) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await UserRepository.createUser(username, hashedPassword);
            return user;
        } catch (error) {
            throw new Error('Error while registering user in service');
        }
    }

    async authenticateUser(username, password) {
        try {
            const user = await UserRepository.getUserByUsername(username);
            if (!user) {
                throw new Error('User not found');
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error('Invalid password');
            }

            const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });

            return { user, token };
        } catch (error) {
            console.error('Error while authenticating user in service:', error.message);
            throw new Error('Error while authenticating user in service');
        }
    }
}

export default new UserService();