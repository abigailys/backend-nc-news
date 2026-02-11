const { retrieveUsers, retrieveUserByUsername } = require("../services/users.service.js")

exports.getUsers = async (request, response, next) => {
    try {
        const users = await retrieveUsers();
        response.status(200).send({ users: users });
    }
    catch (error) {
        next(error);
    };
}

exports.getUserByUsername = async (request, response, next) => {
    const { username } = request.params
    try {
        const user = await retrieveUserByUsername(username);
        response.status(200).send({ user: user });
    }
    catch (error) {
        next(error);
    };
}