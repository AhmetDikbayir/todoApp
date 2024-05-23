import User from '../models/user.js';

class UserRepository {
    async createUser(username, password) {
        try {
            const newUser = await User.create({username, password});
            return newUser;
        } catch (error) {
            console.error('Error while creating user in repository:', error);
            throw new Error('Error while creating user in repository');
        }
    }

    async getUserByUsername(username) {
        try {
            const user = await User.findOne({ where: { username } });
            return user;
        } catch (error) {
            console.error('Error while fetching user by username in repository:', error);
            throw new Error('Error while fetching user by username in repository');
        }
    }
}

export default new UserRepository();