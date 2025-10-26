import userService from './service.js';

const createUserController = async (req, res) => {
    try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export default {
    createUserController
}