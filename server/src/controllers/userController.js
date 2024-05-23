import UserService from '../services/userService.js';


class UserController {
    async registerUser(req, res) {
        try {
            const { username, password } = req.body;
            const newUser = await UserService.registerUser(username, password);
            
            res.status(201).json(newUser);
        } catch (error) {
            console.error('Error while registering user in controller:', error);
            res.status(500).json({ message: "An error occurred while registering user" });
        }
    }

    async authenticateUser(req, res) {
        try {
            const { username, password } = req.body;
            const { user, token } = await UserService.authenticateUser(username, password);
            res.status(200).json({ user, token });
        } catch (error) {
            console.error('Error while authenticating user in controller:', error);
            res.status(500).json({ message: "An error occurred while authenticating user in controller" });
        }
    }
}

export default new UserController();